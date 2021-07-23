import React, {useState, useEffect} from 'react';
import { FormEditRecipe } from '@/components/forms';
import { connect } from 'react-redux';
import HeaderDefault from '@/components/elements/header-default';
import { LayoutFooter } from '@/components/layouts/';
import classes from "./create-recipe.module.scss";
import Head from 'next/head';
import { useRouter } from 'next/router';

function EditRecipe (props) {

  const router = useRouter();

  const [recipeId, setRecipeId] = useState();

  useEffect(() => {
    setRecipeId(router.query.id);
  }, [router]);

  return (
    <div className={classes.register}>
      <Head>
        <link rel="stylesheet" href="//cameratag.com/static/14/cameratag.css"></link>
        <script src="//cameratag.com/api/v14/js/cameratag.min.js"></script>
      </Head>
      <HeaderDefault />
      {recipeId && <FormEditRecipe recipeId={recipeId} />}
      <LayoutFooter />
    </div>
  );
}

export default connect()(EditRecipe);