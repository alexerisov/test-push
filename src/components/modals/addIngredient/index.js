import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addIngredient.module.scss';
import TextField from '@material-ui/core/TextField';
import { units } from '@/utils/datasets';
import { Select, MenuItem, Collapse } from '@material-ui/core';
import { getNumberWithMaxDigits } from '@/utils/helpers';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { ReactComponent as CloseIcon } from '../../../../public/icons/Close Circle/Line.svg';
import { Autocomplete } from '@material-ui/lab';

import useSWR from 'swr';
import http from '@/utils/http';
import ErrorBoundary from '@/components/basic-blocks/error-boundary';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Recipe from '@/api/Recipe';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px'
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

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  quantity: yup
    .number()
    .min(0, 'Quantity should be greater than 0')
    .max(99999, 'Quantity should be less than 99999')
    .required('Quantity is required'),
  unit: yup.string().required('Unit is required'),
  group: yup.string()
});

const SelectList = ({ list, valueField, labelField, key }) => (
  <React.Fragment>
    {list?.length > 0 &&
      list.map(el => (
        <MenuItem key={key + el[valueField]} value={el[valueField]}>
          {el[labelField]}
        </MenuItem>
      ))}
  </React.Fragment>
);

const defaultUnits = () => {
  const result = [];
  for (let key in units) {
    result.push({ pk: key, unit: units[key] });
  }
  return result;
};

const renderOption = (option, { selected }) => {
  return (
    <span className={classes.option} value={option.pk}>
      {option.title}
    </span>
  );
};

function AddIngredient(props) {
  const classMarerialUi = useStyles();
  const { data } = props.recipeUpload;
  const [basicIngredient, setBasicIngredient] = useState(null);
  const [shouldLoadUnits, setShouldLoadUnits] = useState();

  const formik = useFormik({
    initialValues: {
      title: '',
      quantity: '',
      unit: '',
      old_unit: '',
      basicIngredient: ''
    },
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
    } else {
      formik.setFieldValue('basicIngredient', 'None');
    }
  };

  const handleSelectBasicIngredient = (event, newValue) => {
    setBasicIngredient(newValue);
    formik.setFieldValue('basicIngredient', newValue?.title);
  };

  const handleSelectUnit = (event, child) => {
    formik.setFieldValue('unit', event.target.value);
    formik.setFieldValue('old_unit', child.props.children);
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        {JSON.stringify(formik.values, 4, 8)}
        <h2 className={classes.addIngredient__title}>Add More Ingredients</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.submitForm}>
          <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
            Name
          </label>
          <TextField
            id="addIngredient-title"
            name="title"
            variant="outlined"
            fullWidth
            placeholder="Enter ingredient name"
            className={classMarerialUi.textField}
            onChange={formik.handleChange}
            value={formik.values.title}
          />

          <ErrorBoundary>
            <div>
              <label htmlFor="addIngredient-group" className={classes.addIngredient__label}>
                Type
              </label>
              <Autocomplete
                classes={{
                  endAdornment: classes.addIngredient__close_icon
                }}
                key="autocomplete-basicIngredient"
                fullWidth
                id="autocomplete-basicIngredient"
                options={
                  isAutocompleteLoading
                    ? [{ title: '...loading' }]
                    : autocompleteSuggestions
                    ? autocompleteSuggestions
                    : []
                }
                freeSolo
                autoComplete
                includeInputInList
                autoHighlight
                getOptionLabel={option => option.title}
                onChange={(event, newValue) => {
                  formik.setFieldValue('basicIngredient', newValue?.title || '');
                }}
                inputValue={formik.values.basicIngredient}
                onBlur={onBlur}
                onInputChange={(_, newValue) => onChangeBasicIngredient({ target: { value: newValue } })}
                loading={isAutocompleteLoading}
                renderOption={renderOption}
                closeIcon={<BasicIcon icon={CloseIcon} color="#B1B5C3" size="32px" />}
                renderInput={params => (
                  <TextField
                    {...params}
                    id="addIngredient-basicIngredient"
                    name="basicIngredient"
                    variant="outlined"
                    fullWidth
                    placeholder="Please select type"
                    className={classMarerialUi.textField}
                    onChange={onChangeBasicIngredient}
                    value={formik.values.basicIngredient}
                  />
                )}
              />
            </div>
          </ErrorBoundary>
          <div className={classes.addIngredient__container}>
            <label htmlFor="addIngredient-quantity" className={classes.addIngredient__label}>
              Quantity
            </label>
            <TextField
              id="addIngredient-quantity"
              name="quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
            />
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
              fullWidth>
              {basicIngredientUnits?.length > 0
                ? basicIngredientUnits.map(el => (
                    <MenuItem key={'unit' + el.pk} value={el.pk}>
                      {el.metric_name}
                    </MenuItem>
                  ))
                : defaultUnits().map(el => (
                    <MenuItem key={'default-unit' + el.pk} value={el.pk}>
                      {el.unit}
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
}))(AddIngredient);
