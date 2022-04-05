import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './addIngredient.module.scss';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'next-i18next';

import { useFormik } from 'formik';
import * as yup from 'yup';

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

function AddRoleModel(props) {
  const { t } = useTranslation();
  const classMarerialUi = useStyles();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('errors:field_required.name'))
      .min(5, t('errors:must_be_greater.name', { number: 5 }))
      .max(100, t('errors:must_be_less.name', { number: 100 }))
  });

  const [avatarFile, setAvatarFile] = useState();

  const [errorAvatar, setErrorAvatar] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (!values.avatar) {
        setErrorAvatar(t('errors:field_required.avatar'));
        return;
      } else {
        props.dispatch(modalActions.close(values));
      }
    }
  });

  const inputRef = React.createRef();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        <h2 className={classes.addIngredient__title}>Add Role model</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.handleSubmit}>
          <div className={classes.card__formImages}>
            <div className={classes.card__upload}>
              {!avatarFile ? (
                <div className={classes.card__avatarNone} />
              ) : (
                avatarFile && <img src={avatarFile} alt="avatar" className={classes.card__avatar} />
              )}
              <button type="button" className={classes.card__button} onClick={onClickUpload}>
                +
              </button>
            </div>
            <input
              type="file"
              ref={inputRef}
              name="avatar"
              value={formik.avatar}
              hidden
              onChange={event => {
                setAvatarFile(URL.createObjectURL(event.currentTarget.files[0]));
                formik.setFieldValue('avatar', event.currentTarget.files[0]);
              }}
            />
          </div>
          <div>
            <label htmlFor="addIngredient-name" className={classes.addIngredient__label}>
              Name
            </label>
            <TextField
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
            />
          </div>
          <div className={classes.addIngredient__buttonContainer}>
            <button type="submit" className={classes.addIngredient__button}>
              Add
            </button>
            {errorAvatar && <p>{errorAvatar}</p>}
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
}))(AddRoleModel);
