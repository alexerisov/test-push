import React, { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Link from 'next/link';
import { ButtonUpload } from '@/components/elements/button';
import { LayoutPage } from '@/components/layouts';
import Pagination from '@material-ui/lab/Pagination';
import { CardChefPencil } from "@/components/elements/card";

import ChefPencil from '@/api/ChefPencil';
import { RedirectWithoutAuthAndByCheckingUserType } from '@/utils/authProvider';
import { CHEF_TYPE } from '@/utils/constants';

import classes from './index.module.scss';

const MyUploadsPage = () => {
  const matches = useMediaQuery('(max-width: 767.95px)');
  const [uploadPencils, setUploadPencils] = useState();

  // Pagination params
  const itemsPerPage = matches ? 6 : 12;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  useEffect(() => {
    getUploadRecipes();
  }, [page, itemsPerPage]);

  const getUploadRecipes = async () => {
    try {
      const response = await ChefPencil.getUploadPencils(itemsPerPage, page);
      await setNumberOfPages(countPages(response.data.count));
      await setUploadPencils(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const content = (
    <div className={classes.pencils}>
      <h2 className={classes.pencils__navbar}>
        <Link href="/">
          <a className={classes.pencils__navbar__link}>Home /</a>
        </Link>
        <span> My pencils</span>
      </h2>

      <div className={classes.pencils__header}>
        <h2 className={classes.pencils__title}>My Pencils</h2>

        <ButtonUpload link="/chef-pencil/upload" linkText="Upload your pencil" />
      </div>

      <div className={classes.pencils__items}>
        {uploadPencils?.length ? (
          uploadPencils.map(item => (
            <CardChefPencil
              key={`${item?.pk + '1k0'}`}
              title={item?.title}
              chefName={item?.user?.full_name}
              image={item?.image}
              id={item?.pk}
            />
          ))
        ) : (
          <span>No upload pencils yet!</span>
        )}
      </div>

      {uploadPencils?.length !== 0 && (
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

export default withRouter(RedirectWithoutAuthAndByCheckingUserType(MyUploadsPage, CHEF_TYPE));
