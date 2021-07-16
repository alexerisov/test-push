import React, { useState } from 'react';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { profileActions } from '@/store/actions';
import Recipe from '@/api/Recipe.js';
import Link from "next/link";

function SearchBanner (props) {

  const [result, setResult] = useState([]);

  const validationSchema = yup.object({
    search: yup
      .string('Search for dish name')
      .min(2, '')
  });

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      Recipe.getQueryResult(values.search)
        .then((res) => setResult(res.data))
        .catch(e => {
          console.log('error', e);
        });
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
            onChange={(e) => {
              formik.handleChange(e);
              formik.handleSubmit();  
          }}
            fullWidth
          />
      </form>
      <div className={classes.search__grid}>
        <p>Suggestions :</p>
        <p>
        {result.map((item, index) => {
          return <Link key={index} href={`/search/${item.result}`}>
            <a><button onClick={onCancel}>{item.result}</button></a>
            </Link>
        })}
        </p>
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
})))(SearchBanner);
