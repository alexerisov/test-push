import React, { useState, useEffect, useRef } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { modalActions, recipeUploadActions } from '@/store/actions';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  NoSsr,
  Checkbox
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
import { CardIngredient, CardNutrition, CardImage, CardImageEditRecipe } from '@/components/elements/card';
import { validator } from '@/utils/validator';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import InputTime from '@/components/elements/input/inputTime';
import { recoveryLocalStorage } from '@/utils/web-storage/local';
import Recipe from '@/api/Recipe';
import LinearProgressWithLabel from '@/components/elements/linear-progress-with-label';
import CheckboxIcon from '@/components/elements/checkbox-icon';
import CheckboxIconUnchecked from '@/components/elements/checkbox-icon/checkbox-icon-unchecked';

const useStyles = makeStyles(theme => ({
  root: {
    width: '15px',
    height: '15px',
    opacity: 1,
    position: 'relative'
  },
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
      borderRadius: '10px',
      backgroundColor: '#ffffff'
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

  useEffect(() => {
    if (props?.account && !props.account.hasToken) {
      router.push('/');
    }
  }, [props?.account]);

  // For uploading images
  const [isDragging, setIsDragging] = useState(false);
  const uploadImageLabel = useRef();
  const [images, setImages] = useState([]);
  const [errorDeleteImages, setErrorDeleteImages] = useState('');

  useEffect(() => {
    const newData = data;
    newData.cooking_time = '00:00';
    props.dispatch(recipeUploadActions.update(newData));
  }, []);

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
        return { maxLength: 50 };
      case 'description':
        return { maxLength: 200 };
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
    const newIngredientList = data?.ingredients.filter(
      (Ingredient, index) => `ingredient-${index}-${Ingredient.title}` !== id
    );
    const newData = { ...data, ingredients: newIngredientList };
    props.dispatch(recipeUploadActions.update(newData));
  }

  function handleRemoveNutrition(name) {
    const newData = { ...data, [name]: null };
    props.dispatch(recipeUploadActions.update(newData));
  }

  function handleRemoveImage(id) {
    if (data?.images?.length === 1) {
      setErrorDeleteImages('Your recipe must have at least one photo');
      return;
    }

    const newImagesIdList = data?.images.filter(image => image !== id);
    const newData = { ...data, images: newImagesIdList };

    if (data.main_image === id) {
      newData.main_image = newData.images?.[0];
    }

    props.dispatch(recipeUploadActions.update(newData));

    const newImageList = images.filter(image => image.pk !== id);
    setImages(newImageList);
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
      handleUploadNewImage(e.dataTransfer.files);
    }

    if (!isDragging && e?.currentTarget?.files?.length !== 0) {
      handleUploadNewImage(e.currentTarget.files);
    }

    setErrorDeleteImages('');
  };

  const handleUploadNewImage = files => {
    const arrayIdNewImages = JSON.parse(JSON.stringify(data?.images));
    const arrayNewImages = JSON.parse(JSON.stringify(images));
    const newData = JSON.parse(JSON.stringify(data));

    Object.keys(files).forEach(async item => {
      const res = await Recipe.uploadImageRecipe(files[item]);
      arrayIdNewImages.push(res.data.pk);

      if (arrayNewImages.length === 0) {
        newData.main_image = res.data.pk;
      }

      arrayNewImages.unshift(res.data);

      newData.images = arrayIdNewImages;

      props.dispatch(recipeUploadActions.update(newData));

      setImages(arrayNewImages);
    });
  };

  const sortList = e => {
    const imagesData = e.filter(item => !item.filtered);
    setImages(imagesData);

    const newImageIdList = [];
    imagesData.forEach(item => {
      newImageIdList.push(item.pk);
    });
    const newData = { ...data, images: JSON.parse(JSON.stringify(newImageIdList)).reverse() };
    props.dispatch(recipeUploadActions.update(newData));
  };

  const handleUpdateCoverImage = (e, id) => {
    const newData = { ...data, main_image: id };
    props.dispatch(recipeUploadActions.update(newData));
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

  const [statusSubmit, setStatusSubmit] = useState('Submit');

  function uploadRecipe(e) {
    e.preventDefault();
    setStatusSubmit('Loading...');

    const remadeIngredients = data.ingredients.map(el => {
      const { unit, ...otherProps } = el;
      return { ...otherProps };
    });

    const clonedData = { ...data, ingredients: remadeIngredients };

    props
      .dispatch(recipeUploadActions.uploadRecipe(clonedData))
      .then(data => {
        setVideoRecipeError(false);
        setStatusSubmit('Submit');
        props.dispatch(recipeUploadActions.clear());
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
  }

  const handleCancel = () => {
    props.dispatch(recipeUploadActions.clear());
    router.push('/my-recipes');
  };

  const handleErrorScroll = error => {
    if (error !== null) {
      const elementError = nameErrorRecipe.find(item => error[item.nameErrorResponse]);
      if (elementError?.nameErrorResponse === 'description') {
        const el = document.querySelector(`textarea[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
      if (elementError?.nameDiv) {
        const el = document.querySelector(`div[id=${elementError.nameDiv}]`);
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
    el !== null && el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
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
    uploadImageLabel.current.style.border = '2px dashed #DFDFDF';
    return undefined;
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    uploadImageLabel.current.style.border = '2px dashed #ffaa00';
    return undefined;
  }

  function handleDragLeave() {
    setIsDragging(false);
    uploadImageLabel.current.style.border = '2px dashed #DFDFDF';
    return undefined;
  }

  function handleDragEnter(event) {
    event.preventDefault();
    return undefined;
  }

  const [restoreRecipeData, setRestoreRecipeData] = useState(false);

  useEffect(() => {
    if (restoreRecipeData) {
      const newData = {
        ...data,
        images: [],
        main_image: ''
      };
      recoveryLocalStorage.setCreateRecipe(newData);
    }
  }, [data]);

  const updateRestoreDataRecipe = data => {
    data && props.dispatch(recipeUploadActions.update(data));
    setRestoreRecipeData(true);
  };

  const handleClearForm = () => {
    setVideoRecipe(false);
    recoveryLocalStorage.deleteCreateRecipe();
    router.reload();
  };

  // video

  const inputRefVideo = React.createRef();
  const labelRefVideo = React.createRef();

  const onClickUploadVideo = event => {
    event.preventDefault();
    inputRefVideo.current.click();
  };

  const [videoRecipe, setVideoRecipe] = useState(false);
  const [videoRecipeError, setVideoRecipeError] = useState();

  const handleAddVideo = files => {
    handleDeleteVideo();
    Recipe.uploadVideoRecipe(files, setProgressVideo)
      .then(res => {
        setVideoRecipe(res.data);
        const newData = { ...data, video: res.data.pk };
        props.dispatch(recipeUploadActions.update(newData));
        setVideoRecipeError(false);
      })
      .catch(err => {
        setProgressVideo(0);
        setVideoRecipeError(err.response.data);
        console.log(err);
      });
  };

  const handleDeleteVideo = () => {
    setProgressVideo(0);
    setVideoRecipe(false);
    const newData = { ...data, video: '' };
    props.dispatch(recipeUploadActions.update(newData));
  };

  useEffect(() => {
    labelRefVideo.current.style.border = '3px dashed #dfdfdf';
  }, [videoRecipe]);

  function handleDropVideo(event) {
    event.preventDefault();
    handleAddVideo(event.dataTransfer.files[0]);
  }

  function handleDragOverVideo(event) {
    event.preventDefault();
    labelRefVideo.current.style.border = '3px dashed #61acd6';
    return undefined;
  }

  function handleDragLeaveVideo(event) {
    event.preventDefault();
    labelRefVideo.current.style.border = '3px dashed #dfdfdf';
    return undefined;
  }

  function handleDragEnterVideo(event) {
    event.preventDefault();
    return undefined;
  }

  useEffect(() => {
    const newData = recoveryLocalStorage.getCreateRecipe();
    if (newData && newData?.video !== '') {
      Recipe.getRecipeVideoByID(newData.video)
        .then(res => {
          setVideoRecipe(res.data);
          updateRestoreDataRecipe(newData);
        })
        .catch(err => {
          updateRestoreDataRecipe(newData);
        });
    } else {
      updateRestoreDataRecipe(newData);
    }
  }, []);

  const [progressVideo, setProgressVideo] = useState(0);

  const getMarkUpForUploadedImages = () => {
    return (
      <>
        {images?.length !== 0
          ? images?.map((item, index, array) => {
              const card = (
                <CardImageEditRecipe
                  image={item}
                  delete={handleRemoveImage}
                  updateCoverImage={handleUpdateCoverImage}
                  key={index}
                  main_image={data.main_image ?? false}
                  src={item.file}
                  id={index}
                  pk={item.pk}
                />
              );

              if (index === array.length - 1) {
                return <>{card}</>;
              }

              return card;
            })
          : ''}
        <label
          htmlFor="create-images"
          className={classes.uploadPhotoLabel}
          onDrop={event => handleDrop(event)}
          onDragOver={event => handleDragOver(event)}
          onDragEnter={event => handleDragEnter(event)}
          onDragLeave={event => handleDragLeave(event)}>
          <div className={classes.uploadPhotoLabel__border} ref={uploadImageLabel}>
            <img className={classes.uploadPhotoLabel__logo} src="/images/index/uploadIconGray.svg" />
            <p className={classes.uploadPhotoLabel__text}>Add Photos</p>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="create-images"
          name="create-images"
          accept="image/*"
          onChange={handleAddImage}
          className={classes.createRecipeInput_type_addImage}
        />
      </>
    );
  };

  return (
    <div className={classes.createRecipeForm__wrap}>
      <div className={classes.wave}></div>
      <div className={classes.createRecipeForm__header}>
        <h1 className={classes.createRecipeForm__header__title}>Create New Recipe</h1>
        <button className={classes.createRecipeForm__header__clear} onClick={handleClearForm}>
          Clear All
        </button>
      </div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Basic Details</h2>
          <div className={classes.createRecipeInput_type_title}>
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
                error={Boolean(error?.title)}
                helperText={error?.title}
                inputProps={{ maxLength: 50 }}
              />
            </NoSsr>
          </div>
          <div className={classes.createRecipeInput_type_description}>
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
                error={Boolean(error?.description)}
                helperText={error?.description}
                inputProps={{ maxLength: 200 }}
              />
            </NoSsr>
          </div>
        </div>

        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>
            <span style={{ color: 'red' }}>* </span>Cooking images
          </h2>
          <ReactSortable
            delayOnTouchOnly={false}
            list={[...images, { id: 'not-draggable', filtered: true, chosen: true }]}
            setList={sortList}
            animation={200}
            filter=".form-create-recipe_uploadPhotoLabel__2Xlbv"
            draggable=".card-image_cardImage__yt16O"
            preventOnFilter
            className={classes.createRecipeSection__grid_type_cardImages}>
            {getMarkUpForUploadedImages()}
          </ReactSortable>
          <FieldError errors={error?.images ? error : { images: errorDeleteImages }} path="images" id="error" />
          <FieldError errors={error} path="main_image" id="error" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Cooking Video</h2>
          <div className={classes.createRecipeSection__video}>
            <>
              <div
                onClick={e => onClickUploadVideo(e)}
                className={classes.uploadVideoLabel}
                onDrop={event => handleDropVideo(event)}
                onDragOver={event => handleDragOverVideo(event)}
                onDragEnter={event => handleDragEnterVideo(event)}
                onDragLeave={event => handleDragLeaveVideo(event)}>
                <div className={classes.uploadVideoLabel__border} ref={labelRefVideo}>
                  <img className={classes.uploadVideoLabel__logo} src="/images/index/uploadIconGray.svg" />
                  {(progressVideo === 0 || videoRecipe) && (
                    <p className={classes.uploadVideoLabel__dragText}>{!videoRecipe ? 'Add Video' : 'Change Video'}</p>
                  )}
                  {progressVideo !== 0 && !videoRecipe && <LinearProgressWithLabel value={progressVideo} />}
                </div>
              </div>
              <input
                type="file"
                ref={inputRefVideo}
                accept="video/*"
                hidden
                onChange={event => {
                  handleAddVideo(event.currentTarget.files[0]);
                }}></input>
            </>

            {videoRecipe && (
              <div className={classes.recipe__video__watermark}>
                <video width="288" controls="controls" className={classes.recipe__video}>
                  <source src={videoRecipe?.video} type="video/mp4" />
                </video>
                <div className={classes.recipe__video__watermark__icon} />
                <button type="button" className={classes.buttonDelete} onClick={handleDeleteVideo}>
                  <div>
                    <div className={classes.buttonDelete__line}></div>
                    <div className={classes.buttonDelete__line}></div>
                  </div>
                </button>
              </div>
            )}
          </div>
          <FieldError errors={videoRecipeError} path="video" id="error" />
        </div>

        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>
            <span style={{ color: 'red' }}>* </span>Ingredients:
            <span style={{ color: '#ffaa00' }}> {data?.ingredients.length ?? '0'}</span>
          </h2>
          <div className={classes.createRecipeSection__grid_type_cardIngredients} id="create-ingredients">
            <button
              type="button"
              onClick={handleClickPopupOpen('addIngredient')}
              className={classes.createRecipeButton_type_addIngredient}>
              <p className={classes.createRecipeButton_type_addIngredient__icon}>&#43;</p>
              <p className={classes.createRecipeButton_type_addIngredient__text}>Add</p>
            </button>
            {data?.ingredients.length !== 0
              ? JSON.parse(JSON.stringify(data.ingredients)).map((item, index) => (
                  <CardIngredient
                    delete={handleRemoveIngredient}
                    key={`ingredient-${index}-${item.title}`}
                    title={item.title}
                    quantity={item.quantity}
                    unit={handleIngredientsUnit(item.unit)}
                    id={`ingredient-${index}-${item.title}`}
                  />
                ))
              : ''}
          </div>
          <FieldError errors={error} path="ingredients" id="error" />
        </div>
        <div className={classes.createRecipeSection_type_cardNutrition}>
          <h2 className={classes.createRecipeSubtitle}>Nutrition value</h2>
          <div className={classes.createRecipeSection__grid_type_cardNutrition}>
            {!data?.calories || !data?.proteins || !data?.fats || !data?.carbohydrates ? (
              <button
                type="button"
                onClick={handleClickPopupOpen('addNutrition')}
                className={classes.createRecipeButton_type_addNutrition}>
                <p className={classes.createRecipeButton_type_addNutrition__icon}>&#43;</p>
                <p className={classes.createRecipeButton_type_addNutrition__text}>Add</p>
              </button>
            ) : (
              ''
            )}
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
          <h2
            className={`${classes.createRecipeSubtitle_withoutInput} ${classes.createRecipeSubtitle_classifications}`}>
            All Classifications
          </h2>
          <div className={classes.createRecipeSection__grid_type_input}>
            <div className={classes.createRecipeItem__inputTime}>
              <label htmlFor="create-cooking_time" className={classes.createRecipeLabel}>
                <span style={{ color: 'red' }}>* </span> Cooking Time
              </label>
              <NoSsr>
                <InputTime
                  id="create-cooking_time"
                  value={data?.cooking_time}
                  onChange={onChangeField('cooking_time')}
                  className={classMarerialUi.textField}
                  fullWidth
                />
              </NoSsr>
            </div>
            <NoSsr>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label
                  htmlFor="create-types-select"
                  className={`${classes.createRecipeLabel} ${classes.createRecipeLabel_selects}`}>
                  <span style={{ color: 'red' }}>* </span> Type
                </label>
                <Select
                  id="create-types-select"
                  value={data?.types}
                  onChange={onChangeSelect('types')}
                  fullWidth
                  error={error?.types}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <img src={'/images/index/Polygon6.png'} className={classes.createRecipeSelectArrow} />
                  )}
                  multiple>
                  {selectItemList(recipeTypes)}
                </Select>
                <FormHelperText>{error?.types ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label
                  htmlFor="create-diet-restrictions-select"
                  className={`${classes.createRecipeLabel} ${classes.createRecipeLabel_selects}`}>
                  Lifestyle
                </label>
                <Select
                  id="create-diet-restrictions-select"
                  value={data?.diet_restrictions}
                  onChange={onChangeSelect('diet_restrictions')}
                  fullWidth
                  error={error?.diet_restrictions}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <img src="/images/index/Polygon6.png" className={classes.createRecipeSelectArrow} />
                  )}
                  multiple>
                  {selectItemList(dietaryrestrictions)}
                </Select>
                <FormHelperText>{error?.diet_restrictions ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label
                  htmlFor="create-cuisines-select"
                  className={`${classes.createRecipeLabel} ${classes.createRecipeLabel_selects}`}>
                  Cuisine
                </label>
                <Select
                  id="create-cuisines-select"
                  value={data?.cuisines}
                  onChange={onChangeSelect('cuisines')}
                  fullWidth
                  error={error?.cuisines}
                  MenuProps={MenuProps}
                  IconComponent={() => (
                    <img src="/images/index/Polygon6.png" className={classes.createRecipeSelectArrow} />
                  )}
                  multiple>
                  {selectItemList(cuisineList)}
                </Select>
                <FormHelperText>{error?.cuisines ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label
                  htmlFor="create-cooking-methods-select"
                  className={`${classes.createRecipeLabel} ${classes.createRecipeLabel_selects}`}>
                  Cooking Method
                </label>
                <Select
                  id="create-cooking-methods-select"
                  value={data?.cooking_methods}
                  onChange={onChangeSelect('cooking_methods')}
                  fullWidth
                  error={error?.cooking_methods}
                  IconComponent={() => (
                    <img src="/images/index/Polygon6.png" className={classes.createRecipeSelectArrow} />
                  )}
                  MenuProps={MenuProps}
                  multiple>
                  {selectItemList(cookingMethods)}
                </Select>
                <FormHelperText>{error?.cooking_methods ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
              <FormControl variant="outlined" className={classMarerialUi.formControl}>
                <label
                  htmlFor="create-cooking-skills-select"
                  className={`${classes.createRecipeLabel} ${classes.createRecipeLabel_selects}`}>
                  Cooking Skills
                </label>
                <Select
                  id="create-cooking-skills-select"
                  value={data?.cooking_skills}
                  onChange={onChangeSelect('cooking_skills')}
                  fullWidth
                  IconComponent={() => (
                    <img src="/images/index/Polygon6.png" className={classes.createRecipeSelectArrow} />
                  )}
                  error={Boolean(error?.cooking_skills)}
                  MenuProps={MenuProps}>
                  {selectItemList(cookingSkill)}
                </Select>
                <FormHelperText>{error?.cooking_skills ? 'This field is required' : ''}</FormHelperText>
              </FormControl>
            </NoSsr>
          </div>
        </div>

        <div className={`${classes.createRecipeSection} ${classes.createRecipeSection_visibility}`}>
          <div className={classes.createRecipeItem}>
            <h3 className={`${classes.createRecipeSubtitle} ${classes.createRecipeSubtitle_type_visibility}`}>
              <span style={{ color: 'red' }}>* </span>Visibility
            </h3>
            <NoSsr>
              <RadioGroup
                row
                aria-label="create-visibility"
                name="create-visibility"
                value={data?.publish_status}
                onChange={onChangeFieldNumber('publish_status')}
                error={error?.publish_status}>
                <FormControlLabel
                  value={1}
                  control={
                    <Radio id="publish_status" icon={<CheckboxIconUnchecked />} checkedIcon={<CheckboxIcon />} />
                  }
                  label="Save"
                />

                <FormControlLabel
                  value={2}
                  control={
                    <Radio id="publish_status" icon={<CheckboxIconUnchecked />} checkedIcon={<CheckboxIcon />} />
                  }
                  label="Publish"
                />
              </RadioGroup>
            </NoSsr>
            {error?.publish_status && (
              <p className={classes.createRecipeItem__errorPublishStatus}>This field is required</p>
            )}
          </div>
        </div>
      </form>
      <div className={classes.createRecipebuttonContainer}>
        <button className={classes.createRecipeButton} onClick={uploadRecipe}>
          <p className={classes.createRecipeButton__text}>{statusSubmit}</p>
        </button>
        <button className={classes.createRecipeButton_color_gray} onClick={handleCancel}>
          <p className={classes.createRecipeButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default connect(state => ({
  recipeUpload: state.recipeUpload,
  account: state.account
}))(FormCreateRecipe);
