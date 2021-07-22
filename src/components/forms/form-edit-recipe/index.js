import React, { useEffect, useState } from 'react';
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
  NoSsr,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FieldError from '../../elements/field-error';
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions} from '@/utils/datasets';
import { isWindowExist } from '@/utils/isTypeOfWindow';
import classes from "./form-create-recipe.module.scss";
import { CardIngredient, CardNutrition, CardImageEditRecipe } from '@/components/elements/card';
import Recipe from '@/api/Recipe';

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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

function FormEditRecipe (props) {

  const router = useRouter();
  const classMarerialUi = useStyles();
  const { data, error } = props.recipeEdit;

  const recipeId = props.recipeId;

  const [newVideo, setNewVideo] = useState(false);

  useEffect(() => {
    Recipe.getRecipe(recipeId)
    .then((res) => {
      const newData = res.data;
      newData.id = recipeId;
      props.dispatch(
        recipeEditActions.update(newData),
      );
    })
  }, [recipeId])

  function onChangeField(name) {
    return (event) => {
      const newData = { ...data, [name]: event.target.value };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeEditActions.update(newData),
      );
      props.dispatch(
        recipeEditActions.updateError(newError),
      );
    };
  }

  const changeVideoState = (e) => {
    e.preventDefault();
    setNewVideo(!newVideo);
  }

  function onChangeFieldNumber(name) {
    return (event) => {
      const newData = { ...data, [name]: +event.target.value };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeEditActions.update(newData),
      );
      props.dispatch(
        recipeEditActions.updateError(newError),
      );
    };
  }

  function onChangeSelect(name) {
    return (event) => {
      const newData = { ...data, [name]: event.target.value };
      const newError = {...error, [name]: ''};
      props.dispatch(
        recipeEditActions.update(newData),
      );
      props.dispatch(
        recipeEditActions.updateError(newError),
      );
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

  function handleRemoveImage (id, pk) {
    const newImagetList = data?.images.filter((image, index) => index !== id);
    const newData = { ...data, images: newImagetList };

    const newImagetListId = [pk];

    const newDataDelete = { ...newData, images_to_delete: newImagetListId };

    props.dispatch(recipeEditActions.update(newDataDelete));
  }

  function handleDeleteStep (e) {
    e.preventDefault();
    const newStepList = data?.steps.filter((step) => step.num !== +e.currentTarget.id);
    const newData = { ...data, steps: newStepList };
    props.dispatch(recipeEditActions.update(newData));
  }

  const handleClickPopupOpen = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params));
    };
  };

  const handleAddImage = (e) => {
    const newImageList = [...data?.images, e.currentTarget.files[0]];
    const newData = { ...data, images: newImageList };
    props.dispatch(recipeEditActions.update(newData));
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
  }, [newVideo]);

  if (isWindowExist()) {
    CameraTag.observe("DemoCamera", "published", function(){
      const myCamera = CameraTag.cameras["DemoCamera"];
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
        preview_webm_url: webm,
      };
        if (!props.recipeEdit.data.preview_mp4_url) {
        props.dispatch(recipeEditActions.update(newData));
      }
    });
  }
  
  function uploadRecipe (e) {
    e.preventDefault();
      props.dispatch(recipeEditActions.updateRecipe(data))
      .then((data) => {
        return props.dispatch(modalActions.open('editSuccessful',{
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
          <h2 className={classes.createRecipeSubtitle}>Edit Recipe</h2>
          <div>
            <label htmlFor="create-title" className={classes.createRecipeLabel}>Title</label>
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
              helperText={error?.title ? "This field is required" : ""}
            />
            </NoSsr>
          </div>
          <div>
            <label htmlFor="create-description" className={classes.createRecipeLabel}>Description</label>
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
              helperText={error?.description ? "This field is required" : ""}
            />
            </NoSsr>
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
              onClick={handleClickPopupOpen('editIngredient')}
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
                  onClick={handleClickPopupOpen('editNutrition')}
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
                        onClick={handleClickPopupOpen('editStep', {
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
            onClick={handleClickPopupOpen('editStep')}
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
              ? data?.images.map((item, index) => <CardImageEditRecipe
                                                          delete={handleRemoveImage}
                                                          key={index}
                                                          src={item.url ?? URL.createObjectURL(item)}
                                                          id={index}
                                                          pk={item.id}/>
                                                          )
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

          {!newVideo ? 
          data.preview_mp4_url && <video width="550" controls="controls" className={classes.recipe__video}>
          <source src={data.preview_mp4_url} type="video/mp4" />
          </video> :
          <div>
            <camera id='DemoCamera' data-app-id='63f9c870-72c4-0130-04c5-123139045d73' data-sources='upload'></camera>
            <FieldError errors={error} path="preview_mp4_url" />
          </div>}
          <button onClick={changeVideoState} className={classes.recipe__video__button}>{!newVideo ? "Update video" : "Video"}</button>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Video Elements</h2>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>Language and Caption</h3>
            <p className={classes.createRecipeItem__text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
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
              </NoSsr>
            </div>
          </div>
          <div className={classes.createRecipeItem}>
            <h3 className={classes.createRecipeItem__title}>Visibility</h3>
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
              helperText={error?.publish_status ? "This field is required" : ""}
              >
                <FormControlLabel value={1} control={<Radio />} label="Save" />
                <FormControlLabel value={2} control={<Radio />} label="Publish" />
              </RadioGroup>
            </NoSsr>
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>All Classifications</h2>
          <div className={classes.createRecipeSection__grid_type_input}>
            <div className={classes.createRecipeItem}>
              <label htmlFor="create-cooking_time" className={classes.createRecipeLabel}>Preparation Time</label>
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
                  MenuProps={MenuProps}
                  multiple
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
                  MenuProps={MenuProps}
                  multiple
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
                  MenuProps={MenuProps}
                  multiple
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
                  MenuProps={MenuProps}
                  multiple
                >{
                selectItemList(cookingMethods)
                }
                </Select>
                <FormHelperText>{error?.cooking_methods ? "This field is required" : ""}</FormHelperText>
              </FormControl>
            </NoSsr>
          </div>
        </div>
      </form>
      <div className={classes.createRecipebuttonContainer}>
        <button
          className={classes.createRecipeButton}
          onClick={uploadRecipe}
          >
          <p className={classes.createRecipeButton__text}>Edit</p>
        </button>
        <button
        className={classes.createRecipeButton_color_gray}
        onClick={() => router.push(`/recipe/${recipeId}`)}
        >
        <p className={classes.createRecipeButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default connect((state => ({
  recipeEdit: state.recipeEdit,
})))(FormEditRecipe);