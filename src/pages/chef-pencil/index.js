import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFetch } from '@/customHooks/useFetch';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { LayoutPage } from '@/components/layouts';
import Pagination from '@material-ui/lab/Pagination';
import { MainCardChefPencil } from '@/components/elements/card';

import ChefPencil from '@/api/ChefPencil';

import classes from './index.module.scss';

const ChefPencilsPage = () => {
  const router = useRouter();
  const matches = useMediaQuery('(max-width: 768px)');
  const {
    data: pencils,
    fetchDataNow
  } = useFetch({
    request: ChefPencil.getChefPencils,
    initialValue: []
  });

  // Pagination params
  const itemsPerPage = matches ? 7 : 7;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  // Pagination
  useEffect(() => {
    const numberOfPages = countPages(pencils?.count);
    setNumberOfPages(numberOfPages);
  }, [pencils]);

  useEffect(() => {
    const query = new URLSearchParams({
      page,
      page_size: itemsPerPage
    });

    router.replace(`chef-pencil/?${query.toString()}`);
    fetchDataNow(query.toString());
  }, [page]);

  const content = (
    <div className={classes.pencils}>
      <h2 className={classes.pencils__navbar}>
        <Link href="/">
          <a className={classes.pencils__navbar__link}>Home /</a>
        </Link>
        <span>{" Chef's pencils"}</span>
      </h2>

      <div className={classes.pencils__header}>
        <h2 className={classes.pencils__title}>{"Chef's Pencil"}</h2>

        {/*Здесь будет поиск*/}
      </div>

      <div className={classes.pencils__items}>
        {pencils?.results?.length ? (
          pencils?.results?.map(item => (
            // TODO надо понять как description, котоырй как html разделить на куски
            <MainCardChefPencil
              key={`${item?.pk + '1k0'}`}
              title={item?.title}
              chefName={item?.user?.full_name}
              image={item?.image}
              id={item?.pk}
              description={item?.title}
            />
          ))
        ) : (
          <span>{"No chef's pencils yet!"}</span>
        )}
      </div>

      {pencils?.results?.length !== 0 && (
        <Pagination
          classes={{ root: classes.pencils__pagination }}
          count={numberOfPages}
          size={matches ? 'small' : 'large'}
          onChange={(event, number) => setPage(number)}
          defaultPage={1}
          siblingCount={matches ? 0 : 1}
        />
      )}
    </div>
  );

  return <LayoutPage content={content} />;
};

export default ChefPencilsPage;
