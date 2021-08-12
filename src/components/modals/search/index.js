import React, { useState } from 'react';
import {LayoutModal} from '@/components/layouts';
import { modalActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import Recipe from '@/api/Recipe.js';
import Link from "next/link";
import { useRouter } from 'next/router';

function SearchBanner (props) {

  const router = useRouter();

  const [result, setResult] = useState([]);

  const validationSchema = yup.object({
    search: yup
      .string('Search for dish name')
  });

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      router.push(`/search?title=${values.search}`);
      onCancel();
    },
  });

  const onChangeInputSearch = search => {
    if (!search.length) {
      setResult([]);
      return;
    }

    Recipe.getQueryResult(search)
      .then(res => setResult(res.data))
      .catch(e => {
        console.log('error', e);
      });
  };

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.search}>
      <form className={classes.search__form} onSubmit={formik.handleSubmit}>
        <TextField
            id="search"
            name="search"
            value={formik.values.search}
            placeholder="Search for dish name"
            onChange={(e) => {
              formik.handleChange(e);
              onChangeInputSearch(e.target.value);
            }}
            fullWidth
        />
        <div className={classes.search__container}>
          {(result.length !== 0) ? <div className={classes.search__grid}>
            <p>Suggestions :</p>
            <p>
            {result.map((item, index) => {
              return <Link key={index} href={`/search/?title=${item.result}`}>
                <a><button onClick={onCancel} className={classes.search__buttonLink}>{item.result}</button></a>
                </Link>
            })}
            </p>
          </div> : <div className={classes.search__grid} />}
          <Button
            type="submit"
            variant='contained'
            color='primary'
            className={classes.search__buttonSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
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
