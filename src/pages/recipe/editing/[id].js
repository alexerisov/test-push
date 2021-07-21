import React from 'react';
import { FormEditRecipe } from '@/components/forms';
import { connect } from 'react-redux';
import HeaderDefault from '@/components/elements/header-default';
import { LayoutFooter } from '@/components/layouts/';
import classes from "./create-recipe.module.scss";
import Head from 'next/head';

function EditRecipe (props) {

  return (
    <div className={classes.register}>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>
      <HeaderDefault />
      <FormEditRecipe />
      <LayoutFooter />
    </div>
  );
}

export default connect()(EditRecipe);