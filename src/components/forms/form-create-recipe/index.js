import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { modalActions, recipeUploadActions } from '@/store/actions';
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FieldError from '../../elements/field-error';
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions} from '@/utils/datasets';
import { isWindowExist } from '@/utils/isTypeOfWindow';
import classes from "./form-create-recipe.module.scss";
import { CardIngredient, CardNutrition, CardImage } from '@/components/elements/card';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '0 0 20px',
    minWidth: 250,
    width: 400,
    '& .MuiInputBase-input': {
      height: 'auto',
      width: '400px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
    '& .MuiFormHelperText-root': {
      color: '#FA0926'
    }
    
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
    '& .MuiInputBase-input': {
      height: 'auto',
    },
  },
  svgIcon: {
    width: '0.8em',
    height: '0.8em',
  },
}));



function FormCreateRecipe (props) {
  const router = useRouter();
  const classMarerialUi = useStyles();
  const { data, error } = props.recipeUpload;

  function onChangeField(name) {
    return (event) => {
      const newData = { ...data, [name]: event.target.value };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeUploadActions.update(newData),
      );
      props.dispatch(
        recipeUploadActions.updateError(newError),
      );
    };
  }

  function onChangeFieldNumber(name) {
    return (event) => {
      const newData = { ...data, [name]: +event.target.value };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeUploadActions.update(newData),
      );
      props.dispatch(
        recipeUploadActions.updateError(newError),
      );
    };
  }

  function onChangeSelect(name) {
    return (event) => {
      const newData = { ...data, [name]: [+event.target.value] };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeUploadActions.update(newData),
      );
      props.dispatch(
        recipeUploadActions.updateError(newError),
      );
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

  function handleRemoveImage (id) {
    const newImagetList = data?.images.filter((image, index) => index !== id);
    const newData = { ...data, images: newImagetList };
    props.dispatch(recipeUploadActions.update(newData));
  }

  function handleDeleteStep (e) {
    e.preventDefault();
    const newStepList = data?.steps.filter((step) => step.num !== +e.currentTarget.id);
    const newData = { ...data, steps: newStepList };
    props.dispatch(recipeUploadActions.update(newData));
  }

  const handleClickPopupOpen = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params));
    };
  };

  const handleAddImage = (e) => {
    const newImageList = [...data?.images, e.currentTarget.files[0]];
    const newData = { ...data, images: newImageList };
    props.dispatch(recipeUploadActions.update(newData));
  };

  const selectItemList = (list) => {
    let itemList = [];
    for (let key in list) {
      itemList.push(<MenuItem key={key} value={key}>{list[key]}</MenuItem>);
    }
    return itemList;
  };

  React.useEffect(() => {
    if (isWindowExist()) {
      CameraTag.setup();
    }
  }, []);

  if (isWindowExist()) {
    CameraTag.observe("DemoCamera", "published", function(){
      const myCamera = CameraTag.cameras["DemoCamera"];
      const myVideo = myCamera.getVideo();
      console.log(myVideo);
      const thumbnail = `https:${myVideo.medias.vga_thumb}`;
      const full_thumbnail = `https:${myVideo.medias.vga_filmstrip}`;
      const mp4 = `https:${myVideo.medias['720p']}`;
      const webm = `https:${myVideo.medias.vertical}`;
      const newData = {
        ...data,
        preview_thumbnail_url: thumbnail,
        preview_full_thumbnail_url: full_thumbnail,
        preview_mp4_url: mp4,
        preview_webm_url: webm,
      };
        if (!props.recipeUpload.data.preview_mp4_url) {
        props.dispatch(recipeUploadActions.update(newData));
      }
    });
  }
  
  function uploadRecipe (e) {
    e.preventDefault();
    // if(document.getElementById("DemoCamera_720p") && document.getElementById("DemoCamera_720p").value !== '') {
    //   const thumbnail = `https:${document.getElementById("DemoCamera_vga_thumb").value}`;
    //   const full_thumbnail = `https:${document.getElementById("DemoCamera_vga_filmstrip").value}`;
    //   const mp4 = `https:${document.getElementById("DemoCamera_720p").value}`;
    //   const webm = `https:${document.getElementById("DemoCamera_vertical").value}`;
    //   const newData = {
    //     ...data,
    //     preview_thumbnail_url: thumbnail,
    //     preview_full_thumbnail_url: full_thumbnail,
    //     preview_mp4_url: mp4,
    //     preview_webm_url: webm,
    //   };
      props.dispatch(recipeUploadActions.uploadRecipe(data))
      .then((data) => {
        console.log(data);
        return props.dispatch(modalActions.open('uploadSuccessful',{
          pk: data.pk,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  }

  return (
    <div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Basic Details</h2>
          <div>
            <label htmlFor="create-title" className={classes.createRecipeLabel}>Title</label>
            <TextField
              id="create-title"
              type="text"
              onChange={onChangeField('title')}
              value={data?.title}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
              error={error?.title}
              helperText={error?.title ? "This field is required" : ""}
            />
          </div>
          <div>
            <label htmlFor="create-description" className={classes.createRecipeLabel}>Description</label>
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
              helperText={error?.description ? "This field is required" : ""}
            />
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Ingredients</h2>
          <div className={classes.createRecipeSection__grid_type_cardIngredients}>
            {
              data?.ingredients.length !== 0
              ? data?.ingredients.map((item, index) => <CardIngredient
                                                          delete={handleRemoveIngredient}
                                                          key={index}
                                                          title={item.title}
                                                          quantity={item.quantity}
                                                          id={index}/>)
              : ''
            }
            <button
              type="button"
              onClick={handleClickPopupOpen('addIngredient')}
              className={classes.createRecipeButton_type_addIngredient}
            >
              <p className={classes.createRecipeButton_type_addIngredient__icon}>&#43;</p>
              <p className={classes.createRecipeButton_type_addIngredient__text}>Add More</p>
            </button>
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Nutrition value</h2>
          <div className={classes.createRecipeSection__grid_type_cardNutrition}>
            {
              data?.calories
              ? <CardNutrition
                  id='calories'
                  delete={handleRemoveNutrition}
                  title='Calories'
                  quantity={data?.calories}
                />
              : ''
            }
            {
              data?.proteins
              ? <CardNutrition
                  id='proteins'
                  delete={handleRemoveNutrition}
                  title='Protein'
                  quantity={`${data?.proteins}%`}
                />
              : ''
            }
            {
              data?.fats
              ? <CardNutrition
                  id='fats'
                  delete={handleRemoveNutrition}
                  title='Fat'
                  quantity={`${data?.fats}%`}
                />
              : ''
            }
            {
              data?.carbohydrates
              ? <CardNutrition
                  id='carbohydrates'
                  delete={handleRemoveNutrition}
                  title='Carbs'
                  quantity={`${data?.carbohydrates}%`}
                />
              : ''
            }
            {
              !data?.calories || !data?.proteins || !data?.fats || !data?.carbohydrates
              ? <button
                  type="button"
                  onClick={handleClickPopupOpen('addNutrition')}
                  className={classes.createRecipeButton_type_addNutrition}
                >
                  <p className={classes.createRecipeButton_type_addNutrition__icon}>&#43;</p>
                  <p className={classes.createRecipeButton_type_addNutrition__text}>Add More</p>
                </button>
              : ''
            }
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Steps to make the recipe</h2>
          <ul className={classes.createRecipeList}>
          {
              data?.steps.length !== 0
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
                        })}
                      >
                        <EditIcon style={{ fontSize: 18 }}/>
                      </button>
                      <button
                        className={classes.createRecipeList__item__button}
                        id={item.num}
                        onClick={handleDeleteStep}
                      >
                        <DeleteIcon style={{ fontSize: 18 }} id={item.num}/>
                      </button>
                    </div>
                    <p className={classes.createRecipeList__text}>{item.description}</p>
                  </li>
                );
              })
              : ''
            }
          </ul>
          <button
            type="button"
            onClick={handleClickPopupOpen('addStep')}
            className={classes.createRecipeButton_type_addStep}
          >
            <p className={classes.createRecipeButton_type_addStep__icon}>&#43;</p>
            <p className={classes.createRecipeButton_type_addStep__text}>Add More Steps</p>
          </button>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Cooking images</h2>
          <div className={classes.createRecipeSection__grid_type_cardImages}>
            {
              data?.images.length !== 0
              ? data?.images.map((item, index) => <CardImage
                                                          delete={handleRemoveImage}
                                                          key={index}
                                                          src={URL.createObjectURL(item)}
                                                          id={index}/>)
              : ''
            }
            <label htmlFor="create-images" className={classes.createRecipeLabel_type_addImage}
            >
              <p className={classes.createRecipeLabel_type_addImage__icon}>&#43;</p>
              <p className={classes.createRecipeLabel_type_addImage__text}>Add More Images</p>
            </label>
            <input
              type="file"
              id="create-images"
              name="create-images"
              accept="image/*"
              multiple
              onChange={handleAddImage}
              className={classes.createRecipeInput_type_addImage}
            >
            </input>
          </div>
          <FieldError errors={error} path="images" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Cooking Video</h2>
          {/* <camera
          data-app-id='bd67aac0-7869-0130-7e72-22000aaa02b5'
          id='video'
          data-maxlength='30'
          data-width='9000'
          data-height='300'
          data-facing-mode='environment'
          >
          </camera> */}
          <camera id='DemoCamera' data-app-id='63f9c870-72c4-0130-04c5-123139045d73' data-sources='upload'></camera>
          <FieldError errors={error} path="preview_mp4_url" />
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Video Elements</h2>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>Language and Caption</h3>
            <p className={classes.createRecipeItem__text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
            <div className={classes.createRecipeItem__inputContainer}>
              <TextField
                id="create-language"
                type="text"
                onChange={onChangeField('language')}
                value={data?.language}
                variant="outlined"
                placeholder="Language"
                className={classMarerialUi.textField}
                error={error?.language}
                helperText={error?.language ? "This field is required" : ""}
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
                helperText={error?.caption ? "This field is required" : ""}
              />
            </div>
          </div>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>Visibility</h3>
            <p className={classes.createRecipeItem__text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
            <RadioGroup
              aria-label="create-visibility"
              name="create-visibility"
              value={data?.publish_status}
              onChange={onChangeFieldNumber('publish_status')}
              error={error?.publish_status}
              helperText={error?.publish_status ? "This field is required" : ""}
            >
              <FormControlLabel value={1} control={<Radio />} label="Save" />
              <FormControlLabel value={2} control={<Radio />} label="Publish" />
            </RadioGroup>
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>All Classifications</h2>
          <div className={classes.createRecipeSection__grid_type_input}>
            <div className={classes.createRecipeItem}>
              <label htmlFor="create-cooking_time" className={classes.createRecipeLabel}>Preparation Time</label>
              <TextField
                id="create-cooking_time"
                type="time"
                onChange={onChangeField('cooking_time')}
                value={data?.cooking_time}
                variant="outlined"
                className={classMarerialUi.textField}
                fullWidth
              />
            </div>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-types-select"
                className={classes.createRecipeLabel}>
                  Type
              </label>
              <Select
                id="create-types-select"
                value={data?.types}
                onChange={onChangeSelect('types')}
                autoWidth
                error={error?.types}
              >{
                selectItemList(recipeTypes)
              }
              </Select>
              <FormHelperText>{error?.types ? "This field is required" : ""}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-diet-restrictions-select"
                className={classes.createRecipeLabel}>
                  Lifestyle
              </label>
              <Select
                id="create-diet-restrictions-select"
                value={data?.diet_restrictions}
                onChange={onChangeSelect('diet_restrictions')}
                autoWidth
                error={error?.diet_restrictions}
              >{
                selectItemList(dietaryrestrictions)
              }
              </Select>
              <FormHelperText>{error?.diet_restrictions ? "This field is required" : ""}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-cuisines-select"
                className={classes.createRecipeLabel}>
                  Cuisine
              </label>
              <Select
                id="create-cuisines-select"
                value={data?.cuisines}
                onChange={onChangeSelect('cuisines')}
                autoWidth
                labelWidth={10}
                error={error?.cuisines}
              >{
                selectItemList(cuisineList)
              }
              </Select>
              <FormHelperText>{error?.cuisines ? "This field is required" : ""}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-cooking-methods-select"
                className={classes.createRecipeLabel}>
                  Cooking Method
              </label>
              <Select
                id="create-cooking-methods-select"
                value={data?.cooking_methods}
                onChange={onChangeSelect('cooking_methods')}
                autoWidth
                error={error?.cooking_methods}
              >{
                selectItemList(cookingMethods)
              }
              </Select>
              <FormHelperText>{error?.cooking_methods ? "This field is required" : ""}</FormHelperText>
            </FormControl>
          </div>
        </div>
        {/* <FieldError errors={error} path="detail" /> */}
      </form>
      <div className={classes.createRecipebuttonContainer}>
        <button
          className={classes.createRecipeButton}
          onClick={uploadRecipe}
          // disabled={!data.email || !data.password}
          >
          <p className={classes.createRecipeButton__text}>Submit</p>
        </button>
        <button
        className={classes.createRecipeButton_color_gray}
        onClick={() => router.push('/profile/account-settings')}
        >
        <p className={classes.createRecipeButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default connect((state => ({
  recipeUpload: state.recipeUpload,
})))(FormCreateRecipe);