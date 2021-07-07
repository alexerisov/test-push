import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FieldError from '../../elements/field-error';
import {cuisineList, recipeTypes, cookingSkill, cookingMethods, dietaryrestrictions} from '@/utils/datasets';
import classes from "./form-create-recipe.module.scss";
import CardIngredient from '../../elements/card-ingredient';

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
    
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      // width: '400px',
      borderRadius: '10px',
    },
    '& .MuiInputBase-input': {
      height: 'auto',
      width: 'auto',
    },
  }
}));



function FormCreateRecipe (props) {
  const classMarerialUi = useStyles();
  const [data, setData] = React.useState({
    title: '',
    cooking_time: null,
    cuisines: '',
    cooking_skill: '',
    cooking_methods: '',
    diet_restrictions: '',
    description: '',
    // thumbnail: '',
    types: '',
    // tags: null,
    language: '',
    caption: '',
    // visibility:
  });

  function onChangeField(name) {
    return (event) => {
      const newData = { ...data, [name]: event.target.value };
      setData(newData);
    };
  }

  const onLogin = () => {
    if (props.onLogin) {
      props.onLogin(data);
    }
  };

  const getVideoData = () => {
    console.log(document.getElementById("DemoCamera_720p").value);
  };

  const selectItemList = (list) => {
    let itemList = [];
    for (let key in list) {
      itemList.push(<MenuItem key={key} value={key}>{list[key]}</MenuItem>);
    }
    return itemList;
  };

  return (
    <div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Basic Details</h2>
          <div className={classes.createRecipeItem}>
            <label htmlFor="create-title" className={classes.createRecipeLabel}>Title</label>
            <TextField
              id="create-title"
              type="text"
              onChange={onChangeField('title')}
              value={data.title}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
            />
          </div>
          <div className={classes.createRecipeItem}>
            <label htmlFor="create-description" className={classes.createRecipeLabel}>Description</label>
            <TextField
              id="create-description"
              multiline
              rows={4}
              onChange={onChangeField('description')}
              variant="outlined"
              value={data.description}
              fullWidth
              className={classMarerialUi.textField}
            />
          </div>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Ingredients</h2>
          <div className={classes.createRecipeSection__grid_type_card}>
            <CardIngredient />
            <CardIngredient />
            <CardIngredient />
            <CardIngredient />
            <CardIngredient />
            <CardIngredient />
            <button className={classes.createRecipeButton_type_addIngredient}>
              <p className={classes.createRecipeButton_type_addIngredient__icon}>&#43;</p>
              <p className={classes.createRecipeButton_type_addIngredient__text}>Add More</p>
            </button>
          </div>
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
          <camera id='DemoCamera' data-app-id='63f9c870-72c4-0130-04c5-123139045d73'></camera>
        </div>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle_withoutInput}>Video Elements</h2>
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
                value={data.cooking_time}
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
              value={data.types}
              onChange={onChangeField('types')}
              autoWidth
            >{
              selectItemList(recipeTypes)
            }
            </Select>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-diet-restrictions-select"
                className={classes.createRecipeLabel}>
                  Lifestyle
              </label>
              <Select
                id="create-diet-restrictions-select"
                value={data.diet_restrictions}
                onChange={onChangeField('diet_restrictions')}
                autoWidth
              >{
                selectItemList(dietaryrestrictions)
              }
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-cuisines-select"
                className={classes.createRecipeLabel}>
                  Cuisine
              </label>
              <Select
                id="create-cuisines-select"
                value={data.cuisines}
                onChange={onChangeField('cuisines')}
                autoWidth
                labelWidth={10}
              >{
                selectItemList(cuisineList)
              }
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classMarerialUi.formControl}>
              <label
                htmlFor="create-cooking-methods-select"
                className={classes.createRecipeLabel}>
                  Cooking Method
              </label>
              <Select
                id="create-cooking-methods-select"
                value={data.cooking_methods}
                onChange={onChangeField('cooking_methods')}
                autoWidth
              >{
                selectItemList(cookingMethods)
              }
              </Select>
            </FormControl>
          </div>
        </div>
        <Button
        onClick={getVideoData}
        // disabled={!data.email || !data.password}
        >
        Отдай данные
      </Button>
        {/* <FieldError errors={errors} path="detail" /> */}
      </form>
      <Button
        // onClick={onLogin}
        // disabled={!data.email || !data.password}
        >
        LOGIN
      </Button>
    </div>
  );
}

export default connect()(FormCreateRecipe);