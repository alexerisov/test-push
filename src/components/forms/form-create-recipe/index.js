import React, {useState, useEffect, useRef} from 'react';
import { ReactSortable } from "react-sortablejs";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import {modalActions, recipeUploadActions} from '@/store/actions';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  NoSsr
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FieldError from '../../elements/field-error';
import {
  cuisineList,
  recipeTypes,
  cookingMethods,
  dietaryrestrictions,
  cookingSkill,
  nameErrorRecipe
} from '@/utils/datasets';
import { isWindowExist } from '@/utils/isTypeOfWindow';
import classes from './form-create-recipe.module.scss';
import {CardIngredient, CardNutrition, CardImage, CardImageEditRecipe} from '@/components/elements/card';
import { validator } from '@/utils/validator';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: '0 0 20px',
    minWidth: 250,
    width: '100%',
    '& .MuiInputBase-input': {
      height: 'auto',
      width: '100%'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px'
    },
    '& .MuiFormHelperText-root': {
      color: '#FA0926'
    }
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px'
    },
    '& .MuiInputBase-input': {
      height: 'auto'
    }
  },
  svgIcon: {
    width: '0.8em',
    height: '0.8em'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
    }
  }
};

function FormCreateRecipe(props) {
  const router = useRouter();
  const classMarerialUi = useStyles();
  const { data, error } = props.recipeUpload;

  // For uploading images
  const [isDragging, setIsDragging] = useState(false);
  const uploadImageLabel = useRef();
  const [images, setImages] = useState([]);

  // for Drag and Drop, because Sortable.js don't maintain File
  useEffect(() => {
    if (Array.isArray(data?.images)) {
      const imagesData = data?.images?.map((item, index) => {
        return item instanceof File ? {id: index, image: item} : item;
      });

      setImages(imagesData);
    }
  }, [data]);

  useEffect(() => {
    const newData = data;
    newData.cooking_time = '00:00';
    props.dispatch(recipeUploadActions.update(newData));
  }, [router]);

  function onChangeField(name) {
    return event => {
      const newData = { ...data, [name]: event.target.value };
      const currentLength = event?.target.value.length;
      const newError = {
        ...error,
        [name]: `${validator.getErrorStatusByCheckingLength({
          currentLength,
          ...getMaxLengthOfField(name)
        })}`
      };
      props.dispatch(recipeUploadActions.update(newData));
      props.dispatch(recipeUploadActions.updateError(newError));
    };
  }

  const getMaxLengthOfField = name => {
    switch (name) {
      case 'title':
        return { maxLength: 100 };
      case 'description':
        return { maxLength: 500 };
    }
  };

  function onChangeFieldNumber(name) {
    return event => {
      const newData = { ...data, [name]: +event.target.value };
      const newError = { ...error, [name]: '' };
      props.dispatch(recipeUploadActions.update(newData));
      props.dispatch(recipeUploadActions.updateError(newError));
    };
  }

  function onChangeSelect(name) {
    return event => {
      const newData = { ...data, [name]: event.target.value };
      const newError = { ...error, [name]: '' };
      props.dispatch(recipeUploadActions.update(newData));
      props.dispatch(recipeUploadActions.updateError(newError));
    };
  }

  function handleRemoveIngredient(id) {
    const newIngredientList = data?.ingredients.filter((Ingredient, index) => index !== id);
    const newData = { ...data, ingredients: newIngredientList };
    props.dispatch(recipeUploadActions.update(newData));
  }

  function handleRemoveNutrition(name) {
    const newData = { ...data, [name]: null };
    props.dispatch(recipeUploadActions.update(newData));
  }

  function handleRemoveImage(id, pk) {
    if (data?.images?.length === 1) {
      return;
    }

    const newImagesList = data?.images.filter((image, index) => index !== id);
    const newData = { ...data, images: newImagesList };

    // For filtering undefined values
    const newDataDelete = { ...newData, images_to_delete: [...data.images_to_delete, pk].filter(item => item) };

    props.dispatch(recipeUploadActions.update(newDataDelete));
  }

  function handleDeleteStep(e) {
    e.preventDefault();
    const newStepList = data?.steps.filter(step => step.num !== +e.currentTarget.id);
    const newData = { ...data, steps: newStepList };
    props.dispatch(recipeUploadActions.update(newData));
  }

  const handleClickPopupOpen = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params));
    };
  };

  const handleAddImage = e => {
    // for drag and drop
    if (isDragging && e?.dataTransfer?.files?.length !== 0) {
      const newImageList = [...data?.images, ...Object.values(e.dataTransfer.files)];
      const newData = {...data, images: newImageList};
      props.dispatch(recipeUploadActions.update(newData));
    }

    if (!isDragging && e?.currentTarget?.files?.length !== 0) {
      const newImageList = [...data?.images, ...Object.values(e.currentTarget.files)];
      const newData = { ...data, images: newImageList };
      props.dispatch(recipeUploadActions.update(newData));
    }
  };

  const sortList = (e) => {
    const imagesData = e.filter(item => !item.filtered).map(item => item.image ? item.image : item);
    const newData = {...data, images: imagesData, main_image: imagesData[0]};
    props.dispatch(recipeUploadActions.update(newData));
  };

  const handleUpdateImage = (e, id) => {
    if (e.currentTarget?.files?.length !== 0) {
      const newImage = e.currentTarget.files[0];
      const newImageList = data?.images.map((item, index) => {
        return index === id ? newImage : item;
      });
      const newData = {...data, images: newImageList};
      props.dispatch(recipeUploadActions.update(newData));
    }
  };

  const selectItemList = list => {
    let itemList = [];
    for (let key in list) {
      itemList.push(
        <MenuItem key={key} value={key}>
          {list[key]}
        </MenuItem>
      );
    }
    return itemList;
  };

  React.useEffect(() => {
    if (isWindowExist()) {
      CameraTag.setup();
    }
  }, []);

  if (isWindowExist()) {
    CameraTag.observe('DemoCamera', 'published', function () {
      const myCamera = CameraTag.cameras['DemoCamera'];
      const myVideo = myCamera.getVideo();
      const thumbnail = `https:${myVideo.medias.vga_thumb}`;
      const full_thumbnail = `https:${myVideo.medias.vga_filmstrip}`;
      const mp4 = `https:${myVideo.medias['720p']}`;
      const webm = `https:${myVideo.medias.vertical}`;
      const newData = {
        ...data,
        preview_thumbnail_url: thumbnail,
        preview_full_thumbnail_url: full_thumbnail,
        preview_mp4_url: mp4,
        preview_webm_url: webm
      };
      if (!props.recipeUpload.data.preview_mp4_url) {
        props.dispatch(recipeUploadActions.update(newData));
      }
    });
  }

  const [statusSubmit, setStatusSubmit] = useState('Submit');

  function uploadRecipe(e) {
    e.preventDefault();
    setStatusSubmit('Loading...');
    const clonedData = {...data};

    clonedData.main_image = data?.images?.[0];

    props
      .dispatch(recipeUploadActions.uploadRecipe(clonedData))
      .then(data => {
        setStatusSubmit('Submit');
        return props.dispatch(
          modalActions.open('uploadSuccessful', {
            pk: data.pk,
            publishStatus: data.publish_status
          })
        );
      })
      .catch(err => {
        handleErrorScroll(err.response.data);
        setStatusSubmit('Submit');
        console.log(err);
      });
    // }
  }

  const handleErrorScroll = error => {
    if (error !== null) {
      const elementError = nameErrorRecipe.find(item => error[item.nameErrorResponse]);
      if (elementError?.nameErrorResponse === 'description') {
        const el = document.querySelector(`textarea[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
      if (elementError?.nameErrorResponse === 'preview_mp4_url') {
        const el = document.querySelector(`div[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
      if (elementError) {
        const el = document.querySelector(`input[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
    }
  };

  const scrollToElement = el => {
    el !== null && el.scrollIntoView({ block: 'center', inline: 'center' });
  };

  const handleIngredientsUnit = unit => {
    if (unit === 'other') {
      return '';
    } else {
      return unit;
    }
  };

  const mobile = useMediaQuery('(max-width:576px)');

  function handleDrop(event) {
    event.preventDefault();
    handleAddImage(event);
    setIsDragging(false);
    uploadImageLabel.current.style.border='1px dashed #DFDFDF';
    return undefined;
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    uploadImageLabel.current.style.border='1px dashed black';
    return undefined;
  }

  function handleDragLeave() {
    setIsDragging(false);
    uploadImageLabel.current.style.border='1px dashed #DFDFDF';
    return undefined;
  }

  function handleDragEnter(event) {
    event.preventDefault();
    return undefined;
  }

  const getMarkUpForUploadedImages = () => {
    return (
      <>
        {images?.length !== 0
          ? images?.map((item, index, array) => {
            const card = (
              <CardImageEditRecipe
                image={item}
                delete={handleRemoveImage}
                update={handleUpdateImage}
                key={index}
                src={item.url ?? URL.createObjectURL(item.image)}
                id={index}
                pk={item.id}
              />
            );

            if (index === array.length - 1) {
              return (
                <>
                  {card}
                </>
              );
            }

            return card;
          })
          : ''}
          <label
            htmlFor="create-images"
            ref={uploadImageLabel}
            className={classes.createRecipeLabel_type_addImage}
            onDrop={event => handleDrop(event)}
            onDragOver={event => handleDragOver(event)}
            onDragEnter={event => handleDragEnter(event)}
            onDragLeave={event => handleDragLeave(event)}
          >
            <PhotoCameraOutlinedIcon fontSize={'small'} color={"action"}/>
            <p className={classes.createRecipeLabel_type_addImage__text}>jpeg, png, webp, tif, less than 50 Mb</p>
            <p className={classes.createRecipeLabel_type_addImage__subtext}>Upload Photo</p>
          </label>
          <input
            type="file"
            id="create-images"
            name="create-images"
            accept="image/*"
            multiple
            onChange={handleAddImage}
            className={classes.createRecipeInput_type_addImage}
          />
      </>
    );
  };

  return (
    <div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Basic Details</h2>
          <div>
            <label htmlFor="create-title" className={classes.createRecipeLabel}>
              <span style={{ color: 'red' }}>* </span>Title
            </label>
            <NoSsr>
              <TextField
                id="create-title"
                type="text"
                onChange={onChangeField('title')}
                value={data?.title}
                variant="outlined"
                fullWidth
                className={classMarerialUi.textField}
                error={error?.title}
                helperText={error?.title}
                inputProps={{ maxLength: 100 }}
              />
            </NoSsr>
          </div>
          <div>
            <label htmlFor="create-description" className={classes.createRecipeLabel}>
              <span style={{ color: 'red' }}>* </span>Description
            </label>
            <NoSsr>
              <TextField
                id="create-description"
                multiline
                rows={4}
                onChange={onChangeField('description')}
                variant="outlined"
                value={data?.description}
                fullWidth
                className={classMarerialUi.textField}
                error={error?.description}
                helperText={error?.description}
                inputProps={{ maxLength: 500 }}
              />
            </NoSsr>
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Ingredients</h2>
          <div className={classes.createRecipeSection__grid_type_cardIngredients}>
            {data?.ingredients.length !== 0
              ? data?.ingredients.map((item, index) => (
                  <CardIngredient
                    delete={handleRemoveIngredient}
                    key={index}
                    title={item.title}
                    quantity={item.quantity}
                    unit={handleIngredientsUnit(item.unit)}
                    id={index}
                  />
                ))
              : ''}
            <button
              type="button"
              onClick={handleClickPopupOpen('addIngredient')}
              className={classes.createRecipeButton_type_addIngredient}>
              <p className={classes.createRecipeButton_type_addIngredient__icon}>&#43;</p>
              <p className={classes.createRecipeButton_type_addIngredient__text}>Add More</p>
            </button>
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Nutrition value</h2>
          <div className={classes.createRecipeSection__grid_type_cardNutrition}>
            {data?.calories ? (
              <CardNutrition id="calories" delete={handleRemoveNutrition} title="Calories" quantity={data?.calories} />
            ) : (
              ''
            )}
            {data?.proteins ? (
              <CardNutrition
                id="proteins"
                delete={handleRemoveNutrition}
                title="Protein"
                quantity={`${data?.proteins}%`}
              />
            ) : (
              ''
            )}
            {data?.fats ? (
              <CardNutrition id="fats" delete={handleRemoveNutrition} title="Fat" quantity={`${data?.fats}%`} />
            ) : (
              ''
            )}
            {data?.carbohydrates ? (
              <CardNutrition
                id="carbohydrates"
                delete={handleRemoveNutrition}
                title="Carbs"
                quantity={`${data?.carbohydrates}%`}
              />
            ) : (
              ''
            )}
            {!data?.calories || !data?.proteins || !data?.fats || !data?.carbohydrates ? (
              <button
                type="button"
                onClick={handleClickPopupOpen('addNutrition')}
                className={classes.createRecipeButton_type_addNutrition}>
                <p className={classes.createRecipeButton_type_addNutrition__icon}>&#43;</p>
                <p className={classes.createRecipeButton_type_addNutrition__text}>Add More</p>
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Steps to make the recipe</h2>
          <ul className={classes.createRecipeList}>
            {data?.steps.length !== 0
              ? data?.steps.map((item, index) => {
                  return (
                    <li key={index} className={classes.createRecipeList__item}>
                      <div className={classes.createRecipeList__titleContainer}>
                        <h3 className={classes.createRecipeList__title}>
                          <span className={classes.createRecipeList__title_color}>{`Step ${item.num} : `}</span>
                          {item.title}
                        </h3>
                        <button
                          type="button"
                          className={classes.createRecipeList__item__button}
                          id={item.num}
                          onClick={handleClickPopupOpen('addStep', {
                            num: item.num,
                            title: item.title,
                            description: item.description
                          })}>
                          <EditIcon style={{ fontSize: 18 }} />
                        </button>
                        <button
                          className={classes.createRecipeList__item__button}
                          id={item.num}
                          onClick={handleDeleteStep}>
                          <DeleteIcon style={{ fontSize: 18 }} id={item.num} />
                        </button>
                      </div>
                      <p className={classes.createRecipeList__text}>{item.description}</p>
                    </li>
                  );
                })
              : ''}
          </ul>
          <button
            type="button"
            onClick={handleClickPopupOpen('addStep')}
            className={classes.createRecipeButton_type_addStep}>
            <p className={classes.createRecipeButton_type_addStep__icon}>&#43;</p>
            <p className={classes.createRecipeButton_type_addStep__text}>Add More Steps</p>
          </button>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>
            <span style={{ color: 'red' }}>* </span>Cooking images
          </h2>
          <ReactSortable
            delayOnTouchOnly={false}
            list={[...images, {id: 'not-draggable', filtered: true, chosen: true}]}
            setList={sortList}
            animation={200}
            filter=".form-create-recipe_createRecipeLabel_type_addImage__17fDT"
            draggable=".card-image_cardImage__yt16O"
            preventOnFilter
            className={classes.createRecipeSection__grid_type_cardImages}
          >
            {getMarkUpForUploadedImages()}
          </ReactSortable>
          <FieldError errors={error} path="images" id="error" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>
            <span style={{ color: 'red' }}>* </span>Cooking Video
          </h2>
          {/* <camera
          data-app-id='bd67aac0-7869-0130-7e72-22000aaa02b5'
          id='video'
          data-maxlength='30'
          data-width='9000'
          data-height='300'
          data-facing-mode='environment'
          >
          </camera> */}
          <camera
            id="DemoCamera"
            data-app-id="63f9c870-72c4-0130-04c5-123139045d73"
            data-sources="upload"
            data-width={mobile ? '300px' : '530px'}
            data-height={mobile ? '170px' : '300px'}></camera>
          <FieldError errors={error} path="preview_mp4_url" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Video Elements</h2>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>
              <span style={{ color: 'red' }}>* </span>Language and Caption
            </h3>
            <div className={classes.createRecipeItem__inputContainer}>
              <NoSsr>
                <TextField
                  id="create-language"
                  type="text"
                  onChange={onChangeField('language')}
                  value={data?.language}
                  variant="outlined"
                  placeholder="Language"
                  className={classMarerialUi.textField}
                  error={error?.language}
                  helperText={error?.language}
                />
                <TextField
                  id="create-caption"
                  type="text"
                  onChange={onChangeField('caption')}
                  value={data?.caption}
                  variant="outlined"
                  placeholder="Caption"
                  className={classMarerialUi.textField}
                  error={error?.caption}
                  helperText={error?.caption}
                />
              </NoSsr>
            </div>
          </div>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>
              <span style={{ color: 'red' }}>* </span>Visibility
            </h3>
            <p className={classes.createRecipeItem__text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
            <NoSsr>
              <RadioGroup
                aria-label="create-visibility"
                name="create-visibility"
                value={data?.publish_status}
                onChange={onChangeFieldNumber('publish_status')}
                error={error?.publish_status}
                helperText={error?.publish_status ? 'This field is required' : ''}>
                <FormControlLabel value={1} control={<Radio id="publish_status" />} label="Save" />
                <FormControlLabel value={2} control={<Radio id="publish_status" />} label="Publish" />
              </RadioGroup>
            </NoSsr>
            {error?.publish_status && (
              <p className={classes.createRecipeItem__errorPublishStatus}>This field is required</p>
            )}
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>All Classifications</h2>
          <div className={classes.createRecipeSection__grid_type_input}>
            <div className={classes.createRecipeItem}>
              <label htmlFor="create-cooking_time" className={classes.createRecipeLabel}>
                Preparation Time
              </label>
              <NoSsr>
                <TextField
                  id="create-cooking_time"
                  type="time"
                  onChange={onChangeField('cooking_time')}
                  value={data?.cooking_time}
                  variant="outlined"
                  className={classMarerialUi.textField}
                  fullWidth
                />
              </NoSsr>
            </div>
            <NoSsr>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label htmlFor="create-types-select" className={classes.createRecipeLabel}>
                  Type
                </label>
                <Select
                  id="create-types-select"
                  value={data?.types}
                  onChange={onChangeSelect('types')}
                  fullWidth
                  error={error?.types}
                  MenuProps={MenuProps}
                  multiple>
                  {selectItemList(recipeTypes)}
                </Select>
                <FormHelperText>{error?.types ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label htmlFor="create-diet-restrictions-select" className={classes.createRecipeLabel}>
                  Lifestyle
                </label>
                <Select
                  id="create-diet-restrictions-select"
                  value={data?.diet_restrictions}
                  onChange={onChangeSelect('diet_restrictions')}
                  fullWidth
                  error={error?.diet_restrictions}
                  MenuProps={MenuProps}
                  multiple>
                  {selectItemList(dietaryrestrictions)}
                </Select>
                <FormHelperText>{error?.diet_restrictions ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label htmlFor="create-cuisines-select" className={classes.createRecipeLabel}>
                  Cuisine
                </label>
                <Select
                  id="create-cuisines-select"
                  value={data?.cuisines}
                  onChange={onChangeSelect('cuisines')}
                  fullWidth
                  labelWidth={10}
                  error={error?.cuisines}
                  MenuProps={MenuProps}
                  multiple>
                  {selectItemList(cuisineList)}
                </Select>
                <FormHelperText>{error?.cuisines ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label htmlFor="create-cooking-methods-select" className={classes.createRecipeLabel}>
                  Cooking Method
                </label>
                <Select
                  id="create-cooking-methods-select"
                  value={data?.cooking_methods}
                  onChange={onChangeSelect('cooking_methods')}
                  fullWidth
                  error={error?.cooking_methods}
                  MenuProps={MenuProps}
                  multiple>
                  {selectItemList(cookingMethods)}
                </Select>
                <FormHelperText>{error?.cooking_methods ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label htmlFor="create-cooking-skills-select" className={classes.createRecipeLabel}>
                  <span style={{ color: 'red' }}>* </span>Cooking Skills
                </label>
                <Select
                  id="create-cooking-skills-select"
                  value={data?.cooking_skills}
                  onChange={onChangeSelect('cooking_skills')}
                  autoWidth
                  error={error?.cooking_skills}
                  MenuProps={MenuProps}>
                  {selectItemList(cookingSkill)}
                </Select>
                <FormHelperText>{error?.cooking_skills ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
            </NoSsr>
          </div>
        </div>
      </form>
      <div className={classes.createRecipebuttonContainer}>
        <button className={classes.createRecipeButton} onClick={uploadRecipe}>
          <p className={classes.createRecipeButton__text}>{statusSubmit}</p>
        </button>
        <button className={classes.createRecipeButton_color_gray} onClick={() => router.push('/my-recipes')}>
          <p className={classes.createRecipeButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default connect(state => ({
  recipeUpload: state.recipeUpload
}))(FormCreateRecipe);
