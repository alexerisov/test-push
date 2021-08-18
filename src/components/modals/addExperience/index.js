import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutModal } from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from './index.module.scss';
import TextField from '@material-ui/core/TextField';

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

function AddExperience(props) {
  const classMarerialUi = useStyles();

  const validationSchema = yup.object({
    experience: yup
      .string('Name your email')
      .required('Name is required')
      .min(5, 'Name should be of minimum 5 characters length')
      .max(100, 'Name should be of maximum 100 characters length')
  });

  const formik = useFormik({
    initialValues: {
      experience: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
      props.dispatch(modalActions.close(values));
    }
  });

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return (
      <div className={classes.addIngredient}>
        <h2 className={classes.addIngredient__title}>Add Experience</h2>
        <form className={classes.addIngredient__form} onSubmit={formik.handleSubmit}>
          <div>
            <label className={classes.addIngredient__label}>Experience</label>
            <TextField
              id="experience"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              error={formik.touched.experience && Boolean(formik.errors.experience)}
              helperText={formik.touched.experience && formik.errors.experience}
              variant="outlined"
              fullWidth
              className={classMarerialUi.textField}
            />
          </div>
          <div className={classes.addIngredient__buttonContainer}>
            <button type="submit" className={classes.addIngredient__button}>
              Add
            </button>
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

export default connect()(AddExperience);
