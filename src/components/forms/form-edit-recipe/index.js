import React, { useEffect, useState, useRef } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { modalActions, recipeEditActions } from '@/store/actions';
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
import { CardIngredient, CardNutrition, CardImageEditRecipe } from '@/components/elements/card';
import Recipe from '@/api/Recipe';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

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

function FormEditRecipe(props) {
  const router = useRouter();
  const classMarerialUi = useStyles();
  const { data, error } = props.recipeEdit;
  const recipeId = props.recipeId;

  // For uploading images
  const uploadImageLabel = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const [errorDeleteImages, setErrorDeleteImages] = useState('');


  const [newVideo, setNewVideo] = useState(false);

  const [statusSubmit, setStatusSubmit] = useState('Edit');

  useEffect(() => {
    Recipe.getRecipe(recipeId)
      .then(res => {
        const newData = res.data;
        newData.id = recipeId;
        newData.main_image = res.data.images[0];
        props.dispatch(recipeEditActions.update(newData));
      })
      .catch(err => {
        console.log(err);
      });
  }, [recipeId]);

  // for Drag and Drop, because Sortable.js don't maintain File
  useEffect(() => {
    if (Array.isArray(data?.images)) {
      const imagesData = data?.images?.map((item, index) => {
        if (item instanceof File) {
          return { id: index, image: item };
        }

        return item;
      });

      setImages(imagesData);
      setErrorDeleteImages("");
    }
  }, [data]);

  function onChangeField(name) {
    return event => {
      const newData = { ...data, [name]: event.target.value };
      const newError = { ...error, [name]: '' };
      props.dispatch(recipeEditActions.update(newData));
      props.dispatch(recipeEditActions.updateError(newError));
    };
  }

  const changeVideoState = e => {
    e.preventDefault();
    setNewVideo(!newVideo);
  };

  function onChangeFieldNumber(name) {
    return event => {
      const newData = { ...data, [name]: +event.target.value };
      const newError = { ...error, [name]: '' };
      props.dispatch(recipeEditActions.update(newData));
      props.dispatch(recipeEditActions.updateError(newError));
    };
  }

  function onChangeSelect(name) {
    return event => {
      const newData = { ...data, [name]: event.target.value };
      const newError = { ...error, [name]: '' };
      props.dispatch(recipeEditActions.update(newData));
      props.dispatch(recipeEditActions.updateError(newError));
    };
  }

  function handleRemoveIngredient(id) {
    const newIngredientList = data?.ingredients.filter((Ingredient, index) => index !== id);
    const newData = { ...data, ingredients: newIngredientList };
    props.dispatch(recipeEditActions.update(newData));
  }

  function handleRemoveNutrition(name) {
    const newData = { ...data, [name]: null };
    props.dispatch(recipeEditActions.update(newData));
  }

  function handleRemoveImage(id, pk) {
    if (data?.images?.length === 1) {
      setErrorDeleteImages("Your recipe must have at least one photo");
      return;
    }

    const newImagetList = data?.images.filter((image, index) => index !== id);
    const newData = { ...data, images: newImagetList };

    // Filter for filtering undefined values
    const newDataDelete = { ...newData, images_to_delete: [...data.images_to_delete, pk].filter(item => item) };

    props.dispatch(recipeEditActions.update(newDataDelete));
  }

  function handleDeleteStep(e) {
    e.preventDefault();
    const newStepList = data?.steps.filter(step => step.num !== +e.currentTarget.id);
    const newData = { ...data, steps: newStepList };
    props.dispatch(recipeEditActions.update(newData));
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
      const newData = { ...data, images: newImageList };
      props.dispatch(recipeEditActions.update(newData));
    }

    if (!isDragging && e?.currentTarget?.files?.length !== 0) {
      const newImageList = [...data?.images, ...Object.values(e.currentTarget.files)];
      const newData = { ...data, images: newImageList };
      props.dispatch(recipeEditActions.update(newData));
    }
  };

  const handleUpdateImage = (e, id) => {
    if (e.currentTarget?.files?.length !== 0) {
      const newImage = e.currentTarget.files[0];
      const newImageList = data?.images.map((item, index) => {
        return index === id ? newImage : item;
      });
      const newData = { ...data, images: newImageList };
      props.dispatch(recipeEditActions.update(newData));
    }
  };

  const sortList = e => {
    const imagesData = e.map(item => (item.image ? item.image : item));
    const newData = { ...data, images: imagesData, main_image: imagesData[0] };
    props.dispatch(recipeEditActions.update(newData));
  };

  function handleDrop(event) {
    event.preventDefault();
    handleAddImage(event);
    setIsDragging(false);
    uploadImageLabel.current.style.border = '1px dashed #DFDFDF';
    return undefined;
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    uploadImageLabel.current.style.border = '1px dashed black';
    return undefined;
  }

  function handleDragLeave() {
    setIsDragging(false);
    uploadImageLabel.current.style.border = '1px dashed #DFDFDF';
    return undefined;
  }

  function handleDragEnter(event) {
    event.preventDefault();
    return undefined;
  }

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

  useEffect(() => {
    if (isWindowExist()) {
      CameraTag.setup();
    }
  }, [newVideo]);

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
      if (props.recipeEdit.data.preview_mp4_url !== mp4) {
        props.dispatch(recipeEditActions.update(newData));
      }
    });
  }

  function uploadRecipe(e) {
    setStatusSubmit('Loading...');
    e.preventDefault();
    const clonedData = { ...data };

    if (clonedData.main_image instanceof File) {
      clonedData.main_image = clonedData.main_image.name;
    } else {
      clonedData.main_image = clonedData.main_image.id;
    }

    props
      .dispatch(recipeEditActions.updateRecipe(clonedData))
      .then(data => {
        setStatusSubmit('Edit');
        return props.dispatch(
          modalActions.open('editSuccessful', {
            pk: data.pk
          })
        );
      })
      .catch(error => {
        handleErrorScroll(error.response.data);
        setStatusSubmit('Edit');
        console.log(error);
      });
  }

  const handleIngredientsUnit = unit => {
    if (unit === 'other') {
      return '';
    } else {
      return unit;
    }
  };

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

  const mobile = useMediaQuery('(max-width:576px)');

  return (
    <div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Edit Recipe</h2>
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
                helperText={error?.title ? 'This field is required' : ''}
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
                helperText={error?.description ? 'This field is required' : ''}
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
              onClick={handleClickPopupOpen('editIngredient')}
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
                onClick={handleClickPopupOpen('editNutrition')}
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
                          onClick={handleClickPopupOpen('editStep', {
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
            onClick={handleClickPopupOpen('editStep')}
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
            list={images}
            setList={sortList}
            animation={200}
            filter=".form-create-recipe_createRecipeLabel_type_addImage__17fDT"
            draggable=".card-image_cardImage__yt16O"
            preventOnFilter
            className={classes.createRecipeSection__grid_type_cardImages}>
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
                        <label
                          htmlFor="create-images"
                          ref={uploadImageLabel}
                          className={classes.createRecipeLabel_type_addImage}
                          onDrop={event => handleDrop(event)}
                          onDragOver={event => handleDragOver(event)}
                          onDragEnter={event => handleDragEnter(event)}
                          onDragLeave={event => handleDragLeave(event)}>
                          <PhotoCameraOutlinedIcon fontSize={'small'} color={'action'} />
                          <p className={classes.createRecipeLabel_type_addImage__text}>
                            jpeg, png, webp, tif, less than 50 Mb
                          </p>
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
                  }

                  return card;
                })
              : ''}
          </ReactSortable>
          <FieldError errors={error?.images ? error : {'images': errorDeleteImages}} path="images" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>
            <span style={{ color: 'red' }}>* </span>Cooking Video
          </h2>

          {!newVideo ? (
            data.preview_mp4_url && (
              <div className={classes.recipe__video__watermark}>
                <video width="550" controls="controls" className={classes.recipe__video}>
                  <source src={data.preview_mp4_url} type="video/mp4" />
                </video>
                <div className={classes.recipe__video__watermark__icon} />
              </div>
            )
          ) : (
            <div className={classes.createRecipeVideo}>
              <camera
                id="DemoCamera"
                data-app-id="63f9c870-72c4-0130-04c5-123139045d73"
                data-sources="upload"
                data-width={mobile ? '300px' : '530px'}
                data-height={mobile ? '170px' : '300px'}></camera>
            </div>
          )}
          <button onClick={changeVideoState} className={classes.recipe__video__button}>
            {!newVideo ? 'Update video' : 'Video'}
          </button>
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
                  helperText={error?.language ? 'This field is required' : ''}
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
                  helperText={error?.caption ? 'This field is required' : ''}
                />
              </NoSsr>
            </div>
          </div>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>
              <span style={{ color: 'red' }}>* </span>Visibility
            </h3>
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
                  <span style={{ color: 'red' }}>* </span>Cooking skills
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
        <button className={classes.createRecipeButton_color_gray} onClick={() => router.push(`/recipe/${recipeId}`)}>
          <p className={classes.createRecipeButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default connect(state => ({
  recipeEdit: state.recipeEdit
}))(FormEditRecipe);
