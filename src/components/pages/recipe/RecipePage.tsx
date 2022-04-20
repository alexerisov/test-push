import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './RecipePage.module.scss';
import Recipe from '@/api/Recipe.js';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import he from 'he';

import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
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

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: row;
  width: auto;
  max-height: 400px;
  overflow-y: clip;
  & ul {
    display: flex !important;
    flex-direction: row !important;
    width: fit-content !important;
  }
  li {
    margin: 0 16px !important;
    width: 298px !important;
    img {
      border-radius: 16px !important;
    }
  }
`;
const IconBtn = styled(IconButton)`
  width: 100% !important;
  height: 100% !important;
  border-radius: 50% !important;
  &:hover {
    border-radius: 50% !important;
  }
  &:active {
    border-radius: 50% !important;
  }
`;
const MyPicture = styled(ImageIcon)`
  margin-right: 12px;
  background-color: #fcfcfd;
`;
dayjs.extend(customParseFormat);

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const Title = props => {
  const {
    title,
    recipeAuthorAvatar,
    recipeId,
    likesNumberUpdatedAt,
    userId,
    recipeSavedId,
    isRecipeLiked,
    likesNumber,
    userLikeUpdatedAt,
    setRecipeSavedId,
    setIsRecipeLiked,
    recipeImage,
    recipeDescription,
    setUserLikeUpdatedAt
  } = props;
  const { session } = useAuth();
  const dispatch = useDispatch();

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
          recoveryLocalStorage.deleteDateOfUserRecipeLike(recipeId);
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
        <div className={s.title_name}>{title}</div>
        <div className={s.title_buttons}>{/* PLACE FOR BUTTONS*/}</div>
        <span className={s.title_rating}>
          <Avatar src={recipeAuthorAvatar} alt="Recipe Author Avatar" className={s.title_rating_avatar} />
          <Divider vertical width="1px" height="24px" />
          <div className={s.like_wrapper}>
            <IconButton onClick={onClickLikeHandler} className={s.button}>
              <BasicIcon icon={LikeIcon} color={isRecipeLiked ? '#FF582E' : '#353E50'} />
            </IconButton>
            {likesNumber + isRecipeLiked}
            {/*Number(Boolean((Date.parse(userLikeUpdatedAt) || null) > Date.parse(likesNumberUpdatedAt)))}*/}
          </div>
          <Divider vertical width="1px" height="24px" />

          <ButtonShare
            id={recipeId}
            photo={recipeImage}
            description={recipeDescription}
            currentUrl={`${props?.absolutePath}/recipe/${recipeId}`}>
            <IconButton className={s.button}>
              <BasicIcon icon={ShareIcon} color="#353E50" />
            </IconButton>
          </ButtonShare>
          <Divider vertical width="1px" height="24px" />
          <IconButton onClick={onClickSaveHandler} className={s.button}>
            <BasicIcon icon={BookmarkIcon} color={recipeSavedId ? '#FF582E' : '#353E50'} />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

const Media = ({ mainImage, setIsLightBoxOpen, setViewAllImages, materials, viewAllImages, image, t, recipe }) => {
  const displayImage = recipe?.video_thumbnail_url ? recipe?.video_thumbnail_url : image || '/images/index/logo.svg';
  const styles = makeStyles(theme => ({
    root: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'lightgray',
        backgroundImage: `url(${displayImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(10px)'
      }
    }
  }))();

  return (
    <div className={`${s.image_wrapper} ${styles.root}`}>
      <Image
        src={displayImage}
        onClick={() => setIsLightBoxOpen(true)}
        alt="Recipe Image"
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        quality={100}
        className={s.image}
        placeholder="blur"
        blurDataURL={rgbDataURL(200, 200, 200)}
      />
      {recipe?.video_url && (
        <div className={s.video__control}>
          <IconBtn onClick={() => setIsLightBoxOpen(true)}>
            <BasicIcon icon={PlayIcon} color={'#FFAA00'} />
          </IconBtn>
        </div>
      )}
      {materials.length > 1 && !viewAllImages ? (
        <button className={s.media__button} onClick={() => setViewAllImages(true)}>
          <MyPicture />
          {`${t('recipePage:showAllMaterials')} (${materials.length})`}
        </button>
      ) : null}
    </div>
  );
};

const MediaSlider = ({ recipe, setViewAllImages }) => {
  return (
    recipe?.images?.length > 0 && (
      <CarouselProvider
        naturalSlideWidth={298}
        naturalSlideHeight={400}
        step={1}
        visibleSlides={1}
        totalSlides={recipe?.images?.length}>
        <StyledSlider classNameTray={s.recipe__slider__tray}>
          {recipe?.images && recipe?.images?.length !== 0
            ? recipe?.images.map((el, index) => {
                return (
                  <Slide key={el.url} index={index} className={s.recipe__slider__slide}>
                    <div className={s.recipe__slider__item}>
                      <img src={el.url} />
                    </div>
                  </Slide>
                );
              })
            : null}
        </StyledSlider>

        <div className={s.recipe__slider__row}>
          <div className={s.recipe__slider__controls}>
            <ButtonBack>
              <img src="/icons/Arrow Left 2/Line.svg" alt="arrow-back" />
            </ButtonBack>
            <ButtonNext>
              <img src="/icons/Arrow Right 2/Line.svg" alt="arrow-next" />
            </ButtonNext>
          </div>
          <div className={s.galery__close__mobile}>
            <IconButton
              size="medium"
              onClick={() => {
                windowScroll(0);
                setViewAllImages(false);
              }}>
              <img src="/icons/Close/Line.svg" />
            </IconButton>
          </div>
        </div>
      </CarouselProvider>
    )
  );
};

const Galery = ({ recipe, setViewAllImages }) => {
  return (
    <div className={s.galery}>
      <div className={s.galery__container}>
        <div className={s.galery__column}>
          {recipe?.images?.map((el, ind) => {
            if (ind % 2 === 0) {
              return (
                <div key={el.url} className={s.galery__item}>
                  <img src={el.url} />
                </div>
              );
            }
          })}
        </div>
        <div className={s.galery__column}>
          {recipe?.images?.map((el, ind) => {
            if (ind % 2 === 1) {
              return (
                <div key={el.url} className={s.galery__item}>
                  <img src={el.url} />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={s.galery__close}>
        <IconButton
          size="medium"
          onClick={() => {
            windowScroll(0);
            setViewAllImages(false);
          }}>
          <img src="/icons/Close/Line.svg" />
        </IconButton>
      </div>
    </div>
  );
};

const RelatedRecipes = () => {
  return <div className={s.related_recipes}>related_recipes</div>;
};

const Classifications = ({
  router,
  recipeCookingTime,
  recipeTypesList,
  t,
  recipeDietRestrictions,
  recipeCuisines,
  recipeCookingSkills,
  recipeCookingMethods,
  recipeServings,
  calories,
  proteins,
  fats,
  carbohydrates
}) => {
  const parseTime = time => {
    const parsedTime = dayjs(time, 'HH-mm');

    if (!parsedTime['$H']) {
      return `${parsedTime['$m']} ${t('recipeClassifications:cooking_time.minutes')}`;
    }

    if (!parsedTime['$m']) {
      return `${parsedTime['$H']} ${t('recipeClassifications:cooking_time.hours')}`;
    }

    return `${parsedTime['$H'] * 60 + parsedTime['$m']} ${t('recipeClassifications:cooking_time.minutes')}`;
  };

  const IconWithText = props => {
    const positionRef = React.useRef({ x: 0, y: 0 });
    const popperRef = React.useRef();
    const [position, setPosition] = React.useState({ x: undefined, y: undefined });
    const { icon, text, borderColor, link, tooltipText } = props;

    const classificationClickHandler = () => {
      router.push(link, undefined, { locale: router.locale });
    };

    return (
      <div
        onMouseMove={e => setPosition({ x: e.pageX, y: e.pageY })}
        className={s.classification_icon_wrapper}
        onClick={classificationClickHandler}>
        <span style={{ borderColor }} className={s.classification_icon}>
          <BasicIcon icon={icon} color="#353E50" />
        </span>
        <Tooltip
          onMouseMove={event => (positionRef.current = { x: event.clientX, y: event.clientY })}
          title={tooltipText}
          classes={{ tooltip: s.classification__tooltip__text }}
          aria-label={`${text}-tooltip`}
          placement="top-start"
          popperRef={popperRef}
          PopperProps={{
            anchorEl: {
              clientHeight: 0,
              clientWidth: 0,
              getBoundingClientRect: () => ({
                top: positionRef.current.y,
                left: positionRef.current.x,
                right: positionRef.current.x,
                bottom: positionRef.current.y,
                width: 0,
                height: 0
              })
            }
          }}>
          <span className={s.classification__text}>{text}</span>
        </Tooltip>
      </div>
    );
  };

  const CaloriesElement = props => {
    const { title, value } = props;
    return (
      <div className={s.classification_calories_wrapper}>
        <span className={s.classification_calories_title}>{title}</span>
        <span className={s.classification_calories_value}>{value}</span>
      </div>
    );
  };

  return (
    <div className={s.classification}>
      <h2 className={s.block_title}>{t('recipePage:classifications.title')}</h2>
      <div className={s.classification_icons_container}>
        {Boolean(recipeCookingTime) && (
          <IconWithText
            icon={StopwatchIcon}
            text={parseTime(recipeCookingTime ?? 'N/A')}
            tooltipText={t('recipeClassifications:cooking_time.title')}
            link={`/search?cooking_time=${recipeCookingTime}`}
            borderColor="#92A5EF"
          />
        )}
        {recipeTypesList?.length > 0 && (
          <IconWithText
            icon={SoupIcon}
            text={
              recipeTypesList?.length > 0
                ? recipeTypesList
                    .map(item => t(`recipeClassifications:types.${RECIPE_TYPES?.[item]?.toLowerCase()}`))
                    .join(', ')
                : t('common:notDefinedText')
            }
            tooltipText={t('recipeClassifications:types.title')}
            link={`/search?types=${recipeTypesList.join(',')}`}
            borderColor="#58C27D"
          />
        )}
        {recipeDietRestrictions?.length > 0 && (
          <IconWithText
            icon={ServingPlateIcon}
            text={
              recipeDietRestrictions?.length > 0
                ? recipeDietRestrictions
                    .map(item =>
                      t(`recipeClassifications:diet_restrictions.${DIETARY_RESTRICTIONS?.[item]?.toLowerCase()}`)
                    )
                    .join(', ')
                : t('common:notDefinedText')
            }
            tooltipText={t('recipeClassifications:diet_restrictions.title')}
            link={`/search?diet_restrictions=${recipeDietRestrictions.join(',')}`}
            borderColor="#FA8F54"
          />
        )}
        {recipeCuisines?.length > 0 && (
          <IconWithText
            icon={ForkAndKnifeIcon}
            text={
              recipeCuisines?.length > 0
                ? recipeCuisines
                    .map(item => t(`recipeClassifications:cuisine.${CUISINES?.[item]?.toLowerCase()}`))
                    .join(', ')
                : t('common:notDefinedText')
            }
            tooltipText={t('recipeClassifications:cuisine.title')}
            link={`/search?cuisines=${recipeCuisines.join(',')}`}
            borderColor="#8BC5E5"
          />
        )}
        {Boolean(recipeCookingSkills) && (
          <IconWithText
            icon={HatChefIcon}
            text={
              recipeCookingSkills
                ? t(`recipeClassifications:cooking_skills.${COOKING_SKILLS?.[recipeCookingSkills]?.toLowerCase()}`)
                : t('common:notDefinedText')
            }
            tooltipText={t('recipeClassifications:cooking_skills.title')}
            link={`/search?cooking_skills=${recipeCookingSkills}`}
            borderColor="#F178B6"
          />
        )}
        {recipeCookingMethods?.length > 0 && (
          <IconWithText
            icon={SaltShakerIcon}
            text={
              recipeCookingMethods?.length > 0
                ? recipeCookingMethods
                    .map(item => t(`recipeClassifications:cooking_methods.${COOKING_METHODS?.[item]?.toLowerCase()}`))
                    .join(', ')
                : t('common:notDefinedText')
            }
            tooltipText={t('recipeClassifications:cooking_methods.title')}
            link={`/search?cooking_methods=${recipeCookingMethods.join(',')}`}
            borderColor="#FFD166"
          />
        )}
        {Boolean(recipeServings) && (
          <IconWithText
            icon={PeopleOutlineIcon}
            text={
              recipeServings
                ? `${recipeServings} ${t('recipeClassifications:servings.title')}`
                : t('common:notDefinedText')
            }
            link={`${router.asPath}`}
            tooltipText={t('recipeClassifications:servings.title')}
            borderColor="#FFD166"
          />
        )}
      </div>
      <Divider />
    </div>
  );
};

const Description = ({ recipeDescription, t }) => {
  return (
    <div className={s.description}>
      <h2 className={s.block_title}>{t('recipePage:description.title')}</h2>
      <p
        className={s.description_text}
        dangerouslySetInnerHTML={{ __html: recipeDescription ?? t('recipePage:description.emptyText') }}></p>
    </div>
  );
};

const CookingSteps = ({ t, recipeCookingSteps }) => {
  const Step = props => {
    const { number, title, description } = props;
    return (
      <div className={s.cooking_steps_element_wrapper}>
        <span className={s.cooking_steps_number}>{number || 'N/A'}</span>
        <div className={s.cooking_steps_text}>
          <p className={s.cooking_steps_text_title}>{title || t('common:notDefinedText')}</p>
          <p className={s.cooking_steps_text_description}>{description || t('common:notDefinedText')}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={s.cooking_steps}>
      <h2 className={s.block_title}>{t('recipePage:steps.title')}</h2>
      <div className={s.cooking_steps_wrapper}>
        {recipeCookingSteps?.length > 0
          ? recipeCookingSteps
              .sort((a, b) => a.num - b.num)
              .map((step, index) => (
                <Step number={step?.num} title={step?.title} description={step?.description} key={'step' + index} />
              ))
          : t('recipePage:steps.emptyText')}
      </div>
    </div>
  );
};

const Ingredients = ({
  t,
  session,
  dispatch,
  recipeId,
  isRecipeInProduction,
  ingredients,
  isRecipeInCart,
  isRecipeNotSale,
  price,
  deliveryPrice
}) => {
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
        <span className={s.ingredient_name}>{title}</span>
        <span className={s.ingredient_amount}>
          {custom_unit?.metric_name ? (
            <abbr
              style={{ cursor: 'help' }}
              title={`${parseFloat(quantity.toFixed(2)) * custom_unit?.metric_value} ${custom_unit?.metric_unit}`}>
              {parseFloat(quantity).toFixed(2)} {custom_unit?.metric_name}
            </abbr>
          ) : (
            <span>
              {parseFloat(quantity.toFixed(2))} {t(`units:${unit}`)}
            </span>
          )}
        </span>
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
        <h2 className={s.ingredients_title}>{t('recipePage:ingredients.title')}</h2>
        {ingredients.slice(0, 9)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
          t('recipePage:ingredients.emptyText')}

        {ingredients.slice(9)?.length > 0 && (
          <>
            <Collapse in={isIngredientsExpanded}>
              {ingredients.slice(8)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
                t('recipePage:ingredients.emptyText')}
            </Collapse>
            <Button className={s.ingredients_button} onClick={viewAllHandler}>
              {!isIngredientsExpanded && (
                <span>
                  {t('recipePage:ingredients.viewAll')}{' '}
                  <span className={s.ingredients_button_amount}>({ingredients?.length})</span>
                </span>
              )}
              {isIngredientsExpanded && <span>{t('recipePage:ingredients.viewLess')}</span>}
            </Button>
          </>
        )}
      </div>
      <Divider />
      {isRecipeInProduction && (
        <>
          <div className={s.ingredients_suppliers}>
            <Supplier image="/images/index/walmart.png" name="Walmart" value="walmart" />
            <Supplier image="/images/index/target.png" name="Target" value="target" />
            <Supplier image="/images/index/bakery.png" name="Bakery" value="bakery" />
            <Divider />
            <Button
              fullWidth
              disabled={isRecipeInCart || isRecipeNotSale}
              onClick={onAddToCartHandler}
              className={s.ingredients_suppliers_order_button}
              endIcon={<BasicIcon icon={CartIcon} color="white" />}>
              {!isRecipeInCart && !isRecipeNotSale && t('recipePage:ingredients.cartButton.add')}
              {isRecipeInCart && t('recipePage:ingredients.cartButton.added')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const Comments = ({ recipeId, userId, recipeRating, isUserRecipeBuyer, isRecipeRatedByUser, t, title }) => {
  return (
    <div className={s.comments}>
      <div className={s.comments_header}>
        <div className={s.comments_title_wrapper}>
          <h2 className={s.comments_title}>{t('recipePage:reviews.title')}</h2>
          <h3 className={s.comments_subtitle}>
            {t('recipePage:reviews.for')} <span className={s.comments_subtitle_bold}>{title}</span>
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
      <CommentBlock
        id={recipeId}
        userId={userId}
        rating={recipeRating}
        isUserRecipeBuyer={isUserRecipeBuyer}
        isRecipeRatedByUser={isRecipeRatedByUser}
      />
    </div>
  );
};

const PopularRecipes = ({ topRatedRecipes }) => {
  return (
    <div className={s.popular_recipes}>
      <PopularRecipesBlock data={topRatedRecipes} />
    </div>
  );
};

export const RecipePage = props => {
  const { session, status: loading } = useAuth();
  const { t } = useTranslation('recipePage');
  const { notFound, recipe, weekmenu, userLang } = props;
  const mobile = useMediaQuery('(max-width:576px)');

  const title = he.decode(recipe?.title);

  const image = recipe?.images?.[0]?.url;
  const imagesWithoutMain = recipe?.images?.filter(el => el.main_image === false);
  const mainImage = recipe?.images?.filter(el => el.main_image === true);
  const price = recipe?.price;
  const recipeTypesList = recipe?.types;
  const recipeCookingSkills = recipe?.cooking_skills;
  const recipeCookingMethods = recipe?.cooking_methods;
  const recipeDietRestrictions = recipe?.diet_restrictions;
  const recipeCuisines = recipe?.cuisines;
  const recipeServings = recipe?.servings;
  const ingredients = recipe?.ingredients;
  const recipeId = recipe?.pk;
  const recipeAuthorAvatar = recipe?.user.avatar;
  const recipeCommentsNumber = recipe?.comment_number;
  const recipeImage = recipe?.images?.[0]?.url;
  const recipeDescription = recipe?.description;
  const recipeCookingTime = recipe?.cooking_time;
  const recipeCookingSteps = recipe?.steps;
  const calories = recipe?.calories;
  const proteins = recipe?.proteins;
  const fats = recipe?.fats;
  const carbohydrates = recipe?.carbohydrates;
  const deliveryPrice = useSelector((state: RootState) => state.cart?.deliveryPrice);
  const isRecipeInProduction = recipe?.sale_status === 5;
  const likesNumberUpdatedAt = recipe?.likes_number_updated_at;

  const topRatedRecipes = props.topRatedRecipes;
  const recipeRating = {
    average: recipe?.avg_rating,
    taste: recipe?.rating_taste,
    valueForMoney: recipe?.rating_value_for_the_money,
    originality: recipe?.rating_originality
  };

  const isUserRecipeBuyer = recipe?.user_is_buyer;
  const isRecipeRatedByUser = recipe?.user_rated;

  const isRecipeInCart = useSelector((state: RootState) => state.cart.products?.some(el => el.object_id == recipe?.pk));
  const isRecipeNotSale = recipe?.price === 0 || recipe?.sale_status !== 5;

  const userId = session?.user.pk;
  const [recipeSavedId, setRecipeSavedId] = useState(recipe?.user_saved_recipe);
  const [isRecipeLiked, setIsRecipeLiked] = useState(recipe?.user_liked);
  const [likesNumber, setLikesNumber] = useState(recipe?.likes_number);
  const [userLikeUpdatedAt, setUserLikeUpdatedAt] = useState(null);

  const [viewAllImages, setViewAllImages] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (recipe?.video_thumbnail_url) {
      setMaterials([recipe?.video_thumbnail_url, ...recipe?.images]);
    } else {
      setMaterials(recipe?.images);
    }
  }, [recipe]);

  useEffect(() => {
    const date = recoveryLocalStorage.getDateOfUserRecipeLike(recipeId);
    setUserLikeUpdatedAt(date);
  }, [recipeId]);

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const handleClick = name => {
    return () => {
      dispatch(modalActions.open(name));
    };
  };

  function generateGetBoundingClientRect(x = 0, y = 0) {
    return {
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x
    };
  }

  const content = (
    <>
      {mobile ? (
        <>
          <div className={s.layout}>
            <Title
              {...{
                title,
                recipeAuthorAvatar,
                recipeId,
                likesNumberUpdatedAt,
                userId,
                recipeSavedId,
                isRecipeLiked,
                likesNumber,
                userLikeUpdatedAt,
                setRecipeSavedId,
                setIsRecipeLiked,
                recipeImage,
                recipeDescription,
                setUserLikeUpdatedAt
              }}
            />
          </div>

          {!viewAllImages ? (
            <Media
              {...{ mainImage, setIsLightBoxOpen, setViewAllImages, materials, viewAllImages, image, t, recipe }}
            />
          ) : (
            <MediaSlider {...{ recipe, setViewAllImages }} />
          )}
          <div className={s.layout}>
            {!viewAllImages && (
              <div className={s.layout__content}>
                <RelatedRecipes />
                <Classifications
                  {...{
                    router,
                    recipeCookingTime,
                    recipeTypesList,
                    t,
                    recipeDietRestrictions,
                    recipeCuisines,
                    recipeCookingSkills,
                    recipeCookingMethods,
                    recipeServings,
                    calories,
                    proteins,
                    fats,
                    carbohydrates
                  }}
                />
                <Description {...{ recipeDescription, t }} />
                <CookingSteps {...{ t, recipeCookingSteps }} />
                <Ingredients
                  {...{
                    t,
                    session,
                    dispatch,
                    recipeId,
                    isRecipeInProduction,
                    ingredients,
                    isRecipeInCart,
                    isRecipeNotSale,
                    price,
                    deliveryPrice
                  }}
                />
                <Comments {...{ recipeId, userId, recipeRating, isUserRecipeBuyer, isRecipeRatedByUser, t, title }} />
              </div>
            )}
            <PopularRecipes {...{ topRatedRecipes }} />
          </div>
        </>
      ) : (
        <div className={s.layout}>
          <Title
            {...{
              title,
              recipeAuthorAvatar,
              recipeId,
              likesNumberUpdatedAt,
              userId,
              recipeSavedId,
              isRecipeLiked,
              likesNumber,
              userLikeUpdatedAt,
              setRecipeSavedId,
              setIsRecipeLiked,
              recipeImage,
              recipeDescription,
              setUserLikeUpdatedAt
            }}
          />
          <Media {...{ mainImage, setIsLightBoxOpen, setViewAllImages, materials, viewAllImages, image, t, recipe }} />
          {viewAllImages && <Galery {...{ recipe, setViewAllImages }} />}
          {!viewAllImages && (
            <div className={s.layout__content}>
              <RelatedRecipes />
              <div className={s.layout__content_column1}>
                <Classifications
                  {...{
                    router,
                    recipeCookingTime,
                    recipeTypesList,
                    t,
                    recipeDietRestrictions,
                    recipeCuisines,
                    recipeCookingSkills,
                    recipeCookingMethods,
                    recipeServings,
                    calories,
                    proteins,
                    fats,
                    carbohydrates
                  }}
                />
                <Description {...{ recipeDescription, t }} />
                <CookingSteps {...{ t, recipeCookingSteps }} />
                <Comments {...{ recipeId, userId, recipeRating, isUserRecipeBuyer, isRecipeRatedByUser, t, title }} />
              </div>
              <div className={s.layout__content_column2}>
                <Ingredients
                  {...{
                    t,
                    session,
                    dispatch,
                    recipeId,
                    isRecipeInProduction,
                    ingredients,
                    isRecipeInCart,
                    isRecipeNotSale,
                    price,
                    deliveryPrice
                  }}
                />
              </div>
            </div>
          )}
          <PopularRecipes {...{ topRatedRecipes }} />
        </div>
      )}
    </>
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
                url: `${props?.recipesData?.images?.[0]?.url}`,
                width: 800,
                height: 600,
                alt: 'recipe image'
              }
            ]
          }}
        />
      )}
      {isLightBoxOpen ? (
        <LightBox
          onClickWrapper={() => setIsLightBoxOpen(!isLightBoxOpen)}
          recipe={recipe}
          title={title}
          video={recipe?.video_url}
          images={recipe?.images}
          absolutePath={props.absolutePath}
        />
      ) : (
        <LayoutPageNew content={!notFound ? content : <RecipeNotFound />} />
      )}
    </>
  );
};
