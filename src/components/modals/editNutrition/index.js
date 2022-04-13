import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeEditActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addNutrition.module.scss';
import { TextField, FormControl, Select, MenuItem } from '@material-ui/core';
import { NUTRITIONS } from '@/utils/datasets';
import { getMaxQuantityOfNutrition } from '@/utils/checkTotalQuantityOfNutrition';
import { i18n } from 'next-i18next';

const useStyles = makeStyles(theme => ({
  formControl: {
    '& .MuiInputBase-input': {
      height: 'auto'
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '50px'
    }
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      height: '50px'
    },
    '& .MuiInputBase-input': {
      height: 'auto'
    }
  }
}));

function EditNutrition(props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeEdit;

  const nutritionData = {
    fat: Number(data.fats),
    carbs: Number(data.carbohydrates),
    proteins: Number(data.proteins)
  };

  const [nutrition, setNutrition] = React.useState({
    title: '',
    quantity: ''
  });

  const [error, setError] = useState(false);

  function onChangeField(name) {
    return event => {
      const newData = { ...nutrition, [name]: event.target.value };
      setNutrition(newData);
    };
  }

  function handleValidationOnSubmit() {
    if (nutrition.title === '') {
      setError(i18n?.t('errors:field_required.name'));
      return false;
    }
    if (nutrition.quantity === '') {
      setError(i18n?.t('errors:field_required.quantity'));
      return false;
    }
    if (isNaN(nutrition.quantity)) {
      setError(i18n?.t('errors:invalid.quantity'));
      return false;
    }
    if (nutrition.title === 'calories') {
      if (nutrition.quantity > 0 && nutrition.quantity < 100000) {
        setError(false);
        return true;
      }
      if (nutrition.quantity > 99999) {
        setError(i18n?.t('errors:must_be_less.quantity', { number: 99999 }));
        return false;
      }
    }
    if (nutrition.quantity > getMaxQuantityOfNutrition(nutritionData)) {
      setError(i18n?.t('errors:must_be_less.quantity', { number: getMaxQuantityOfNutrition(nutritionData) }));
      return false;
    }
    if (nutrition.quantity < 0) {
      setError(i18n?.t('errors:must_be_greater.quantity', { number: 0 }));
      return false;
    }
    return true;
  }

  function handleAddNutrition(e) {
    e.preventDefault();
    if (!handleValidationOnSubmit()) {
      return;
    }
    const newData = { ...data, [nutrition.title]: Number(nutrition.quantity).toFixed(2) };
    props.dispatch(recipeEditActions.update(newData));
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return (
      <div className={classes.addNutrition}>
        <h2 className={classes.addNutrition__title}>Add Nutrition Value</h2>
        <form className={classes.addNutrition__form} onSubmit={handleAddNutrition}>
          <FormControl variant="outlined" className={classMarerialUi.formControl} fullWidth>
            <label htmlFor="addNutrition-quantity" className={classes.addNutrition__label}>
              Name
            </label>
            <Select id="addNutrition-quantity" value={nutrition.title} onChange={onChangeField('title')} fullWidth>
              {!data?.calories ? <MenuItem value="calories">{NUTRITIONS.calories}</MenuItem> : null}
              {!data?.proteins ? <MenuItem value="proteins">{NUTRITIONS.proteins}</MenuItem> : null}
              {!data?.carbohydrates ? <MenuItem value="carbohydrates">{NUTRITIONS.carbohydrates}</MenuItem> : null}
              {!data?.fats ? <MenuItem value="fats">{NUTRITIONS.fats}</MenuItem> : null}
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
            <button type="submit" className={classes.addNutrition__button}>
              Add
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    );
  };

  return (
    <LayoutModal onClose={onCancel} themeName="white_small">
      {renderContent()}
    </LayoutModal>
  );
}

export default connect(state => ({
  recipeEdit: state.recipeEdit
}))(EditNutrition);
