import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {LayoutModal} from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./addIngredient.module.scss";
import TextField from '@material-ui/core/TextField';
import { units } from '@/utils/datasets';
import { Select, MenuItem } from '@material-ui/core';

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
      width: 400,
    },
  },
};

function AddIngredient (props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeUpload;
  const [ingredient, setIngedient] = React.useState({
    title: '',
    quantity: '',
    unit: '',
  });

  const unitsList = [];
  for (let i = 1; i < Object.keys(units).length; i++) {
    unitsList.push(<MenuItem key={i} value={units[i]}>{units[i]}</MenuItem>);
  }

  function onChangeField(name) {
    return (event) => {
      const newData = { ...ingredient, [name]: event.target.value };
      setIngedient(newData);
    };
  }

  function handleAddIngredient (e) {
    e.preventDefault();
    const newData = { ...data, ingredients: [...data.ingredients, ingredient] };
    props.dispatch(recipeUploadActions.update(newData));
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
            type="number"
            id="addIngredient-quantity"
            name="quantity"
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
  recipeUpload: state.recipeUpload,
})))(AddIngredient);
