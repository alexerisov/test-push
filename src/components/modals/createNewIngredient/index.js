import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import { UNITS } from '@/utils/datasets';
import { Select, MenuItem } from '@material-ui/core';
import { getNumberWithMaxDigits } from '@/utils/helpers';
import AddIcon from '@material-ui/icons/Add';

import useSWR from 'swr';
import http from '@/utils/http';
import { useFormik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      '&.Mui-disabled fieldset': {
        opacity: 0.3
      }
    },
    '& .MuiInputBase-input': {
      height: 'auto',
      width: 'auto'
    }
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  disableScrollLock: true,
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
    }
  }
};

const fetcher = (...args) =>
  http
    .get(...args)
    .then(res => {
      return res?.data?.results;
    })
    .catch(e => {
      console.log('error', e);
    });

const defaultUnits = () => {
  const result = [];
  for (let key in UNITS) {
    result.push({ pk: key, unit: UNITS[key] });
  }
  return result;
};

const renderOption = (option, { selected }) => {
  if (option.title === 'empty') {
    return (
      <span className={classes.option} value={option.pk}>
        <AddIcon htmlColor="#ffaa00" />
        Do you want to create new ingredient?
      </span>
    );
  }

  return (
    <span className={classes.option} value={option.pk}>
      {option.title}
    </span>
  );
};

function CreateNewIngredient(props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeUpload;
  const [basicIngredient, setBasicIngredient] = useState(null);
  const [shouldLoadUnits, setShouldLoadUnits] = useState();

  const validationSchema = yup.object({
    basiIngredient: yup.string().required(t('errors:field_required.ingredient')),
    quantity: yup
      .number()
      .min(0, t('errors:must_be_greater.quantity', { number: 0 }))
      .max(99999, t('errors:must_be_less.quantity', { number: 99999 }))
      .required(t('errors:field_required.quantity')),
    unit: yup.string().required(t('errors:field_required.unit')),
    group: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      customTitle: '',
      quantity: '',
      unit: '',
      old_unit: '',
      basicIngredient: ''
    },
    validateOnBlur: true,
    validateOnChang: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      const preparedValues = {
        title: values.title,
        quantity: getNumberWithMaxDigits(Number(values.quantity), 3)
      };

      if (basicIngredientUnits?.length > 0) {
        preparedValues.custom_unit = values.unit;
      } else {
        preparedValues.unit = values.old_unit;
      }

      if (basicIngredient) {
        preparedValues.basic_ingredient = basicIngredient.pk;
      }

      const newData = { ...data, ingredients: [...data.ingredients, preparedValues] };
      props.dispatch(recipeUploadActions.update(newData));
      props.dispatch(modalActions.close());
    }
  });

  const {
    data: autocompleteSuggestions,
    error: autocompleteError,
    isValidating: isAutocompleteLoading
  } = useSWR(
    formik.values?.basicIngredient?.length > 1
      ? `/recipe/basic_ingredients?title=${formik.values.basicIngredient}`
      : null,
    fetcher
  );

  const {
    data: basicIngredientUnits,
    error: basicIngredientUnitError,
    isValidating: isBasicIngredientUnitLoading
  } = useSWR(shouldLoadUnits ? `/recipe/units/${basicIngredient?.pk}` : null, fetcher);

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const onChangeBasicIngredient = event => {
    setShouldLoadUnits(false);
    const isSuggestionsIncludeTitle = Boolean(
      autocompleteSuggestions?.some(el => el.title?.toLowerCase().trim() === event.target.value?.toLowerCase().trim())
    );
    if (isSuggestionsIncludeTitle) {
      setBasicIngredient(
        autocompleteSuggestions?.filter(
          el => el.title.toLowerCase().trim() === event.target.value.toLowerCase().trim()
        )[0]
      );
    } else {
      setBasicIngredient(null);
    }

    formik.setFieldValue('basicIngredient', event.target.value);
  };

  const onBlur = () => {
    if (basicIngredient?.pk) {
      setShouldLoadUnits(true);
      formik.setFieldValue('basicIngredient', basicIngredient.title);
    } else {
      formik.setFieldValue('basicIngredient', '');
    }
  };

  const handleSelectBasicIngredient = (event, newValue) => {
    setBasicIngredient(newValue);
    formik.setFieldValue('basicIngredient', newValue?.title);
  };

  const handleSelectUnit = (event, child) => {
    formik.setFieldValue('unit', event.target.value);
    formik.setFieldValue('old_unit', child.props.children);
    formik.validateField('unit');
  };

  const onBlurUnit = () => {
    formik.validateField('unit');
  };

  const getOptionsList = () => {
    if (isAutocompleteLoading) {
      return [{ title: '...loading' }];
    }

    if (!autocompleteSuggestions) {
      return [];
    }

    return autocompleteSuggestions;
  };

  const filterOptions = options => {
    const result = [...options];

    if (autocompleteSuggestions?.length < 1 && formik.values.basicIngredient !== '') {
      result.push({ title: 'empty' });
    }

    return result;
  };

  const handleClickPopupOpen = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params));
    };
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        <h2 className={classes.addIngredient__title}>Add More Ingredients</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.submitForm}>
          <div>
            <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
              Extra information
            </label>
            <TextField
              id="addIngredient-title"
              name="customTitle"
              variant="outlined"
              fullWidth
              placeholder="Enter title"
              className={classMarerialUi.textField}
              onChange={formik.handleChange}
              value={formik.values.customTitle}
            />
          </div>
          <div>
            <label htmlFor="create-types-select" className={classes.addIngredient__label}>
              Unit
            </label>
            <Select
              MenuProps={MenuProps}
              id="addIngredient-unit"
              name="unit"
              value={formik.values.unit}
              onChange={handleSelectUnit}
              variant="outlined"
              placeholder={'Ingredient has no available units'}
              onBlur={onBlurUnit}
              fullWidth>
              {basicIngredientUnits?.length > 0
                ? basicIngredientUnits.map(el => (
                    <MenuItem key={'unit' + el.pk} value={el.pk}>
                      {el.primary_type === 'imperial' ? el.imperial_name : el.metric_name}
                    </MenuItem>
                  ))
                : defaultUnits().map(el => (
                    <MenuItem key={'default-unit' + el.pk} value={el.pk}>
                      {t(`units:${el.unit}`)}
                    </MenuItem>
                  ))}
            </Select>
          </div>
          <div className={classes.addIngredient__buttonContainer}>
            <button type="submit" disabled={!formik.isValid} className={classes.addIngredient__button}>
              Add
            </button>
            {Object.values(formik.errors)?.length > 0 && <p>{Object.values(formik.errors)[0]}</p>}
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
  recipeUpload: state.recipeUpload
}))(CreateNewIngredient);
