import React from 'react';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { profileActions } from '@/store/actions';

function Search (props) {

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.search}>
      <form className={classes.search__form}>
        <TextField
            id="search"
            name="search"
            value={formik.values.search}
            placeholder="Search for dish name"
            onChange={formik.handleChange}
            fullWidth
          />
      </form>
      <div className={classes.search__grid}>
        <p>Suggestions :</p>
        <p>Lemon Rice  Lemon Rice  Lemon Rice  Lemon Rice  Lemon Rice  Lemon Rice</p>
      </div>
    </div>
  }

  return (
      <LayoutModal
          onClose={onCancel}
          themeName="white">
          {renderContent()}
      </LayoutModal>
  );
}

export default connect((state => ({
  search: state.search
})))(Search);
