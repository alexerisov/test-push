import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useActions } from '@/customHooks/useActions';
import { useFetch } from '@/customHooks/useFetch';

import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { LayoutModal } from '@/components/layouts';
import { Button } from '@material-ui/core';

import { modalActions } from '@/store/actions';
import ChefPencil from '@/api/ChefPencil';

import classes from './index.module.scss';

const SearchBanner = () => {
  const router = useRouter();
  const { data: suggestions, fetchDataNow: fetchSuggestions } = useFetch({
    request: ChefPencil.getPencilSearchSuggestions,
    query: {search: ''}
  });
  const { close } = useActions(modalActions);

  const createQueryParams = queryData => new URLSearchParams(queryData).toString();

  const validationSchema = yup.object({
    search: yup.string("Search for chef's pencil name")
  });

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      router.push(`/chef-pencil?title=${values.search}`);
      close();
    }
  });

  const onChangeInputSearch = search => {
    if (!search.length) {
      return;
    }

    fetchSuggestions(createQueryParams({ search }));
  };

  const renderContent = () => {
    return (
      <div className={classes.search}>
        <form className={classes.search__form} onSubmit={formik.handleSubmit}>
          <TextField
            id="search"
            name="search"
            value={formik.values.search}
            placeholder="Search for Chef's pencil name"
            onChange={e => {
              formik.handleChange(e);
              onChangeInputSearch(e.target.value);
            }}
            fullWidth
          />
          <div className={classes.search__container}>
            {suggestions?.length !== 0 ? (
              <div className={classes.search__grid}>
                <p>Suggestions :</p>
                <p>
                  {suggestions?.map((item, index) => {
                    return (
                      <Link key={index} href={`/chef-pencil?search=${item?.result}`}>
                        <a>
                          <button onClick={close} className={classes.search__buttonLink}>
                            {item.result}
                          </button>
                        </a>
                      </Link>
                    );
                  })}
                </p>
              </div>
            ) : (
              <div className={classes.search__grid}>
                <p>No search suggestions found!</p>
              </div>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.search__buttonSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <LayoutModal onClose={close} themeName="white">
      {renderContent()}
    </LayoutModal>
  );
};

export default SearchBanner;
