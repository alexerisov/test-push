import React from 'react';
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
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FieldError from '../../elements/field-error';
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions} from '@/utils/datasets';
import { isWindowExist } from '@/utils/isTypeOfWindow';
import classes from "./form-create-recipe.module.scss";
import { CardIngredient, CardNutrition, CardImage } from '@/components/elements/card';

function FormEditRecipe (props) {

  return (
    <div>
      <form className={classes.createRecipeForm}>
        <div className={classes.createRecipeSection}>
          <h2 className={classes.createRecipeSubtitle}>Edit Recipe</h2>
        </div>
      </form>
    </div>
  );
}

export default connect((state => ({
  recipeUpload: state.recipeUpload,
})))(FormEditRecipe);