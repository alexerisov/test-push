import React from 'react';
import { FormCreateRecipe } from '@/components/forms';
import { connect } from 'react-redux';
import HeaderDefault from '@/components/elements/header-default';
import classes from "./create-recipe.module.scss";
import Head from 'next/head';

function CreateRecipe (props) {

  return (
    <div className={classes.register}>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>
      <HeaderDefault />
      <FormCreateRecipe />
    </div>
  );
}

export default connect()(CreateRecipe);