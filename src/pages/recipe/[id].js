import React from 'react';
import { connect } from 'react-redux';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe.js';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import Cookies from 'cookies';
import LayoutPageNew from '@/components/layouts/layout-page-new';

function RecipePage(props) {
  const { notFound, recipe } = props;

  const Title = () => {
    return <div className={classes.title}>title</div>;
  };

  const Image = () => {
    return <div className={classes.image}>image</div>;
  };

  const RelatedRecipes = () => {
    return <div className={classes.related_recipes}>related_recipes</div>;
  };

  const Classification = () => {
    return <div className={classes.classification}>classification</div>;
  };

  const Description = () => {
    return <div className={classes.description}>description</div>;
  };

  const CookingSteps = () => {
    return <div className={classes.cooking_steps}>cooking_steps</div>;
  };

  const Ingredients = () => {
    return <div className={classes.ingredients}>ingredients</div>;
  };

  const Comments = () => {
    return <div className={classes.comments}>comments</div>;
  };

  const PopularRecipes = () => {
    return <div className={classes.popular_recipes}>popular_recipes</div>;
  };

  const content = (
    <div className={classes.layout}>
      <Title />
      <Image />
      <RelatedRecipes />
      <div className={classes.layout_column1}>
        <Classification />
        <Description />
        <CookingSteps />
        <Comments />
      </div>
      <div className={classes.layout_column2}>
        <Ingredients />
      </div>
      <PopularRecipes />
    </div>
  );

  return (
    <>
      {!notFound && (
        <NextSeo
          openGraph={{
            url: `${props?.absolutePath}/recipe/${props?.recipesData?.pk}`,
            title: `${props?.recipesData?.title}`,
            description: `${props?.recipesData?.description?.split('.').slice(0, 4).join('.')}`,
            images: [
              {
                url: `${props?.recipesData?.images[0]?.url}`,
                width: 800,
                height: 600,
                alt: 'recipe image'
              }
            ]
          }}
        />
      )}
      <LayoutPageNew content={!notFound ? content : <RecipeNotFound />} />
    </>
  );
}

export default connect(state => ({
  account: state.account
}))(RecipePage);

export async function getServerSideProps(context) {
  const id = context.params.id;
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await Recipe.getRecipe(id, token);

    return {
      props: {
        recipe: response.data,
        absolutePath: context.req.headers.host,
        notFound: false
      }
    };
  } catch (e) {
    console.error(e);

    return {
      props: {
        notFound: true
      }
    };
  }
}
