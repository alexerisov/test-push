import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import classes from './index.module.scss';
import styled from 'styled-components';
import LayoutPage from '@/components/layouts/layout-page';
import Recipe from '@/api/Recipe.js';
import { useRouter } from 'next/router';
import {
  cuisineList,
  recipeTypes,
  cookingMethods,
  dietaryrestrictions,
  pageNames,
  cookingSkill
} from '@/utils/datasets';
import Link from 'next/link';
import ResipeComments from '@/components/blocks/recipe-comments';
import Account from '@/api/Account.js';
import { modalActions } from '@/store/actions';
import { recipePhotoSlider } from '@/store/actions';
import { Button } from '@material-ui/core';
import { ButtonShare } from '@/components/elements/button';
import CardLatestRecipes from '@/components/elements/card-latest-recipes';
import CardPopularRecipes from '@/components/elements/card-popular-recipes';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import { NextSeo } from 'next-seo';
import savedStatus from '/public/images/index/savedStatus.svg';
import notSavedStatus from '/public/images/index/notSavedStatus.svg';
import Cookies from 'cookies';
import Tooltip from '@material-ui/core/Tooltip';

import VideoImageCarousel from '@/components/blocks/video-image-carousel/video-image-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { useMobileDevice } from '@/customHooks/useMobileDevice';

dayjs.extend(customParseFormat);

const useStyledTooltip = makeStyles({
  tooltip: {
    padding: '5px 10px !important',
    fontSize: '16px',
    hyphens: 'auto',
    maxWidth: '400px'
  }
});

function RecipePage(props) {
  const toolTipStyles = useStyledTooltip();
  const [isMobileOrTablet] = useMobileDevice();
  const router = useRouter();
  const [recipeId, setRecipeId] = useState();
  const [recipe, setRecipe] = useState();
  const [likeRecipe, setLikeRecipe] = useState(false);
  const [likesNumber, setLikesNumber] = useState(false);
  const [userId, setUserId] = useState();
  const [savedId, setSavedId] = useState();
  const [popularRecipes, setPopularRecipes] = useState();
  const [latestRecipes, setLatestRecipes] = useState();
  const [featuredMeals, setFeaturedMeals] = useState();

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getRecipe();
  }, [recipeId]);

  useEffect(() => {
    setRecipeId(router.query.id);
    if (props.account.hasToken) {
      Account.current().then(res => {
        setUserId(res.data.pk);
      });
    }
  }, [router]);

  useEffect(() => {
    Recipe.getPopularRecipes().then(res => setPopularRecipes(res.data));
    Recipe.getLatestRecipes().then(res => setLatestRecipes(res.data));
  }, []);

  useEffect(() => {
    if (userId) {
      Recipe.getFeaturedMeals(userId).then(res => setFeaturedMeals(res.data));
    }
  }, [userId]);

  const getRecipe = async () => {
    if (props?.recipesData) {
      setRecipe(props?.recipesData);
      setLikeRecipe(props?.recipesData.user_liked);
      setLikesNumber(props?.recipesData.likes_number);
      setSavedId(props?.recipesData?.user_saved_recipe);
      props.dispatch(recipePhotoSlider.setItems(props.recipesData));
      return;
    }

    setNotFound(props?.notFound);
  };

  const openRegisterPopup = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const openUnregisterModal = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const openShowRecipePhotosPopup = currentPhotoIndex => {
    return () => {
      props.dispatch(recipePhotoSlider.setCurrentItemIndex(0));

      props.dispatch(modalActions.open('showRecipePhotos')).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const onClickLike = () => {
    Recipe.uploadLikesRecipe(recipeId)
      .then(res => {
        if (res.data.like_status === 'deleted') {
          setLikeRecipe(false);
          likesNumber > 0 && setLikesNumber(likesNumber - 1);
        } else {
          setLikeRecipe(true);
          setLikesNumber(likesNumber + 1);
        }
      })
      .catch(err => console.log(err));
  };

  const deleteRecipe = confirm => {
    if (confirm) {
      Recipe.deleteRecipe(recipeId)
        .then(res => {
          router.push('/my-recipes');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleClickDelete = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(result => {
        deleteRecipe(result);
      });
    };
  };

  const handleSaveRecipe = () => {
    Recipe.postSavedRecipe(props.recipesData.pk)
      .then(res => {
        setSavedId(res.data.pk);
      })
      .catch(err => console.log(err));
  };

  const handleDeleteRecipeFromSaved = () => {
    Recipe.deleteSavedRecipe(savedId)
      .then(res => {
        setSavedId(false);
      })
      .catch(err => console.log(err));
  };

  const handleRecipeCookingTime = time => {
    const parsedTime = dayjs(time, 'HH-mm');

    if (!parsedTime['$H']) {
      return `${parsedTime['$m']} MIN`;
    }

    if (!parsedTime['$m']) {
      return `${parsedTime['$H']} HOURS`;
    }

    return `${parsedTime['$H']}H ${parsedTime['$m']}MIN`;
  };

  const redirectToHomeChefPage = () => {
    router.push(`/home-chef/${recipe?.user?.pk}`);
  };

  const handleIngredientsUnit = unit => {
    if (unit === 'other') {
      return '';
    } else {
      return unit;
    }
  };

  const [breadcrumbsName, setBreadcrumbsName] = useState('Home');
  const [breadcrumbsLink, setBreadcrumbsLink] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.history.state.GROOVE_TRACKER) {
        const url = window.history.state.GROOVE_TRACKER.referrer;
        const page = url.slice(url.lastIndexOf('/'));
        if (page.includes('search')) {
          setBreadcrumbsName('Recipes');
          return;
        }
        if (!pageNames[page]) {
          setBreadcrumbsName(pageNames[page] ?? 'Home');
          setBreadcrumbsLink('/');
          return;
        }
        setBreadcrumbsName(pageNames[page] ?? 'Home');
        setBreadcrumbsLink(page);
      }
    }
  }, []);

  const getVideoMarkupForCarousel = () => {
    console.log(recipe);
    if (!recipe?.video_url) {
      return [];
    }

    return (
      <div className={classes.recipe__video__watermark}>
        {!router.query.autoplayVideo ? (
          <video width="715" controls controlsList="nodownload" className={classes.recipe__video__video}>
            <source src={recipe.video_url} type="video/mp4" />
          </video>
        ) : (
          <video
            width="715"
            controls
            autoPlay="autoplay"
            muted
            controlsList="nodownload"
            className={classes.recipe__video__video}>
            <source src={recipe?.video_url} type="video/mp4" />
          </video>
        )}
        <div className={classes.recipe__video__watermark__icon} />
      </div>
    );
  };

  const content = (
    <div className={classes.recipe}>
      {recipe && (
        <>
          <h2 className={classes.recipe__navbar}>
            <Link href="/">
              <a className={classes.recipe__navbar__link}>Home /</a>
            </Link>
            {breadcrumbsLink !== '/' && (
              <Link href={breadcrumbsLink}>
                <a className={classes.recipe__navbar__link}> {breadcrumbsName} /</a>
              </Link>
            )}
            <span> {recipe.title}</span>
          </h2>
          <div className={classes.recipe__content}>
            <div className={classes.recipe__recipeContent}>
              <div className={classes.recipe__header}>
                <div>
                  <h2 className={classes.recipe__title}>{recipe.title}</h2>
                  <p className={classes.recipe__author}>
                    by Chef{' '}
                    <span onClick={redirectToHomeChefPage} className={classes.recipe__authorText}>
                      {recipe.user.full_name}
                    </span>
                  </p>
                  <p className={classes.recipe__location}>{recipe.user.city}</p>
                </div>
                <div className={classes.recipe__icons}>
                  {recipe.user.pk === userId && (
                    <div>
                      <Link href={`/recipe/editing/${recipeId}`}>
                        <a className={classes.recipe__linkEdit}>
                          <img src="/images/index/pencil-black.svg" />
                        </a>
                      </Link>
                      <button className={classes.recipe__deleteButton} onClick={handleClickDelete('confirmation')}>
                        <img src="/images/index/delete.svg" />
                      </button>
                    </div>
                  )}
                  <div className={classes.recipe__time}>
                    <img src="/images/index/timer.svg" />
                    <p>{handleRecipeCookingTime(recipe.cooking_time)}</p>
                  </div>
                </div>
              </div>

              <div className={classes.recipe__video}>
                {(recipe?.images.length !== 0 || recipe?.preview_thumbnail_url) && (
                  <VideoImageCarousel>
                    {getVideoMarkupForCarousel()}

                    {recipe?.images.map(item => (
                      <img
                        className={classes.recipe__carouselItem}
                        key={`recipe-slider-${item?.pk}`}
                        src={item?.url}
                        alt="recipe photo"
                      />
                    ))}
                  </VideoImageCarousel>
                )}
                <div className={classes.recipe__video__player}>
                  <div className={classes.recipe__video__player_row}>
                    <div className={classes.recipe__video__views}>
                      <img src="/images/index/ionic-md-eye.svg" alt="" />
                      <span>{recipe.views_number} Views</span>
                    </div>
                    <div className={classes.recipe__video__likes}>
                      <img src="/images/index/Icon awesome-heart.svg" alt="" />
                      <span>{Number(likesNumber)}</span>
                    </div>
                  </div>
                  <div className={classes.recipe__video__player_row}>
                    <Tooltip
                      classes={!isMobileOrTablet && { tooltip: toolTipStyles.tooltip }}
                      title="Votes help recipe to get in production soon."
                      disableFocusListener
                      enterTouchDelay={200}
                      leaveTouchDelay={2000}>
                      <button
                        className={classes.recipe__video__likes_last}
                        onClick={
                          !props.account.hasToken ? openUnregisterModal('unregisterActivityModal') : onClickLike
                        }>
                        {!likeRecipe ? (
                          <img src="/images/index/Icon-awesome-heart-null.svg" alt="" />
                        ) : (
                          <img src="/images/index/Icon awesome-heart.svg" alt="" />
                        )}
                        <span>Vote</span>
                      </button>
                    </Tooltip>
                    <ButtonShare
                      id={recipeId}
                      photo={recipe?.images[0]}
                      description={recipe?.description}
                      currentUrl={`${props?.absolutePath}/recipe/${props?.recipesData?.pk}`}
                    />

                    {!savedId ? (
                      <button
                        className={classes.recipe__video__saveStatus}
                        onClick={!props.account.hasToken ? openRegisterPopup('register') : handleSaveRecipe}>
                        <div className={classes.recipe__video___saveStatusImageWrapper}>
                          <img
                            className={classes.recipe__video__saveStatusImage}
                            src={notSavedStatus}
                            alt="saved status"
                          />
                        </div>
                        <span className={classes.recipe__video__saveStatusLabel}>Save</span>
                      </button>
                    ) : (
                      <button
                        className={classes.recipe__video__saveStatus}
                        onClick={!props.account.hasToken ? openRegisterPopup('register') : handleDeleteRecipeFromSaved}>
                        <div className={classes.recipe__video___saveStatusImageWrapper}>
                          <img
                            className={classes.recipe__video__saveStatusImage}
                            src={savedStatus}
                            alt="saved status"
                          />
                        </div>
                        <span className={classes.recipe__video__saveStatusLabel}>Save</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className={classes.recipe__description}>
                <h2 className={classes.recipe__title}>Description</h2>

                <p dangerouslySetInnerHTML={{ __html: recipe.description }}></p>
              </div>

              <div className={classes.recipe__classification}>
                <h2 className={classes.recipe__title}>All Classification</h2>
                <div className={classes.recipe__classification__grid}>
                  {recipe.diet_restrictions.length !== 0 && (
                    <div>
                      <h4 className={classes.recipe__subtitle}>Type</h4>
                      {recipe.diet_restrictions.map((item, index) => {
                        return <p key={index}>{dietaryrestrictions[item]}</p>;
                      })}
                    </div>
                  )}
                  {recipe.cuisines.length !== 0 && (
                    <div>
                      <h4 className={classes.recipe__subtitle}>Cuisines</h4>
                      {recipe.cuisines.map((item, index) => {
                        return <p key={index}>{cuisineList[item]}</p>;
                      })}
                    </div>
                  )}
                  {recipe.cooking_methods.length !== 0 && (
                    <div>
                      <h4 className={classes.recipe__subtitle}>Cooking Style</h4>
                      {recipe.cooking_methods.map((item, index) => {
                        return <p key={index}>{cookingMethods[item]}</p>;
                      })}
                    </div>
                  )}
                  {recipe?.cooking_skills && (
                    <div>
                      <h4 className={classes.recipe__subtitle}>Cooking Skills</h4>
                      <p>{cookingSkill[recipe.cooking_skills]}</p>
                    </div>
                  )}
                  {recipe.types.length !== 0 && (
                    <div>
                      <h4 className={classes.recipe__subtitle}>Lifestyle</h4>
                      {recipe.types.map((item, index) => {
                        return <p key={index}>{recipeTypes[item]}</p>;
                      })}
                    </div>
                  )}
                </div>
              </div>

              {recipe.ingredients.length !== 0 && (
                <div className={classes.recipe__classification}>
                  <h2 className={classes.recipe__title}>Ingredients</h2>
                  <div className={classes.recipe__classification__grid}>
                    {recipe.ingredients.map((item, index) => {
                      return (
                        <div key={index}>
                          <h4 className={classes.recipe__subtitle}>{item.title}</h4>
                          <p>{`${item.quantity} ${handleIngredientsUnit(item.unit)}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className={classes.recipe__nutritionContainer}>
                <div className={classes.recipe__nutritionItem}>
                  <p className={classes.recipe__nutritionsQuantity}>{recipe.calories ? recipe.calories : '-'}</p>
                  <p className={classes.recipe__nutritionsName}>Calories</p>
                </div>
                <div className={classes.recipe__nutritionItem}>
                  <p className={classes.recipe__nutritionsQuantity}>{recipe.proteins ? `${recipe.proteins}%` : '-'}</p>
                  <p className={classes.recipe__nutritionsName}>Protein</p>
                </div>
                <div className={classes.recipe__nutritionItem}>
                  <p className={classes.recipe__nutritionsQuantity}>{recipe.fats ? `${recipe.fats}%` : '-'}</p>
                  <p className={classes.recipe__nutritionsName}>Fat</p>
                </div>
                <div className={classes.recipe__nutritionItem}>
                  <p className={classes.recipe__nutritionsQuantity}>
                    {recipe.carbohydrates ? `${recipe.carbohydrates}%` : '-'}
                  </p>
                  <p className={classes.recipe__nutritionsName}>Carbs</p>
                </div>
              </div>

              {recipe.steps.length !== 0 && (
                <div>
                  <h2 className={classes.recipe__title}>Steps to make {recipe.title}</h2>
                  {recipe.steps.map((item, index) => {
                    return (
                      <div key={index} className={classes.recipe__step}>
                        <h3>
                          <span>Step {item.num}: </span>
                          {item.title}
                        </h3>
                        <p>{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <ResipeComments id={recipeId} userId={userId} />
            </div>
            <div className={classes.recipe__cards}>
              {latestRecipes && (
                <>
                  <h2 className={classes.recipe__cards__title}>Latest Recipes</h2>
                  {latestRecipes.slice(0, 2).map((recipe, index) => {
                    return (
                      <CardLatestRecipes
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images[0]?.url}
                        name={recipe?.user?.full_name}
                        city={recipe?.user?.city}
                        likes={recipe?.likes_number}
                        savedId={recipe?.user_saved_recipe}
                        id={recipe.pk}
                        publishStatus={recipe?.publish_status}
                        hasVideo={recipe?.video}
                        isParsed={recipe?.is_parsed}
                      />
                    );
                  })}
                </>
              )}
              {featuredMeals && (
                <>
                  <h2 className={classes.recipe__cards__title}>Featured Recipes</h2>
                  {featuredMeals.map((recipe, index) => {
                    return (
                      <CardPopularRecipes
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images[0]?.url}
                        id={recipe.pk}
                      />
                    );
                  })}
                </>
              )}
              {popularRecipes && (
                <>
                  <h2 className={classes.recipe__cards__title}>Popular Recipes</h2>
                  {popularRecipes.map((recipe, index) => {
                    return (
                      <CardPopularRecipes
                        key={`${recipe.pk}-${index}`}
                        title={recipe?.title}
                        image={recipe?.images[0]?.url}
                        id={recipe.pk}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className={classes.recipe__banner}>
            <p className={classes.recipe__banner__title}>
              Do you <span>have any question</span> or ready <span>to cook?</span>
            </p>
            <p className={classes.recipe__banner__subtitle}>share your mail id and we will shortly connect you</p>
            <input className={classes.recipe__banner__inputEmail} placeholder="example@gmail.com"></input>
            <Button variant="contained" color="primary">
              Share
            </Button>
            <img src="/images/index/banner-view-recipe.svg" className={classes.recipe__banner__photo} />
          </div>
        </>
      )}
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
      <LayoutPage content={!notFound ? content : <RecipeNotFound />} />
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
        recipesData: response.data,
        absolutePath: context.req.headers.host
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
