import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import TextField from '@material-ui/core/TextField';
import Link from "next/link";

import Recipe from '@/api/Recipe.js';

import SearchIcon from '@material-ui/icons/Search';

import classes from './index.module.scss';
import {InputAdornment} from "@material-ui/core";

const InputSearchComponent = (props) => {
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
      router.push(`${router?.pathname}?title=${values.search}`);
    },
  });

  const onChangeInputSearch = search => {
    if (!search?.length) {
      setResult([]);
      return;
    }

    if (router.pathname === '/search') {
      Recipe.getQueryResult(search)
        .then(res => setResult(res.data))
        .catch(e => {
          console.log('error', e);
        });
    } else {
      Recipe.getQueryResult(search, true)
        .then(res => setResult(res.data))
        .catch(e => {
          console.log('error', e);
        });
    }
  };

  const renderContent = () => {
    return <div className={classes.search}>
      <form className={classes.search__form} onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          size={'small'}
          id="search"
          name="search"
          value={formik.values.search}
          placeholder="Search for dish name"
          onChange={(e) => {
            formik.handleChange(e);
            onChangeInputSearch(e.target.value);
          }}
          fullWidth={true}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {result.length !== 0 && <div className={classes.search__container}>
           <div className={classes.search__grid}>
             <p>Suggestions :</p>
            <p>
              {result.map((item, index) => {
                return <Link key={index} href={`${router?.pathname}/?title=${item.result}`}>
                  <a><button className={classes.search__buttonLink}>{item.result}</button></a>
                </Link>
              })}
            </p>
          </div>
        </div>}
      </form>
    </div>
  };

  return renderContent();
};

export default connect((state => ({
  search: state.search
})))(InputSearchComponent);
