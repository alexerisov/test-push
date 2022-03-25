import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './RecipePage.module.scss';
import Recipe from '@/api/Recipe.js';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
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
import { cookingMethods, cookingSkill, cuisineList, dietaryrestrictions, recipeTypes } from '@/utils/datasets';
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
import Account from '@/api/Account';
import CommentBlock from '@/components/blocks/recipe-page/comment-block';
import { ButtonShare } from '@/components/elements/button';
import { recoveryLocalStorage } from '@/utils/web-storage/local';
import { RootState } from '@/store/store';
import { useAuth } from '@/utils/Hooks';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

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

export const RecipePage = props => {
  const { session } = useAuth();
  const { t } = useTranslation('recipePage');
  const { notFound, recipe, weekmenu } = props;
  const mobile = useMediaQuery('(max-width:576px)');

  const title = recipe?.title;

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

  const [userId, setUserId] = useState();
  const [recipeSavedId, setRecipeSavedId] = useState(recipe?.user_saved_recipe);
  const [isRecipeLiked, setIsRecipeLiked] = useState(recipe?.user_liked);
  const [likesNumber, setLikesNumber] = useState(recipe?.likes_number);
  const [userLikeUpdatedAt, setUserLikeUpdatedAt] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = React.useState('walmart');

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
    console.log(materials);
  }, [recipe]);

  useEffect(() => {
    if (session) {
      Account.current().then(res => {
        setUserId(res.data.pk);
      });
    }
  }, [router]);

  useEffect(() => {
    const date = recoveryLocalStorage.getDateOfUserRecipeLike(recipeId);
    setUserLikeUpdatedAt(date);
  }, [recipeId]);

  useEffect(() => {
    setIsRecipeLiked(recipe?.user_liked);
    setLikesNumber(recipe?.likes_number);
  }, [recipe?.user_liked, recipeId]);

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const parseTime = time => {
    const parsedTime = dayjs(time, 'HH-mm');

    if (!parsedTime['$H']) {
      return `${parsedTime['$m']} minutes`;
    }

    if (!parsedTime['$m']) {
      return `${parsedTime['$H']} hours`;
    }

    return `${parsedTime['$H'] * 60 + parsedTime['$m']} minutes`;
  };

  const handleClick = name => {
    return () => {
      dispatch(modalActions.open(name));
    };
  };

  const Title = () => {
    const handleSaveRecipe = () => {
      Recipe.postSavedRecipe(recipeId)
        .then(res => {
          setRecipeSavedId(res.data.pk);
        })
        .catch(err => console.log(err));
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
            setUserLikeUpdatedAt(res.data.created_at);
            recoveryLocalStorage.setDateOfUserRecipeLike(recipeId, res.data.created_at);
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
              {likesNumber +
                isRecipeLiked -
                Number(Boolean((Date.parse(userLikeUpdatedAt) || null) > Date.parse(likesNumberUpdatedAt)))}
            </div>
            <Divider vertical width="1px" height="24px" />

            <ButtonShare
              id={recipeId}
              photo={recipe?.images[0]}
              description={recipe?.description}
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

  const Media = () => {
    return (
      <div className={s.image_wrapper}>
        {recipe?.video_url ? (
          <>
            <div className={s.image_wrapper_click_area} onClick={() => setIsLightBoxOpen(true)}>
              <img
                src={
                  typeof recipe?.video_thumbnail_url === 'object'
                    ? JSON.stringify(recipe?.video_thumbnail_url)
                    : recipe?.video_thumbnail_url
                }
                alt="Recipe Image"
                className={s.image}
              />
            </div>
            <div className={s.video__control}>
              <IconBtn onClick={() => setIsLightBoxOpen(true)}>
                <BasicIcon icon={PlayIcon} color={'#FFAA00'} />
              </IconBtn>
            </div>
          </>
        ) : mainImage.length > 0 ? (
          <div className={s.image_wrapper_click_area} onClick={() => setIsLightBoxOpen(true)}>
            <img
              src={typeof mainImage[0] === 'object' ? mainImage[0].url : mainImage[0]}
              alt="Recipe Image"
              className={s.image}
            />
          </div>
        ) : (
          <div className={s.image_wrapper_click_area} onClick={() => setIsLightBoxOpen(true)}>
            <img
              src={typeof image === 'object' ? JSON.stringify(image) : image}
              alt="Recipe Image"
              className={s.image}
            />
          </div>
        )}
        {materials.length > 1 && !viewAllImages ? (
          <button className={s.media__button} onClick={() => setViewAllImages(true)}>
            <MyPicture />
            {`Show all materials (${materials.length})`}
          </button>
        ) : null}
      </div>
    );
  };

  const MediaSlider = () => {
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
  const Galery = () => {
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

  const Classification = () => {
    const IconWithText = props => {
      const { icon, text, borderColor, link, tooltipText } = props;

      const classificationClickHandler = () => {
        router.push(link, undefined, { locale: router.locale });
      };

      return (
        <div className={s.classification_icon_wrapper} onClick={classificationClickHandler}>
          <span style={{ borderColor }} className={s.classification_icon}>
            <BasicIcon icon={icon} color="#353E50" />
          </span>
          <Tooltip arrow title={tooltipText} aria-label={`${text}-tooltip`} placement="bottom">
            <span className={s.classification_text}>{text}</span>
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
        <h2 className={s.block_title}>{t('classifications.title')}</h2>
        <div className={s.classification_icons_container}>
          <IconWithText
            icon={StopwatchIcon}
            text={parseTime(recipeCookingTime ?? 'N/A')}
            tooltipText="Cooking Time"
            link={`/search?cooking_time=${recipeCookingTime}`}
            borderColor="#92A5EF"
          />
          <IconWithText
            icon={SoupIcon}
            text={
              recipeTypesList?.length > 0
                ? recipeTypesList.map(item => recipeTypes?.[item]).join(', ')
                : t('common:notDefinedText')
            }
            tooltipText="Cooking Type"
            link={`/search?types=${recipeTypesList.join(',')}`}
            borderColor="#58C27D"
          />
          <IconWithText
            icon={ServingPlateIcon}
            text={
              recipeDietRestrictions?.length > 0
                ? recipeDietRestrictions.map(item => dietaryrestrictions?.[item]).join(', ')
                : t('common:notDefinedText')
            }
            tooltipText="Dietary Restrictions"
            link={`/search?diet_restrictions=${recipeDietRestrictions.join(',')}`}
            borderColor="#FA8F54"
          />
          <IconWithText
            icon={ForkAndKnifeIcon}
            text={
              recipeCuisines?.length > 0
                ? recipeCuisines.map(item => cuisineList?.[item]).join(', ')
                : t('common:notDefinedText')
            }
            tooltipText="Recipe Cuisiness"
            link={`/search?cuisines=${recipeCuisines.join(',')}`}
            borderColor="#8BC5E5"
          />
          <IconWithText
            icon={HatChefIcon}
            text={recipeCookingSkills ? cookingSkill?.[recipeCookingSkills] : t('common:notDefinedText')}
            tooltipText="Cooking Skill"
            link={`/search?cooking_skills=${recipeCookingSkills}`}
            borderColor="#F178B6"
          />
          <IconWithText
            icon={SaltShakerIcon}
            text={
              recipeCookingMethods?.length > 0
                ? recipeCookingMethods.map(item => cookingMethods?.[item]).join(', ')
                : t('common:notDefinedText')
            }
            tooltipText="Cooking Method"
            link={`/search?cooking_methods=${recipeCookingMethods.join(',')}`}
            borderColor="#FFD166"
          />
          <IconWithText
            icon={PeopleOutlineIcon}
            text={recipeServings ? `${recipeServings} servings` : t('common:notDefinedText')}
            link={`${router.asPath}`}
            tooltipText="Servings"
            borderColor="#FFD166"
          />
        </div>
        <Divider />
        <div className={s.classification_calories}>
          <CaloriesElement title={t('nutrition.calories')} value={calories ?? '—'} />
          <CaloriesElement title={t('nutrition.protein')} value={proteins ?? '—'} />
          <CaloriesElement title={t('nutrition.fat')} value={fats ?? '—'} />
          <CaloriesElement title={t('nutrition.carbs')} value={carbohydrates ?? '—'} />
        </div>
        <Divider />
      </div>
    );
  };

  const Description = () => {
    return (
      <div className={s.description}>
        <h2 className={s.block_title}>{t('description.title')}</h2>
        <p
          className={s.description_text}
          dangerouslySetInnerHTML={{ __html: recipeDescription ?? t('description.emptyText') }}></p>
      </div>
    );
  };

  const CookingSteps = () => {
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
        <h2 className={s.block_title}>{t('steps.title')}</h2>
        <div className={s.cooking_steps_wrapper}>
          {recipeCookingSteps?.length > 0
            ? recipeCookingSteps
                .sort((a, b) => a.num - b.num)
                .map((step, index) => (
                  <Step number={step?.num} title={step?.title} description={step?.description} key={'step' + index} />
                ))
            : t('steps.emptyText')}
        </div>
      </div>
    );
  };

  const Ingredients = () => {
    const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);

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
                title={`${quantity * custom_unit?.metric_value} ${custom_unit?.metric_unit}`}>
                {quantity} {custom_unit?.metric_name}
              </abbr>
            ) : (
              <span>
                {quantity} {unit}
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
              <span className={s.supplier_text}>{t('ingredients.supplier.ingredients')}</span>
              <span className={s.supplier_value}>${Number.parseFloat(price).toFixed(2) ?? 0}</span>
            </p>
            <p className={s.supplier_text_wrapper}>
              <span className={s.supplier_text}>{t('ingredients.supplier.delivery')}</span>
              <span className={s.supplier_value}>{Number.parseFloat(deliveryPrice).toFixed(2)}</span>
            </p>
            <p className={s.supplier_text_wrapper}>
              <span className={s.supplier_text}>
                <span className={s.supplier_text_total}>Total</span> (USD)
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

      dispatch(addToCart(recipe?.pk));
    };

    return (
      <div className={s.ingredients}>
        <div className={s.ingredients_list}>
          <h2 className={s.ingredients_title}>{t('ingredients.title')}</h2>
          {ingredients.slice(0, 9)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
            t('ingredients.emptyText')}

          {ingredients.slice(9)?.length > 0 && (
            <>
              <Collapse in={isIngredientsExpanded}>
                {ingredients.slice(8)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
                  'There are no ingredients'}
              </Collapse>
              <Button className={s.ingredients_button} onClick={viewAllHandler}>
                {!isIngredientsExpanded && (
                  <span>
                    {'View All '} <span className={s.ingredients_button_amount}>({ingredients?.length})</span>
                  </span>
                )}
                {isIngredientsExpanded && <span>{'View Less '}</span>}
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
                {!isRecipeInCart && !isRecipeNotSale && t('ingredients.cartButton.add')}
                {isRecipeInCart && t('ingredients.cartButton.added')}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  const Comments = () => {
    return (
      <div className={s.comments}>
        <div className={s.comments_header}>
          <div className={s.comments_title_wrapper}>
            <h2 className={s.comments_title}>{t('reviews.title')}</h2>
            <h3 className={s.comments_subtitle}>
              {t('reviews.for')} <span className={s.comments_subtitle_bold}>{title}</span>
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

  const PopularRecipes = () => {
    return (
      <div className={s.popular_recipes}>
        <PopularRecipesBlock data={props?.topRatedRecipes} />
      </div>
    );
  };

  const content = (
    <>
      <Head>
        <script async src="https://cdn.foodinfluencersunited.nl/prod.js" key="foodinfluencer-script" />
      </Head>
      {mobile ? (
        <>
          <div className={s.layout}>
            <Title />
          </div>

          {!viewAllImages ? <Media /> : <MediaSlider />}
          <div className={s.layout}>
            {!viewAllImages && (
              <div className={s.layout__content}>
                <RelatedRecipes />
                <Classification />
                <Description />
                <CookingSteps />
                <Ingredients />
                <Comments />
              </div>
            )}
            <PopularRecipes />
          </div>
        </>
      ) : (
        <div className={s.layout}>
          <Title />
          <Media />
          {viewAllImages && <Galery />}
          {!viewAllImages && (
            <div className={s.layout__content}>
              <RelatedRecipes />
              <div className={s.layout__content_column1}>
                <Classification />
                <Description />
                <CookingSteps />
                <Comments />
              </div>
              <div className={s.layout__content_column2}>
                <Ingredients />
              </div>
            </div>
          )}
          <PopularRecipes />
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
