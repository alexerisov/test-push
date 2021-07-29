import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./addIngredient.module.scss";
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem } from '@material-ui/core';

import { useFormik } from 'formik';
import * as yup from 'yup';

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

function AddCookingMission (props) {

  const { title, nameFormik, values = null } = props

  const classMarerialUi = useStyles();

  const validationSchema = yup.object({
    paragraph1: yup
      .string('Name your email')
      .required('Is required'),
    paragraph2: yup
      .string('Name your email')
      .required('Is required'),
    paragraph3: yup
      .string('Name your email')
      .required('Is required'),
  });

  const formik = useFormik({
    initialValues: {
      paragraph1: values ? values[0] : "",
      paragraph2: values ? values[1] : "",
      paragraph3: values ? values[2] : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = [];
      data.push(values.paragraph1);
      data.push(values.paragraph2);
      data.push(values.paragraph3);
      const res = {
        data: data,
        name: nameFormik
      }
      props.dispatch(modalActions.close(res));
    },
  });

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.addIngredient}>
      <h2 className={classes.addIngredient__title}>{title}</h2>
      <form className={classes.addIngredient__form} onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="addIngredient-name" className={classes.addIngredient__label}>First</label>
          <TextField
            id="paragraph1"
            name="paragraph1"
            value={formik.values.paragraph1}
            onChange={formik.handleChange}
            error={formik.touched.paragraph1 && Boolean(formik.errors.paragraph1)}
            helperText={formik.touched.paragraph1 && formik.errors.paragraph1}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
        </div>
        <div>
          <label htmlFor="addIngredient-name" className={classes.addIngredient__label}>Second</label>
          <TextField
            id="paragraph2"
            name="paragraph2"
            value={formik.values.paragraph2}
            onChange={formik.handleChange}
            error={formik.touched.paragraph2 && Boolean(formik.errors.paragraph2)}
            helperText={formik.touched.paragraph2 && formik.errors.paragraph2}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
        </div>
        <div>
          <label htmlFor="addIngredient-name" className={classes.addIngredient__label}>Third</label>
          <TextField
            id="paragraph3"
            name="paragraph3"
            value={formik.values.paragraph3}
            onChange={formik.handleChange}
            error={formik.touched.paragraph3 && Boolean(formik.errors.paragraph3)}
            helperText={formik.touched.paragraph3 && formik.errors.paragraph3}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
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

export default connect()(AddCookingMission);
