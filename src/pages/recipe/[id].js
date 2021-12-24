import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe.js';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import Cookies from 'cookies';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import logo from '@/../public/images/index/logo.svg';
import { ReactComponent as ShareIcon } from '@/../public/icons/Share Square/Line.svg';
import { ReactComponent as LikeIcon } from '@/../public/icons/Like/Line.svg';
import { ReactComponent as StarIcon } from '@/../public/icons/Star/Line.svg';
import { ReactComponent as StopwatchIcon } from '@/../public/icons/Stopwatch/Line.svg';
import { ReactComponent as SoupIcon } from '@/../public/icons/Soup/Line.svg';
import { ReactComponent as ServingPlateIcon } from '@/../public/icons/Serving Plate/Line.svg';
import { ReactComponent as ForkAndKnifeIcon } from '@/../public/icons/Fork and Knife/Line.svg';
import { ReactComponent as HatChefIcon } from '@/../public/icons/Hat Chef/Line.svg';
import { ReactComponent as SaltShakerIcon } from '@/../public/icons/Salt Shaker/Line.svg';
import { Avatar, Button, Collapse, IconButton, Radio, useMediaQuery } from '@material-ui/core';
import Image from 'next/image';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { cookingMethods, cookingSkill, recipeTypes } from '@/utils/datasets';
import { Divider } from '@/components/basic-elements/divider';
import { WeekMenuBlock } from '@/components/blocks/home-page/week-menu';
import { addToCart } from '@/store/cart/actions';
import { ReactComponent as CartIcon } from '../../../public/icons/Shopping Cart/Line.svg';
import { ImageIcon } from '@/components/elements';
import { modalActions } from '@/store/actions';
import styled from 'styled-components';
import { windowScroll } from '@/utils/windowScroll';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

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
    margin: 0 16px;
    width: 298px !important;
    img {
      border-radius: 16px !important;
    }
  }
`;

const MyPicture = styled(ImageIcon)`
  margin-right: 12px;
  background-color: #fcfcfd;
`;
dayjs.extend(customParseFormat);

function RecipePage(props) {
  const { notFound, recipe } = props;
  const mobile = useMediaQuery('(max-width:576px)');

  const title = recipe?.title;
  const image = recipe?.images?.[0]?.url;
  const price = recipe?.price;
  const recipeTypesList = recipe?.types;
  const recipeCookingSkills = recipe?.cooking_skills;
  const recipeCookingMethods = recipe?.cooking_methods;
  const ingredients = recipe?.ingredients;
  const recipeId = recipe?.pk;
  const recipeAuthorAvatar = recipe?.user.avatar;
  const recipeCommentsNumber = recipe?.comment_number;
  const recipeAverageRatins = recipe?.avg_rating;
  const recipeImage = recipe?.images?.[0]?.url;
  const recipeDescription = recipe?.description;
  const recipeCookingTime = recipe?.cooking_time;
  const recipeCookingSteps = recipe?.steps;
  const calories = recipe?.calories;
  const proteins = recipe?.proteins;
  const fats = recipe?.fats;
  const carbohydrates = recipe?.carbohydrates;
  const deliveryPrice = useSelector(state => state.cart?.deliveryPrice);
  const isRecipeInProduction = recipe?.sale_status === 5;

  const isAuthorized = useSelector(state => state.account.hasToken);
  const isRecipeInCart = useSelector(state => state.cart.products?.some(el => el.object_id == recipe?.pk));
  const isRecipeNotSale = recipe?.price === 0 || recipe?.sale_status !== 5;

  const [isRecipeSaved, setIsRecipeSaved] = useState(recipe?.user_saved_recipe);
  const [isRecipeLiked, setIsRecipeLiked] = useState(recipe?.user_liked);
  const [likesNumber, setLikesNumber] = useState(recipe?.likes_number);
  const [selectedSupplier, setSelectedSupplier] = React.useState('walmart');

  const [viewAllImages, setViewAllImages] = useState(false);
  const dispatch = useDispatch();

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
      dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const Title = () => {
    const handleSaveRecipe = () => {
      Recipe.postSavedRecipe(recipeId)
        .then(res => {
          isRecipeSaved(res.data.pk);
        })
        .catch(err => console.log(err));
    };

    const handleDeleteRecipeFromSaved = () => {
      Recipe.deleteSavedRecipe(isRecipeSaved)
        .then(res => {
          setIsRecipeSaved(false);
        })
        .catch(err => console.log(err));
    };

    const onClickLike = () => {
      Recipe.uploadLikesRecipe()
        .then(res => {
          if (res.data.like_status === 'deleted') {
            setIsRecipeLiked(false);
            likesNumber > 0 && setLikesNumber(likesNumber - 1);
          } else {
            setIsRecipeLiked(true);
            setLikesNumber(likesNumber + 1);
          }
        })
        .catch(err => console.log(err));
    };

    return (
      <div className={classes.title}>
        <div className={classes.title_back_button}>{'<'}</div>
        <div className={classes.title_wrapper}>
          <div className={classes.title_name}>{title}</div>
          <div className={classes.title_buttons}>
            <IconButton
              onClick={isRecipeSaved ? () => handleDeleteRecipeFromSaved() : () => handleSaveRecipe()}
              className={classes.button}>
              <BasicIcon icon={ShareIcon} color={isRecipeSaved ? 'red' : '#353E50'} />
            </IconButton>
            <IconButton onClick={() => onClickLike()} className={classes.button}>
              <BasicIcon icon={LikeIcon} color={isRecipeLiked ? 'red' : '#353E50'} />
            </IconButton>
          </div>
          <span className={classes.title_rating}>
            <Avatar src={recipeAuthorAvatar} alt="Recipe Author Avatar" className={classes.title_rating_avatar} />
            <span className={classes.title_rating_stars}>
              <BasicIcon icon={StarIcon} color="#FFB04C" />
              {recipeAverageRatins ?? 'N/A'}
            </span>
            <span className={classes.title_rating_reviews}>({recipeCommentsNumber ?? 'N/A'} reviews)</span>
          </span>
        </div>
      </div>
    );
  };

  const Media = () => {
    return (
      <div className={classes.image_wrapper}>
        <img src={image} alt="Recipe Image" className={classes.image} />
        {recipe?.images?.length > 1 && !viewAllImages ? (
          <button className={classes.media__button} onClick={() => setViewAllImages(true)}>
            <MyPicture />
            {`Show all materials (${recipe?.images?.length})`}
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
          <StyledSlider>
            {recipe?.images && recipe?.images?.length !== 0
              ? recipe?.images.map((el, index) => {
                  return (
                    <Slide key={el.url} index={index}>
                      <div className={classes.recipe__slider__item}>
                        <img src={el.url} />
                      </div>
                    </Slide>
                  );
                })
              : null}
          </StyledSlider>
          <div className={classes.recipe__slider__row}>
            <div className={classes.recipe__slider__controls}>
              <ButtonBack>
                <img src="/icons/Arrow Left 2/Line.svg" alt="arrow-back" />
              </ButtonBack>
              <ButtonNext>
                <img src="/icons/Arrow Right 2/Line.svg" alt="arrow-next" />
              </ButtonNext>
            </div>
          </div>
        </CarouselProvider>
      )
    );
  };
  const Galery = () => {
    return (
      <div className={classes.galery}>
        <div className={classes.galery__container}>
          <div className={classes.galery__column}>
            {recipe?.images?.map((el, ind) => {
              if (ind % 2 === 0 && !el.main_image) {
                return (
                  <div key={el.url} className={classes.galery__item}>
                    <img src={el.url} />
                  </div>
                );
              }
            })}
          </div>
          <div className={classes.galery__column}>
            {recipe?.images?.map((el, ind) => {
              if (ind % 2 === 1 && !el.main_image) {
                return (
                  <div key={el.url} className={classes.galery__item}>
                    <img src={el.url} />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={classes.galery__close}>
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
    return <div className={classes.related_recipes}>related_recipes</div>;
  };

  const Classification = () => {
    const IconWithText = props => {
      const { icon, text, borderColor } = props;
      return (
        <div className={classes.classification_icon_wrapper}>
          <span style={{ borderColor }} className={classes.classification_icon}>
            <BasicIcon icon={icon} color="#353E50" />
          </span>
          <span className={classes.classification_text}>{text}</span>
        </div>
      );
    };

    const CaloriesElement = props => {
      const { title, value } = props;
      return (
        <div className={classes.classification_calories_wrapper}>
          <span className={classes.classification_calories_title}>{title}</span>
          <span className={classes.classification_calories_value}>{value}</span>
        </div>
      );
    };

    return (
      <div className={classes.classification}>
        <h2 className={classes.block_title}>All Classifications</h2>
        <div className={classes.classification_icons_container}>
          <IconWithText icon={StopwatchIcon} text={parseTime(recipeCookingTime ?? 'N/A')} borderColor="#92A5EF" />
          <IconWithText
            icon={SoupIcon}
            text={
              recipeTypesList?.length > 0 ? recipeTypesList.map(item => recipeTypes?.[item]).join(', ') : 'Not defined'
            }
            borderColor="#58C27D"
          />
          <IconWithText icon={ServingPlateIcon} text={'Not defined'} borderColor="#FA8F54" />
          <IconWithText icon={ForkAndKnifeIcon} text={'Not defined'} borderColor="#8BC5E5" />
          <IconWithText
            icon={HatChefIcon}
            text={cookingSkill?.[recipeCookingSkills] || 'Not defined'}
            borderColor="#F178B6"
          />
          <IconWithText
            icon={SaltShakerIcon}
            text={
              recipeCookingMethods?.length > 0
                ? recipeCookingMethods.map(item => cookingMethods?.[item]).join(', ')
                : 'Not defined'
            }
            borderColor="#FFD166"
          />
        </div>
        <Divider />
        <div className={classes.classification_calories}>
          <CaloriesElement title="Calories" value={calories ?? '—'} />
          <CaloriesElement title="Protein" value={proteins ?? '—'} />
          <CaloriesElement title="Fat" value={fats ?? '—'} />
          <CaloriesElement title="Carbs" value={carbohydrates ?? '—'} />
        </div>
        <Divider />
      </div>
    );
  };

  const Description = () => {
    return (
      <div className={classes.description}>
        <h2 className={classes.block_title}>Description</h2>
        <p
          className={classes.description_text}
          dangerouslySetInnerHTML={{ __html: recipeDescription ?? 'There is no description yet' }}></p>
      </div>
    );
  };

  const CookingSteps = () => {
    const Step = props => {
      const { number, text } = props;
      return (
        <div className={classes.cooking_steps_element_wrapper}>
          <span className={classes.cooking_steps_number}>{number || 'N/A'}</span>
          <span className={classes.cooking_steps_text}>{text || 'Not defined'}</span>
        </div>
      );
    };

    return (
      <div className={classes.cooking_steps}>
        <h2 className={classes.block_title}>Preparation Steps</h2>
        <div className={classes.cooking_steps_wrapper}>
          {recipeCookingSteps?.length > 0
            ? recipeCookingSteps.map((step, index) => (
                <Step number={step?.num} text={step?.title} key={'step' + index} />
              ))
            : 'There is no cooking steps yet'}
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
      const { title, quantity, unit } = props;

      return (
        <div className={classes.ingredient_container}>
          <span className={classes.ingredient_name}>{title}</span>
          <span className={classes.ingredient_amount}>
            {quantity} {unit}
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
        <div className={classes.supplier_wrapper} style={{ border: isSelected ? '1px solid #FB8C00;' : 'none' }}>
          <div className={classes.supplier_header}>
            <Radio
              classes={{ root: classes.supplier_radio, checked: classes.supplier_radio_checked }}
              checked={isSelected}
              onChange={handleChange}
              value={value}
            />
            <img src={image} alt={'image'} />
            <h5 className={classes.supplier_name}>{name}</h5>
          </div>
          <Collapse in={isSelected} direction="down" mountOnEnter unmountOnExit>
            <p className={classes.supplier_text_wrapper}>
              <span className={classes.supplier_text}>Ingredients</span>
              <span className={classes.supplier_value}>${Number.parseFloat(price).toFixed(2) ?? 0}</span>
            </p>
            <p className={classes.supplier_text_wrapper}>
              <span className={classes.supplier_text}>Delivery</span>
              <span className={classes.supplier_value}>{Number.parseFloat(deliveryPrice).toFixed(2)}</span>
            </p>
            <p className={classes.supplier_text_wrapper}>
              <span className={classes.supplier_text}>
                <span className={classes.supplier_text_total}>Total</span> (USD)
              </span>
              <span className={classes.supplier_value}>
                ${Number.parseFloat(price + deliveryPrice).toFixed(2) ?? 0}
              </span>
            </p>
          </Collapse>
        </div>
      );
    };

    return (
      <div className={classes.ingredients}>
        <div className={classes.ingredients_list}>
          <h2 className={classes.ingredients_title}>Ingredients</h2>
          {ingredients.slice(0, 9)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
            'There are no ingredients'}

          {ingredients.slice(9)?.length > 0 && (
            <>
              <Collapse in={isIngredientsExpanded}>
                {ingredients.slice(8)?.map(ingredient => <Ingredient key={ingredient.pk} {...ingredient} />) ||
                  'There are no ingredients'}
              </Collapse>
              <Button className={classes.ingredients_button} onClick={viewAllHandler}>
                {!isIngredientsExpanded && (
                  <span>
                    {'View All '} <span className={classes.ingredients_button_amount}>({ingredients?.length})</span>
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
            <div className={classes.ingredients_suppliers}>
              <Supplier image="/images/index/walmart.png" name="Walmart" value="walmart" />
              <Supplier image="/images/index/target.png" name="Target" value="target" />
              <Supplier image="/images/index/bakery.png" name="Bakery" value="bakery" />
              <Divider />
              <Button
                fullWidth
                disabled={isRecipeInCart || isRecipeNotSale}
                onClick={
                  isAuthorized
                    ? event => {
                        dispatch(addToCart(recipe?.pk));
                        event.stopPropagation();
                      }
                    : handleClick('register')
                }
                className={classes.ingredients_suppliers_order_button}
                endIcon={<BasicIcon icon={CartIcon} color="white" />}>
                {!isRecipeInCart && !isRecipeNotSale && `Add To Cart`}
                {isRecipeInCart && `Added`}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  const Comments = () => {
    return (
      <div className={classes.comments}>
        <h2 className={classes.ingredients_title}>Add a review</h2>
        <div>There are no comments yet</div>
      </div>
    );
  };

  const PopularRecipes = () => {
    return (
      <div className={classes.popular_recipes}>
        <WeekMenuBlock title="Popular Recipes" subtitle="Let's go to meet new sensations" />
      </div>
    );
  };

  const content = (
    <>
      {mobile ? (
        <>
          <div className={classes.layout}>
            <Title />
          </div>

          <MediaSlider />
          <div className={classes.layout}>
            <PopularRecipes />
          </div>
        </>
      ) : (
        <div className={classes.layout}>
          <Title />
          <Media />
          {viewAllImages && <Galery />}
          {!viewAllImages && (
            <div className={classes.layout__content}>
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
