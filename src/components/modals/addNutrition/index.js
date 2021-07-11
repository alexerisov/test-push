import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {LayoutModal} from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./addNutrition.module.scss";
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core';
import { nutritions } from '@/utils/datasets';

const useStyles = makeStyles((theme) => ({
  formControl: {
    '& .MuiInputBase-input': {
      height: 'auto',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '50px'
    },
    
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '50px'
    },
    '& .MuiInputBase-input': {
      height: 'auto',
    },
  }
}));

function AddNutrition (props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeUpload;
  const [nutrition, setNutrition] = React.useState({
    title: '',
    quantity: '',
  });

  function onChangeField(name) {
    return (event) => {
      const newData = { ...nutrition, [name]: event.target.value };
      setNutrition(newData);
    };
  }

  function handleAddNutrition (e) {
    e.preventDefault();
    const newData = { ...data, [nutrition.title]: nutrition.quantity };
    props.dispatch(recipeUploadActions.update(newData));
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const selectItemList = (list) => {
    let itemList = [];
    for (let key in list) {
      itemList.push(<MenuItem key={key} value={key}>{list[key]}</MenuItem>);
    }
    return itemList;
  };

  const renderContent = () => {
    return <div className={classes.addNutrition}>
      <h2 className={classes.addNutrition__title}>Add Nutrition Value</h2>
      <form className={classes.addNutrition__form} onSubmit={handleAddNutrition}>
        <FormControl variant="outlined" className={classMarerialUi.formControl} fullWidth>
          <label
            htmlFor="addNutrition-quantity"
            className={classes.addNutrition__label}>
              Name
          </label>
          <Select
            id="addNutrition-quantity"
            value={nutrition.title}
            onChange={onChangeField('title')}
            fullWidth
          >
          {
            !data?.calories ? <MenuItem value='calories'>{nutritions.calories}</MenuItem> : null
          }
          {
            !data?.proteins ? <MenuItem value='proteins'>{nutritions.proteins}</MenuItem> : null
          }
          {
            !data?.carbohydrates ? <MenuItem value='carbohydrates'>{nutritions.carbohydrates}</MenuItem> : null
          }
          {
            !data?.fats ? <MenuItem value='fats'>{nutritions.fats}</MenuItem> : null
          }
          </Select>
        </FormControl>
        <div>
          <label htmlFor="addNutrition-quantity" className={classes.addNutrition__label}>
            {nutrition.title === 'calories' ? 'Quantity' : 'Percentage'}
          </label>
          <TextField
            id="addNutrition-quantity"
            name="quantity"
            type="number"
            value={nutrition.quantity}
            onChange={onChangeField('quantity')}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
        </div>
        <div className={classes.addNutrition__buttonContainer}>
          <button
            type="submit"
            className={classes.addNutrition__button}
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
})))(AddNutrition);
