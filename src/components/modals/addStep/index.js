import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addStep.module.scss';
import TextField from '@material-ui/core/TextField';
import { validator } from '@/utils/validator';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      minHeight: '50px'
    },
    '& .MuiInputBase-input': {
      height: 'auto'
    }
  }
}));

function AddStep(props) {
  const { t } = useTranslation('addStepModal');
  const classMarerialUi = useStyles();
  const FIRST_STEP = 1;
  const { data } = props.recipeUpload;
  const [step, setStep] = React.useState({
    title: props?.modal?.params ? props?.modal?.params.title : '',
    description: props?.modal?.params ? props?.modal?.params.description : '',
    num: data.steps.length === 0 ? FIRST_STEP : data.steps.length + 1
  });

  const [errorForm, setErrorForm] = useState(null);

  function onChangeField(name) {
    return event => {
      const currentLength = event?.target.value.length;
      const newError = {
        ...errorForm,
        [name]: `${validator.getErrorStatusByCheckingLength({
          currentLength,
          ...getMaxLengthOfField(name)
        })}`
      };
      const newData = { ...step, [name]: event.target.value };
      setStep(newData);
      setErrorForm(newError);
      if (name === 'title') {
        setRemainingСharactersTitle(maxStepTitle - event.target.value.length);
      }
      if (name === 'description') {
        setRemainingСharactersDescription(maxStepDescription - event.target.value.length);
      }
    };
  }

  const getMaxLengthOfField = name => {
    switch (name) {
      case 'title':
        return { maxLength: 50 };
      case 'description':
        return { maxLength: 200 };
    }
  };

  const [error, setError] = useState(false);

  const maxStepTitle = 50;
  const maxStepDescription = 200;

  const [remainingСharactersTitle, setRemainingСharactersTitle] = useState(maxStepTitle - step.title.length);
  const [remainingСharactersDescription, setRemainingСharactersDescription] = useState(
    maxStepDescription - step.description.length
  );

  const handleValidationOnSubmit = () => {
    if (step.title === '') {
      setError(i18n?.t('errors:field_required.title'));
      return false;
    }
    if (step.description === '') {
      setError(i18n?.t('errors:field_required.description'));
      return false;
    }
    return true;
  };

  function handleAddStep(e) {
    e.preventDefault();
    if (!handleValidationOnSubmit()) {
      return;
    }
    const newData = { ...data, steps: [...data.steps, step] };
    props.dispatch(recipeUploadActions.update(newData));
    props.dispatch(modalActions.close());
  }

  function handleUpdateStep(e) {
    e.preventDefault();
    if (!handleValidationOnSubmit()) {
      return;
    }
    const newData = { ...data };
    newData.steps[props?.modal?.params.num - 1].title = step.title;
    newData.steps[props?.modal?.params.num - 1].description = step.description;
    props.dispatch(recipeUploadActions.update(newData));
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return (
      <div className={classes.addStep}>
        <h2 className={classes.addStep__title}>
          {props?.modal?.params
            ? `${t('editStepTitle')} ${props?.modal?.params.num}`
            : `${t('addStepTitle')} ${data.steps.length === 0 ? FIRST_STEP : data.steps.length + 1}`}
        </h2>
        <form className={classes.addStep__form} onSubmit={props?.modal?.params ? handleUpdateStep : handleAddStep}>
          <div>
            <label htmlFor="addStep-name" className={classes.addStep__label}>
              {t('titleInput.label')}
            </label>
            <TextField
              id="addStep-name"
              name="title"
              autoFocus
              value={step.title}
              onChange={onChangeField('title')}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
              inputProps={{ maxLength: maxStepTitle }}
              error={Boolean(errorForm?.title)}
              helperText={errorForm?.title}
            />
            <p className={classes.addStep__maxLength}>{`${remainingСharactersTitle} ${t('charactersLeft')}`}</p>
          </div>
          <div>
            <label htmlFor="addSep-description" className={classes.addStep__label}>
              {t('descriptionInput.label')}
            </label>
            <TextField
              id="addSep-description"
              name="description"
              value={step.description}
              onChange={onChangeField('description')}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className={classMarerialUi.textField}
              inputProps={{ maxLength: maxStepDescription }}
              error={Boolean(errorForm?.description)}
              helperText={errorForm?.description}
            />
            <p className={classes.addStep__maxLength}>{`${remainingСharactersDescription} ${t('charactersLeft')}`}</p>
          </div>
          <div className={classes.addStep__buttonContainer}>
            <button type="submit" className={classes.addStep__button}>
              {props?.modal?.params ? t('editButton') : t('addButton')}
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
  recipeUpload: state.recipeUpload,
  modal: state.modal
}))(AddStep);
