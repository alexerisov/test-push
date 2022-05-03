import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './RecipePage.module.scss';
import Recipe from '@/api/Recipe.js';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import he from 'he';

import ShareIcon from '~public/icons/Share Square/Line.svg';
import LikeIcon from '~public/icons/Like/Line.svg';
import StarIcon from '~public/icons/Star/Line.svg';
import StopwatchIcon from '~public/icons/Stopwatch/Line.svg';
import PlayIcon from '~public/icons/Play/Filled.svg';
import SoupIcon from '~public/icons/Soup/Line.svg';
import ServingPlateIcon from '~public/icons/Serving Plate/Line.svg';
import ForkAndKnifeIcon from '~public/icons/Fork and Knife/Line.svg';
import HatChefIcon from '~public/icons/Hat Chef/Line.svg';
import SaltShakerIcon from '~public/icons/Salt Shaker/Line.svg';
import BookmarkIcon from '~public/icons/Bookmark/Line.svg';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Avatar, Button, Collapse, IconButton, Radio, Tooltip, useMediaQuery } from '@material-ui/core';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { COOKING_METHODS, COOKING_SKILLS, CUISINES, DIETARY_RESTRICTIONS, RECIPE_TYPES } from '@/utils/datasets';
import { Divider } from '@/components/basic-elements/divider';
import { addToCart } from '@/store/cart/actions';
import CartIcon from '~public/icons/Shopping Cart/Line.svg';
import { ImageIcon } from '@/components/elements';
import { modalActions } from '@/store/actions';
import styled from 'styled-components';
import { windowScroll } from '@/utils/windowScroll';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import LightBox from '@/components/blocks/lightbox';
import { useRouter } from 'next/router';
import { PopularRecipesBlock } from '@/components/blocks/recipe-page/popular-recipes';
import CommentBlock from '@/components/blocks/recipe-page/comment-block';
import { ButtonShare } from '@/components/elements/button';
import { recoveryLocalStorage } from '@/utils/web-storage/local';
import { RootState } from '@/store/store';
import { useAuth } from '@/utils/Hooks';
import { useTranslation } from 'next-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import log from 'loglevel';
import ContentLoader from 'react-content-loader';

const Title = () => {
  const handleSaveRecipe = () => {
    Recipe.postSavedRecipe(recipeId)
      .then(res => {
        setRecipeSavedId(res.data.pk);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteRecipeFromSaved = () => {
    Recipe.deleteSavedRecipe(recipeSavedId)
      .then(res => {
        setRecipeSavedId(false);
      })
      .catch(err => console.log(err));
  };

  const onClickLikeHandler = () => {
    if (!session) {
      return dispatch(modalActions.open('register'));
    }

    Recipe.uploadLikesRecipe(recipeId)
      .then(res => {
        if (res.data.like_status === 'deleted') {
          setIsRecipeLiked(false);
          // recoveryLocalStorage.deleteDateOfUserRecipeLike(recipeId);
        } else if (res.data.like_status === 'created') {
          setIsRecipeLiked(true);
          // setUserLikeUpdatedAt(res.data.created_at);
          // recoveryLocalStorage.setDateOfUserRecipeLike(recipeId, res.data.created_at);
        }
      })
      .catch(err => console.log(err));
  };

  const onClickSaveHandler = () => {
    if (!session) {
      return dispatch(modalActions.open('register'));
    }

    recipeSavedId ? handleDeleteRecipeFromSaved() : handleSaveRecipe();
  };

  return (
    <div className={s.title}>
      <div className={s.title_back_button}>{'<'}</div>
      <div className={s.title_wrapper}>
        <div className={s.title_name}>
          <ContentLoader height={48} width={'100%'}>
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
          </ContentLoader>
        </div>
        <div className={s.title_buttons}>{/* PLACE FOR BUTTONS*/}</div>
        <span className={s.title_rating}>
          <ContentLoader height={24} width={'100%'}>
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
          </ContentLoader>
        </span>
      </div>
    </div>
  );
};

const Media = () => {
  return (
    <div className={s.image_wrapper}>
      <ContentLoader height={'100%'} width={'100%'}>
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};

const RelatedRecipes = () => {
  return <div className={s.related_recipes}>related_recipes</div>;
};

const Classifications = () => {
  return (
    <div className={s.classification}>
      <h2 className={s.block_title}>
        <ContentLoader height={32} width={'60%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="32" />
        </ContentLoader>
      </h2>
      <div className={s.classification_icons_container}>
        <ContentLoader height={48} width={'50%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
        <ContentLoader height={48} width={'50%'}>
          <rect x="20px" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
        <ContentLoader height={48} width={'50%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
        <ContentLoader height={48} width={'50%'}>
          <rect x="20px" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
        <ContentLoader height={48} width={'50%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
        <ContentLoader height={48} width={'50%'}>
          <rect x="20px" y="0" rx="5" ry="5" width="100%" height="48" />
        </ContentLoader>
      </div>
      <Divider />
    </div>
  );
};

const Description = () => {
  return (
    <div className={s.description}>
      <h2 className={s.block_title}>
        <ContentLoader height={32} width={'60%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="32" />
        </ContentLoader>
      </h2>
      <p className={s.description_text}>
        <ContentLoader height={140} width={'100%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="16" />
          <rect x="0" y="32" rx="5" ry="5" width="100%" height="16" />
          <rect x="0" y="64" rx="5" ry="5" width="100%" height="16" />
          <rect x="0" y="96" rx="5" ry="5" width="100%" height="16" />
          <rect x="0" y="122" rx="5" ry="5" width="50%" height="16" />
        </ContentLoader>
      </p>
    </div>
  );
};

const CookingSteps = () => {
  const Step = props => {
    const { number, title, description } = props;
    return (
      <div className={s.cooking_steps_element_wrapper}>
        <ContentLoader height={48} width={48}>
          <circle cx="24" cy="24" r="24" />
        </ContentLoader>
        <div className={s.cooking_steps_text}>
          <p className={s.cooking_steps_text_title}>
            <ContentLoader height={18} width={'100%'}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="18" />
            </ContentLoader>
          </p>
          <p className={s.cooking_steps_text_description}>
            {' '}
            <ContentLoader height={14} width={'80%'}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="14" />
            </ContentLoader>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={s.cooking_steps}>
      <h2 className={s.block_title}>
        <ContentLoader height={32} width={'60%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="32" />
        </ContentLoader>
      </h2>
      <div className={s.cooking_steps_wrapper}>
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
      </div>
    </div>
  );
};

const Ingredients = () => {
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);
  const router = useRouter();
  const [selectedSupplier, setSelectedSupplier] = React.useState('walmart');

  const viewAllHandler = () => {
    setIsIngredientsExpanded(!isIngredientsExpanded);
  };

  const Ingredient = props => {
    const { title, quantity, unit, custom_unit } = props;

    return (
      <div className={s.ingredient_container}>
        <ContentLoader height={14} width={'80%'}>
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="14" />
        </ContentLoader>
        <ContentLoader height={14} width={'20%'}>
          <rect x="10px" y="0" rx="5" ry="5" width="80%" height="14" />
        </ContentLoader>
      </div>
    );
  };

  const Supplier = props => {
    const { image, name, value } = props;
    const isSelected = selectedSupplier === value;
    const [isSupplierWillChange, setIsSupplierWillChange] = React.useState(isSelected);

    const handleChange = event => {
      // setIsSupplierWillChange(true);
      // setTimeout(() => {
      setSelectedSupplier(event.target.value);
      //   setIsSupplierWillChange(false);
      // }, 300);
    };

    return (
      <div className={s.supplier_wrapper} style={{ border: isSelected ? '1px solid #FB8C00;' : 'none' }}>
        <div className={s.supplier_header}>
          <Radio
            classes={{ root: s.supplier_radio, checked: s.supplier_radio_checked }}
            checked={isSelected}
            onChange={handleChange}
            value={value}
          />
          <img src={image} alt={'image'} />
          <h5 className={s.supplier_name}>{name}</h5>
        </div>
        <Collapse in={isSelected} mountOnEnter unmountOnExit>
          <p className={s.supplier_text_wrapper}>
            <span className={s.supplier_text}>{t('recipePage:ingredients.supplier.ingredients')}</span>
            <span className={s.supplier_value}>${Number.parseFloat(price).toFixed(2) ?? 0}</span>
          </p>
          <p className={s.supplier_text_wrapper}>
            <span className={s.supplier_text}>{t('recipePage:ingredients.supplier.delivery')}</span>
            <span className={s.supplier_value}>{Number.parseFloat(deliveryPrice).toFixed(2)}</span>
          </p>
          <p className={s.supplier_text_wrapper}>
            <span className={s.supplier_text}>
              <span className={s.supplier_text_total}>{t('orderSummary:total')}</span> (USD)
            </span>
            <span className={s.supplier_value}>${Number.parseFloat(price + deliveryPrice).toFixed(2) ?? 0}</span>
          </p>
        </Collapse>
      </div>
    );
  };

  const onAddToCartHandler = () => {
    if (!session) {
      return dispatch(modalActions.open('register'));
    }

    dispatch(addToCart(recipeId, router.locale));
  };

  return (
    <div className={s.ingredients}>
      <div className={s.ingredients_list}>
        <h2 className={s.ingredients_title}>
          <ContentLoader height={48} width={'80%'}>
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="48" />
          </ContentLoader>
        </h2>
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className={s.comments}>
      <div className={s.comments_header}>
        <div className={s.comments_title_wrapper}>
          <h2 className={s.comments_title}>
            <ContentLoader height={24} width={'80%'}>
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="24" />
            </ContentLoader>
          </h2>
          <h3 className={s.comments_subtitle}>
            <span className={s.comments_subtitle_bold}>
              <ContentLoader height={14} width={'100%'}>
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="14" />
              </ContentLoader>
            </span>
          </h3>
        </div>
        <div className={s.comments_rate_wrapper}>
          <BasicIcon icon={StarIcon} color="#FFB04C" />
          <h2 className={s.comments_rate_value}>
            <span className={s.comments_rate_value_bold}>{recipeRating.average || '-'}</span> / 5,0
          </h2>
          {/*<h3 className={classes.comments_rate_value_subtitle}>(88%) Eaters recommended this product</h3>*/}
        </div>
      </div>
    </div>
  );
};

const PopularRecipes = () => {
  return (
    <div className={s.popular_recipes}>
      <ContentLoader height={650} width={'100%'}>
        <rect x="0" y="0" rx="5" ry="5" width="40%" height="48" />
        <rect x="0" y="62" rx="5" ry="5" width="50%" height="24" />
        <rect x="0" y="140" rx="5" ry="5" width="100%" height="355" />
      </ContentLoader>
    </div>
  );
};

export const RecipePageSkeleton = props => {
  const mobile = useMediaQuery('(max-width:576px)');
  const content = (
    <>
      {mobile ? (
        <>
          <div className={s.layout}>
            <Title />
          </div>

          <Media />
          <div className={s.layout}>
            <div className={s.layout__content}>
              <RelatedRecipes />
              <Classifications />
              <Description />
              <CookingSteps />
              <Ingredients />
              {/*<Comments {...{ recipeId, userId, recipeRating, isUserRecipeBuyer, isRecipeRatedByUser, t, title }} />*/}
            </div>

            <PopularRecipes />
          </div>
        </>
      ) : (
        <div className={s.layout}>
          <Title />
          <Media />
          <div className={s.layout__content}>
            <RelatedRecipes />
            <div className={s.layout__content_column1}>
              <Classifications />
              <Description />
              <CookingSteps />
              {/*<Comments {...{ recipeId, userId, recipeRating, isUserRecipeBuyer, isRecipeRatedByUser, t, title }} />*/}
            </div>
            <div className={s.layout__content_column2}>
              <Ingredients />
            </div>
          </div>

          <PopularRecipes />
        </div>
      )}
    </>
  );

  return (
    <>
      <NextSeo
        openGraph={{
          url: `${props?.absolutePath}/recipe/${props?.recipesData?.pk}`,
          title: `${props?.recipesData?.title}`,
          description: `${props?.recipesData?.description?.split('.').slice(0, 4).join('.')}`,
          images: [
            {
              url: `${props?.recipesData?.images?.[0]?.url}`,
              width: 800,
              height: 600,
              alt: 'recipe image'
            }
          ]
        }}
      />

      <LayoutPageNew content={content} />
    </>
  );
};
