import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useFetch } from '@/customHooks/useFetch';
import { useRouter } from 'next/router';
import { useActions } from '@/customHooks/useActions';

import Link from 'next/link';
import Pagination from '@material-ui/lab/Pagination';
import { MainCardChefPencil } from '@/components/elements/card';

import ChefPencil from '@/api/ChefPencil';

import classes from './index.module.scss';
import SearchIcon from '@material-ui/icons/Search';
import { modalActions } from '@/store/actions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const ChefPencilsPage = () => {
  const matches = useMediaQuery('(max-width: 992px)');
  const router = useRouter();
  const [query, setQuery] = useState();

  const createQueryParams = queryObject => {
    return new URLSearchParams(queryObject).toString();
  };

  const { open } = useActions(modalActions);

  // Pagination
  const itemsPerPage = matches ? 6 : 7;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const { data: pencils, fetchDataNow } = useFetch({
    request: ChefPencil.getChefPencils,
    initialValue: [],
    query: createQueryParams({
      page,
      page_size: itemsPerPage
    })
  });

  const countPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  const handlePageChange = (event, value) => {
    const query = new URLSearchParams({
      search: router?.query?.search ?? '',
      page: value,
      page_size: itemsPerPage
    });

    setPage(value);
    router.replace(`chef-pencil?${query}`, null, {
      scroll: false
    });
  };

  useEffect(() => {
    const numberOfPages = countPages(pencils?.count);
    setNumberOfPages(numberOfPages);
  }, [pencils]);

  useEffect(() => {
    if (Object.entries(router.query).length !== 0) {
      setQuery(router.query);
    }

    setPage(router.query.page ? Number(router.query.page) : 1);
  }, [router]);

  useEffect(() => {
    if (query) {
      fetchDataNow(createQueryParams(query));
    }
  }, [query]);

  const handleClickSearch = name => {
    return () => {
      open(name).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const content = (
    <div className={classes.pencils}>
      <h2 className={classes.pencils__navbar}>
        <div className={classes.pencils__breadcrumbs}>
          <Link href="/">
            <a className={classes.pencils__navbar__link}>Home /</a>
          </Link>
          <span>{" Chef's pencils"}</span>
        </div>

        <SearchIcon className={classes.pencils__searchIcon} onClick={handleClickSearch('SearchModal')} />
      </h2>

      <div className={classes.pencils__header}>
        <h2 className={classes.pencils__title}>{"Chef's Pencil"}</h2>
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
              publishStatus={item?.status}
            />
          ))
        ) : (
          <span>{"No chef's pencils found!"}</span>
        )}
      </div>

      {pencils?.results?.length !== 0 && (
        <Pagination
          classes={{ root: classes.pencils__pagination }}
          count={numberOfPages}
          size={matches ? 'small' : 'large'}
          onChange={handlePageChange}
          page={page}
          siblingCount={matches ? 0 : 1}
        />
      )}
    </div>
  );

  return <LayoutPageNew content={content} />;
};

export default ChefPencilsPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
      // Will be passed to the page component as props
    }
  };
}
