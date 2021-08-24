import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {LayoutModal} from '@/components/layouts';
import { modalActions, recipeEditActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./addIngredient.module.scss";
import TextField from '@material-ui/core/TextField';
import { units } from '@/utils/datasets';
import { Select, MenuItem } from '@material-ui/core';
import {validator} from "@/utils/validator";

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
    },
    '& .MuiInputBase-input': {
      height: 'auto',
      width: 'auto',
    },
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    },
  },
};

function EditIngredient (props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeEdit;
  const [ingredient, setIngedient] = React.useState({
    title: '',
    quantity: '',
    unit: '',
  });

  const unitsList = [];
  for (let i = 1; i < Object.keys(units).length; i++) {
    unitsList.push(<MenuItem key={i} value={units[i]}>{units[i]}</MenuItem>);
  }

  const [error, setError] = useState(false);

  function onChangeField(name) {
    return (event) => {
      const newData = { ...ingredient, [name]: event.target.value };
      setIngedient(newData);
    };
  }

  const handleValidationOnSubmit = () => {
    if (ingredient.title === "") {
      setError("Name is required");
      return false;
    }
    if (ingredient.quantity === "") {
      setError("Quantity is required");
      return false;
    }
    if (ingredient.unit === "") {
      setError("Unit is required");
      return false;
    }
    if (isNaN(ingredient.quantity)) {
      setError("Quantity should be a number");
      return false;
    }
    if (ingredient.quantity < 0) {
      setError("Minimum possible quantity 0");
      return false;
    }
    if (ingredient.quantity > 99999) {
      setError("Maximum possible quantity 99999");
      return false;
    }
    if (validator.checkNumberOfDigits({maxDigits: 3, value: ingredient.quantity})) {
      setError("Maximum possible digits is 3");
      return false;
    }

    return true;
  };

  function handleAddIngredient (e) {
    e.preventDefault();
    if (!handleValidationOnSubmit()) {
      return;
    }
    const newData = { ...data, ingredients: [...data.ingredients, ingredient] };
    props.dispatch(recipeEditActions.update(newData));
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.addIngredient}>
      <h2 className={classes.addIngredient__title}>Add More Ingredients</h2>
      <form className={classes.addIngredient__form} onSubmit={handleAddIngredient}>
        <div>
          <label htmlFor="addIngredient-name" className={classes.addIngredient__label}>Name</label>
          <TextField
            id="addIngredient-name"
            name="title"
            value={ingredient.title}
            onChange={onChangeField('title')}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
        </div>
        <div className={classes.addIngredient__container}>
          <label htmlFor="addIngredient-quantity" className={classes.addIngredient__label}>Quantity</label>
          <TextField
            id="addIngredient-quantity"
            name="quantity"
            type="number"
            value={ingredient.quantity}
            onChange={onChangeField('quantity')}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
          <label htmlFor="create-types-select" className={classes.addIngredient__label}>Unit</label>
          <Select
            MenuProps={MenuProps}
            id="addIngredient-unit"
            name="unit"
            value={ingredient.unit}
            onChange={onChangeField('unit')}
            variant="outlined"
            fullWidth
          >{
            unitsList
          }
          </Select>
        </div>
        <div className={classes.addIngredient__buttonContainer}>
          <button
            type="submit"
            className={classes.addIngredient__button}
          >
            Add
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>;
  };

  return (
      <LayoutModal
        onClose={onCancel}
        themeName="white_small"
      >
        {renderContent()}
      </LayoutModal>
  );
}

export default connect((state => ({
  recipeEdit: state.recipeEdit,
})))(EditIngredient);
