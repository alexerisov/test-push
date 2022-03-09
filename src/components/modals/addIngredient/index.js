import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addIngredient.module.scss';
import TextField from '@material-ui/core/TextField';
import { units } from '@/utils/datasets';
import { Select, MenuItem, Collapse, Dialog } from '@material-ui/core';
import { getNumberWithMaxDigits } from '@/utils/helpers';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { ReactComponent as CloseIcon } from '../../../../public/icons/Close Circle/Line.svg';
import AddIcon from '@material-ui/icons/Add';
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

const validationSchema = yup.object({
  basicIngredient: yup.string().required('Ingredient is required'),
  quantity: yup
    .number()
    .min(0, 'Quantity should be greater than 0')
    .max(99999, 'Quantity should be less than 99999')
    .required('Quantity is required'),
  unit: yup.string().required('Unit is required')
});

const validationSchema2 = yup.object({
  name: yup.string().required('Name is required'),
  group: yup.string().required('Group is required')
});

const defaultUnits = () => {
  const result = [];
  for (let key in units) {
    result.push({ pk: key, unit: units[key] });
  }
  return result;
};

const renderOption = (option, { selected }) => {
  if (option.title === 'empty') {
    return (
      <span className={classes.option} value={option.pk}>
        <AddIcon htmlColor="#ffaa00" />
        You want to create new ingredient?
      </span>
    );
  }

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      basicIngredient: '',
      title: '',
      quantity: '',
      unit: '',
      old_unit: '',
      createIngredient: {
        name: '',
        group: ''
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
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

  const formik2 = useFormik({
    initialValues: {
      name: '',
      group: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: validationSchema2,
    onSubmit: async values => {
      try {
        const response = await Recipe.createBasicIngredient({ title: values.name, group: values.group });
        setBasicIngredient(response.data);
        formik.setFieldValue('basicIngredient', response.data.title);
        formik.setFieldValue('title', response.data.title);
        handleClose();
      } catch (e) {
        if (e.response.data?.title) {
          formik2.setFieldError('name', e.response.data?.title);
        }
        if (e.response.data?.group) {
          formik2.setFieldError('group', e.response.data?.title);
        }
      }
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

  const { data: ingredientGroups, error: ingredientGroupsError } = useSWR(
    isDialogOpen ? `/recipe/ingredient_groups` : null,
    fetcher
  );

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
    formik.validateField('basicIngredient');
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

  const handleClickOpen = () => {
    formik2.setFieldValue('name', formik.values.basicIngredient, false);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    formik2.resetForm();
    setIsDialogOpen(false);
  };

  const handleSelectGroup = event => {
    formik2.setFieldValue('group', event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    formik2.handleSubmit(event);
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        <h2 className={classes.addIngredient__title}>Add More Ingredients</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.submitForm}>
          <ErrorBoundary>
            <label htmlFor="addIngredient-group" className={classes.addIngredient__label}>
              Ingredient
            </label>
            <Autocomplete
              classes={{
                endAdornment: classes.addIngredient__close_icon
              }}
              key="autocomplete-basicIngredient"
              fullWidth
              id="autocomplete-basicIngredient"
              options={getOptionsList()}
              freeSolo
              autoComplete
              includeInputInList
              autoHighlight
              filterOptions={filterOptions}
              getOptionLabel={option => option.title}
              onChange={(event, newValue) => {
                if (newValue?.title === 'empty') {
                  handleClickOpen();
                  formik.setFieldValue('basicIngredient', '');
                }
                formik.setFieldValue('basicIngredient', newValue?.title || '');
                formik.setFieldValue('title', newValue?.title || '');
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
                  placeholder="Please select ingredient"
                  className={classMarerialUi.textField}
                  onChange={onChangeBasicIngredient}
                  value={formik.values.basicIngredient}
                />
              )}
            />
          </ErrorBoundary>

          <div>
            <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
              Extra information
            </label>
            <TextField
              id="addIngredient-title"
              name="title"
              variant="outlined"
              fullWidth
              placeholder="Enter custom name"
              className={classMarerialUi.textField}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>

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
              disabled={!basicIngredient?.pk}
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
        <Dialog open={isDialogOpen} aria-labelledby="form-dialog-title">
          <LayoutModal onClose={handleClose} themeName="white_small">
            <div className={classes.addIngredient}>
              <h2 className={classes.addIngredient__title}>Create new ingredient</h2>
              <form className={classes.addIngredient__form} onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
                    Name
                  </label>
                  <TextField
                    id="createIngredient-title"
                    name="name"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter ingredient name"
                    className={classMarerialUi.textField}
                    onChange={formik2.handleChange}
                    value={formik2.values.name}
                  />
                </div>
                <div>
                  <label htmlFor="create-types-select" className={classes.addIngredient__label}>
                    Group
                  </label>
                  <Select
                    MenuProps={MenuProps}
                    id="createIngredient-group"
                    name="group"
                    value={formik2.values.group}
                    onChange={handleSelectGroup}
                    variant="outlined"
                    fullWidth>
                    {ingredientGroups?.length > 0 &&
                      ingredientGroups.map(el => (
                        <MenuItem key={'group' + el.pk} value={el.pk}>
                          {el.title}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
                <div className={classes.addIngredient__buttonContainer}>
                  <button type="submit" disabled={!formik2.isValid} className={classes.addIngredient__button}>
                    Create
                  </button>
                  {Object.values(formik2.errors)?.length > 0 && <p>{Object.values(formik2.errors)[0]}</p>}
                </div>
              </form>
            </div>
          </LayoutModal>
        </Dialog>
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
