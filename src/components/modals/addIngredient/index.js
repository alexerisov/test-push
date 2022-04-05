import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addIngredient.module.scss';
import TextField from '@material-ui/core/TextField';
import { units } from '@/utils/datasets';
import { Select, MenuItem, Dialog } from '@material-ui/core';
import { getNumberWithMaxDigits } from '@/utils/helpers';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import CloseIcon from '~public/icons/Close Circle/Line.svg';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';

import useSWR from 'swr';
import http from '@/utils/http';
import ErrorBoundary from '@/components/basic-blocks/error-boundary';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Recipe from '@/api/Recipe';
import { i18n, useTranslation } from 'next-i18next';
import { filterNaNLetters } from '@/utils/filterNaNLetters';
import log from 'loglevel';

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
        {i18n?.t('addIngredientModal:createIngredient.popupText')}
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
  const { t } = useTranslation('addIngredientModal');
  const classMarerialUi = useStyles();
  const { data } = props.recipeUpload;
  const [basicIngredient, setBasicIngredient] = useState(null);
  const [group, setGroup] = useState(null);
  const [shouldLoadUnits, setShouldLoadUnits] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUnitFocused, setIsUnitFocused] = useState(false);
  log.info('info');

  const validationSchema = yup.object({
    basicIngredient: yup.string().required(t('errors:field_required.ingredient')),
    quantity: yup
      .number()
      .min(0, t('errors:must_be_greater.quantity', { number: 0 }))
      .max(99999, t('errors:must_be_greater.quantity', { number: 99999 }))
      .required(t('errors:field_required.quantity')),
    unit: yup.string().required(t('errors:field_required.unit'))
  });

  const validationSchema2 = yup.object({
    name: yup.string().required(t('errors:field_required.name')),
    group: yup.string().required(t('errors:field_required.group'))
  });

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
        title: values.basicIngredient,
        extraInfo: values.title,
        unit: values.old_unit,
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

  const quantityInputRef = useRef();
  const buttonRef = useRef();

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
        const response = await Recipe.createBasicIngredient({ title: values.name, group: group.pk });
        setBasicIngredient(response.data);
        formik.setFieldValue('basicIngredient', response.data.title);
        handleClose();
        quantityInputRef.current.focus();
      } catch (e) {
        if (e.response.data?.title) {
          formik2.setFieldError('name', e.response.data?.title);
        }
        if (e.response.data?.group) {
          formik2.setFieldError('group', e.response.data?.group);
        }
      }
    }
  });

  const {
    data: autocompleteSuggestions,
    error: autocompleteError,
    isValidating: isAutocompleteLoading
  } = useSWR(
    formik.values?.basicIngredient?.length > 0
      ? `/recipe/basic_ingredients?title=${formik.values.basicIngredient}`
      : null,
    fetcher
  );

  const {
    data: basicIngredientUnits,
    error: basicIngredientUnitError,
    isValidating: isBasicIngredientUnitLoading
  } = useSWR(shouldLoadUnits ? `/recipe/units/${basicIngredient?.pk}` : null, fetcher);

  const {
    data: ingredientGroups,
    error: ingredientGroupsError,
    isValidating: isIngredientsGroupLoading
  } = useSWR(
    isDialogOpen && formik2.values?.group?.length > 0
      ? `/recipe/ingredient_groups?title=${formik2.values.group}`
      : null,
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

  const handleSelectUnit = (event, child) => {
    formik.setFieldValue('unit', event.target.value);
    formik.setFieldValue('old_unit', child.props.children);
    formik.validateField('unit');
    buttonRef.current.blur();
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
    const isSuggestionsIncludeTitle = Boolean(
      ingredientGroups?.some(el => el.title?.toLowerCase().trim() === event.target.value?.toLowerCase().trim())
    );
    if (isSuggestionsIncludeTitle) {
      setGroup(
        ingredientGroups?.filter(el => el.title.toLowerCase().trim() === event.target.value.toLowerCase().trim())[0]
      );
    } else {
      setGroup(null);
    }

    formik2.setFieldValue('group', event.target.value);
  };

  const onBlurGroup = () => {
    if (group?.pk) {
      setShouldLoadUnits(true);
      formik2.setFieldValue('group', group.title);
    } else {
      formik2.setFieldValue('group', '');
    }
    formik2.validateField('group');
  };

  const handleSubmit = event => {
    event.preventDefault();
    formik2.handleSubmit(event);
  };

  const handleExited = () => {
    formik.validateField('unit');
    setTimeout(() => {
      buttonRef.current.focus();
    }, 100);
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        <h2 className={classes.addIngredient__title}>{t('title')}</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.submitForm}>
          <ErrorBoundary>
            <label htmlFor="addIngredient-group" className={classes.addIngredient__label}>
              {t('ingredientInput.label')}
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
                  placeholder={t('ingredientInput.placeholder')}
                  className={classMarerialUi.textField}
                  onChange={onChangeBasicIngredient}
                  value={formik.values.basicIngredient}
                />
              )}
            />
          </ErrorBoundary>

          <div>
            <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
              {t('extraInput.label')}
            </label>
            <TextField
              id="addIngredient-title"
              name="title"
              variant="outlined"
              fullWidth
              placeholder={t('extraInput.placeholder')}
              className={classMarerialUi.textField}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>

          <div className={classes.addIngredient__container}>
            <label htmlFor="addIngredient-quantity" className={classes.addIngredient__label}>
              {t('quantityInput.label')}
            </label>
            <TextField
              inputRef={quantityInputRef}
              id="addIngredient-quantity"
              name="quantity"
              type="number"
              focus
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onKeyPress={filterNaNLetters}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
            />
            <label htmlFor="create-types-select" className={classes.addIngredient__label}>
              {t('unitInput.label')}
            </label>

            <Select
              MenuProps={{ ...MenuProps, onExited: handleExited }}
              id="addIngredient-unit"
              name="unit"
              disabled={!basicIngredient?.pk}
              value={formik.values.unit}
              onChange={handleSelectUnit}
              variant="outlined"
              placeholder={'Ingredient has no available units'}
              // onBlur={onBlurUnit}
              fullWidth>
              {basicIngredientUnits?.length > 0
                ? basicIngredientUnits.map(el => (
                    <MenuItem key={'unit' + el.pk} value={el.pk} onClick={() => formik.validateField('unit')}>
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
            <button type="submit" ref={buttonRef} disabled={!formik.isValid} className={classes.addIngredient__button}>
              {t('button')}
            </button>
            {Object.values(formik.errors)?.length > 0 && <p>{Object.values(formik.errors)[0]}</p>}
          </div>
        </form>
        <Dialog open={isDialogOpen} aria-labelledby="form-dialog-title">
          <LayoutModal onClose={handleClose} themeName="white_small">
            <div className={classes.addIngredient}>
              <h2 className={classes.addIngredient__title}>{t('createIngredient.title')}</h2>
              <form className={classes.addIngredient__form} onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="addIngredient-title" className={classes.addIngredient__label}>
                    {t('createIngredient.nameInput.label')}
                  </label>
                  <TextField
                    id="createIngredient-title"
                    name="name"
                    variant="outlined"
                    fullWidth
                    placeholder={t('createIngredient.nameInput.placeholder')}
                    className={classMarerialUi.textField}
                    onChange={formik2.handleChange}
                    value={formik2.values.name}
                  />
                </div>
                <div>
                  <ErrorBoundary>
                    <label htmlFor="create-types-select" className={classes.addIngredient__label}>
                      {t('createIngredient.groupInput.placeholder')}
                    </label>
                    <Autocomplete
                      classes={{
                        endAdornment: classes.addIngredient__close_icon
                      }}
                      key="autocomplete-group"
                      fullWidth
                      id="autocomplete-group"
                      options={ingredientGroups ? ingredientGroups : []}
                      freeSolo
                      autoComplete
                      includeInputInList
                      autoHighlight
                      getOptionLabel={option => option.title}
                      onChange={(event, newValue) => {
                        formik2.setFieldValue('group', newValue?.title || '');
                      }}
                      inputValue={formik2.values.group}
                      onBlur={onBlurGroup}
                      onInputChange={(_, newValue) => handleSelectGroup({ target: { value: newValue } })}
                      loading={isIngredientsGroupLoading}
                      renderOption={renderOption}
                      closeIcon={<BasicIcon icon={CloseIcon} color="#B1B5C3" size="32px" />}
                      renderInput={params => (
                        <TextField
                          {...params}
                          id="createIngredient-group"
                          name="group"
                          variant="outlined"
                          fullWidth
                          placeholder={t('createIngredient.groupInput.placeholder')}
                          className={classMarerialUi.textField}
                          onChange={handleSelectGroup}
                          value={formik2.values.group}
                        />
                      )}
                    />
                  </ErrorBoundary>
                </div>
                <div className={classes.addIngredient__buttonContainer}>
                  <button type="submit" disabled={!formik2.isValid} className={classes.addIngredient__button}>
                    {t('createIngredient.button')}
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
