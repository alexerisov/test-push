import React, { useState } from 'react';
import classes from './index.module.scss';
import { Button, FilledInput } from '@material-ui/core';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Recipe from '@/api/Recipe';
import { modalActions } from '@/store/actions';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [result, setResult] = useState([]);

  const validationSchema = yup.object({
    search: yup.string('Search for dish name')
  });

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      router.push(
        `search?title=${values.search}&${!isOnlyEatchefRecipesQueryExist() ? '' : 'only_eatchefs_recipes=Y'}`
      );
    }
  });

  const handleClickSearch = name => {
    return () => {
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const onChangeInputSearch = search => {
    if (!search.length) {
      setResult([]);
      return;
    }

    if (!isOnlyEatchefRecipesQueryExist()) {
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

  const isOnlyEatchefRecipesQueryExist = () => {
    return !!router?.query?.['only_eatchefs_recipes']?.includes('Y');
  };
  return (
    <div className={classes.search}>
      <form className={classes.search__form} onSubmit={formik.handleSubmit}>
        <TextField
          id="search"
          name="search"
          value={formik.values.search}
          placeholder="What do you want to eat?"
          onChange={e => {
            formik.handleChange(e);
            onChangeInputSearch(e.target.value);
          }}
          fullWidth
        />
        <div className={classes.search__container}>
          {result.length !== 0 ? (
            <div className={classes.search__grid}>
              <p>Suggestions :</p>
              <p>
                {result.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={`search?title=${item.result}&${
                        !isOnlyEatchefRecipesQueryExist() ? '' : 'only_eatchefs_recipes=Y'
                      }`}>
                      <a>
                        <button className={classes.search__buttonLink}>{item.result}</button>
                      </a>
                    </Link>
                  );
                })}
              </p>
            </div>
          ) : (
            <div className={classes.search__grid} />
          )}
          <Button
            onClick={handleClickSearch('search')}
            variant="contained"
            color="primary"
            className={classes.search__buttonSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export const SearchBlock = () => {
  return (
    <section className={classes.container}>
      <img src="/images/index/search-block.png" alt="image3" className={classes.search_image} />
      <SearchInput />
    </section>
  );
};
