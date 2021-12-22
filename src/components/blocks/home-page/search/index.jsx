import React, { useState } from 'react';
import classes from './index.module.scss';
import { Button, FilledInput, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Recipe from '@/api/Recipe';
import { modalActions } from '@/store/actions';
import TextField from '@material-ui/core/TextField';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Autocomplete } from '@material-ui/lab';
import SearchImage from '@/../public/images/index/search-block.png';
import { ReactComponent as SearchIcon } from '@/../public/icons/Search/Line.svg';
import { ReactComponent as CloseIcon } from '@/../public/icons/Close Circle/Line.svg';
import { ReactComponent as RecipeIcon } from '@/../public/icons/Receipt/Line.svg';

const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const loading = open && result?.length === 0;

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

  const renderOption = (option, { selected }) => {
    return (
      <span className={classes.option}>
        <span className={classes.option_icon}>
          <RecipeIcon />
        </span>
        {option}
      </span>
    );
  };

  return (
    <div className={classes.search_input_wrapper}>
      <form className={classes.search_form} onSubmit={formik.handleSubmit}>
        <Autocomplete
          classes={{
            root: classes.search_autocomplete_root,
            paper: classes.search_autocomplete_paper,
            listbox: classes.search_autocomplete_listbox,
            endAdornment: classes.search_autocomplete_close_icon
          }}
          fullWidth
          id="combo-box-demo"
          options={result?.map(option => option.result)}
          freeSolo
          renderOption={renderOption}
          closeIcon={<CloseIcon />}
          renderInput={params => (
            <TextField
              {...params}
              id="search"
              name="search"
              variant="filled"
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.search_input, focused: classes.search_input_focused },
                disableUnderline: true
              }}
              value={formik.values.search}
              placeholder="What do you want to eat?"
              onChange={e => {
                formik.handleChange(e);
                onChangeInputSearch(e.target.value);
              }}
              // fullWidth
            />
          )}
        />
        <IconButton
          type="submit"
          className={classes.search_button}
          style={{ background: '#FFAA00', color: 'white' }}
          size="32px">
          <SearchIcon className={classes.search_button_icon} />
        </IconButton>
      </form>
    </div>
  );
};

export const SearchBlock = () => {
  return (
    <section className={classes.container}>
      <div className={classes.search_image_wrapper}>
        <div className={classes.search_image_text_wrapper}>
          <div className={classes.search_image_text_title}>Eat Personal</div>
          <div className={classes.search_image_text_subtitle}>Find a great Recipe</div>
        </div>
        <img src="/images/index/search-block.png" alt="Head picture" className={classes.search_image} />
      </div>
      <SearchInput />
    </section>
  );
};
