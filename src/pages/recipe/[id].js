import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import RaitingIcon from "@/components/elements/rating-icon";
import Recipe from '@/api/Recipe.js';
import { useRouter } from 'next/router';
import {cuisineList, recipeTypes, cookingMethods, dietaryrestrictions} from '@/utils/datasets';
import { Button } from '@material-ui/core';
import Link from "next/link";
import ResipeComments from "@/components/blocks/recipe-comments";

function CreateRecipe (props) {

    const router = useRouter();

    const [recipeId, setRecipeId] = useState();
    const [recipe, setRecipe] = useState();
    const [likeRecipe, setLikeRecipe] = useState(false);
    // const [author, setAuthor] = useState();

    useEffect(() => {
        if (recipeId) {
            getRecipe();
        }
    }, [recipeId]);

    useEffect(() => {
        setRecipeId(router.query.id);
    }, [router]);

    const getRecipe = async () => {
        try {
          const response = await Recipe.getRecipe(recipeId);
          setRecipe(response.data);
          setLikeRecipe(response.data.user_liked)
        } catch (e) {
          console.log(e);
        }
    };

    const onClickLikeVideo = () => {
        Recipe.uploadLikesRecipe(recipeId)
        .then(() => {
            setLikeRecipe(true);
        })
        .catch((err) => console.log(err));
    };

    const content = <div className={classes.recipe}>
        {recipe &&
            <>
            <h2 className={classes.recipe__navbar}>
                <Link href="/"><a>Home /</a></Link>
                <Link href="/recipe/recipes"><a> Recipes /</a></Link>
                <span> {recipe.title}</span></h2>
            <div className={classes.recipe__content}>    
                <div className={classes.recipe__recipeContent}>
                    <div className={classes.recipe__header}>
                        <div>
                            <h2 className={classes.recipe__title}>{recipe.title}</h2>
                            <p className={classes.recipe__author}>by Chef {recipe.user.full_name}</p>
                            <p className={classes.recipe__location}>{recipe.user.city}</p>
                            <RaitingIcon value={recipe.avg_rating} />
                        </div>
                        <div className={classes.recipe__time}>
                            <img src="/images/index/timer.svg" />
                            <p>{recipe.cooking_time.slice(3, 5)} MIN</p>
                        </div>
                    </div>
                    <div>
                        { recipe.preview_mp4_url
                            ?   <div className={classes.recipe__video}>
                                    <video width="1000" controls="controls">
                                        <source src={recipe.preview_mp4_url} type="video/mp4" />
                                    </video>
                                    <div className={classes.recipe__video__player}>
                                        <div className={classes.recipe__video__views}>
                                            <img src="/images/index/ionic-md-eye.svg" alt="" />
                                            <span>{recipe.views_count} Views</span>
                                        </div>
                                        <div className={classes.recipe__video__likes}>
                                            <img src="/images/index/Icon awesome-heart.svg" alt="" />
                                            <span>{recipe.likes_number ?? 0}</span>
                                        </div>
                                        <button className={classes.recipe__video__likes_last} onClick={onClickLikeVideo} >
                                            {!likeRecipe ? <img src="/images/index/Icon-awesome-heart-null.svg" alt="" />
                                            : <img src="/images/index/Icon awesome-heart.svg" alt="" />}
                                            <span>Vote</span>
                                        </button>
                                    </div>
                                </div>
                            : ''
                        }
                        </div>
                    <div>
                        <h2 className={classes.recipe__title}>Description</h2>

                        <p dangerouslySetInnerHTML={{__html: recipe.description}}></p>
                    </div>

                    <div className={classes.recipe__classification}>
                        <h2 className={classes.recipe__title}>All Classification</h2>
                        <div className={classes.recipe__classification__grid}>
                            {(recipe.diet_restrictions.length !== 0) &&
                                <div>
                                    <h4 className={classes.recipe__subtitle}>Type</h4>
                                    {recipe.diet_restrictions.map((item, index) => {
                                        return <p key={index}>{dietaryrestrictions[item]}</p>
                                    })}
                                </div>
                            }
                            {(recipe.cuisines.length !== 0) &&
                                <div>
                                    <h4 className={classes.recipe__subtitle}>Cuisines</h4>
                                    {recipe.cuisines.map((item, index) => {
                                        return <p key={index}>{cuisineList[item]}</p>
                                    })}
                                </div>
                            }
                            {(recipe.cooking_methods.length !== 0) &&
                                <div>
                                    <h4 className={classes.recipe__subtitle}>Cooking Style</h4>
                                    {recipe.cooking_methods.map((item, index) => {
                                        return <p key={index}>{cookingMethods[item]}</p>
                                    })}
                                </div>
                            }
                            {(recipe.types.length !== 0) &&
                                <div>
                                    <h4 className={classes.recipe__subtitle}>Lifestyle</h4>
                                    {recipe.types.map((item, index) => {
                                        return <p key={index}>{recipeTypes[item]}</p>
                                    })}
                                </div>
                            }
                        </div>
                    </div>

                    {(recipe.ingredients.length !== 0) &&
                    <div className={classes.recipe__classification}>
                        <h2 className={classes.recipe__title}>Ingredients</h2>
                        <div className={classes.recipe__classification__grid}>
                            {recipe.ingredients.map((item, index) => {
                                return <div key={index}>
                                    <h4 className={classes.recipe__subtitle}>{item.title}</h4>
                                    <p>{item.quantity}</p>
                                </div>
                            })}
                        </div>
                    </div>}

                    <div className={classes.recipe__nutritionContainer}>
                      <div className={classes.recipe__nutritionItem}>
                        <p className={classes.recipe__nutritionsQuantity}>
                          {recipe.calories ? recipe.calories : '-'}
                        </p>
                        <p className={classes.recipe__nutritionsName}>Calories</p>
                      </div>
                      <div className={classes.recipe__nutritionItem}>
                        <p className={classes.recipe__nutritionsQuantity}>
                          {recipe.proteins ? `${recipe.proteins}%` : '-'}
                        </p>
                        <p className={classes.recipe__nutritionsName}>Protein</p>
                      </div>
                      <div className={classes.recipe__nutritionItem}>
                        <p className={classes.recipe__nutritionsQuantity}>
                          {recipe.fats ? `${recipe.fats}%` : '-'}
                        </p>
                        <p className={classes.recipe__nutritionsName}>Fat</p>
                      </div>
                      <div className={classes.recipe__nutritionItem}>
                        <p className={classes.recipe__nutritionsQuantity}>
                          {recipe.carbohydrates ? recipe.carbohydrates : '-'}
                        </p>
                        <p className={classes.recipe__nutritionsName}>Carbs</p>
                      </div>
                    </div>

                    <div className={classes.recipe__gridPhoto}>
                        {recipe.images.map((item) => 
                        <div
                            key={item.id} 
                            className={classes.cardImage}
                            style={{backgroundImage: `url(${item.url})`}}
                        />)}
                    </div>

                    {(recipe.steps.length !== 0) &&
                    <div>
                        <h2 className={classes.recipe__title}>Steps to make {recipe.title}</h2>
                        {recipe.steps.map((item, index) => {
                            return <div key={index} className={classes.recipe__step}>
                                <h3><span>Step {item.num}: </span>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        })}
                    </div>}
                </div>
                <div className={classes.recipe__cards}>
                    <div></div>
                </div>
            </div>

            <ResipeComments recipeId={recipeId} />

            <div className={classes.recipe__banner}>
                <p className={classes.recipe__banner__title}>Do you <span>have any question</span> or ready <span>to cook?</span></p>
                <p className={classes.recipe__banner__subtitle}>share your mail id and we will shortly connect you</p>
                <input className={classes.recipe__banner__inputEmail} placeholder="example@gmail.com"></input>
                <Button
                  variant='contained'
                  color='primary'
                >
                  Share
                </Button>
                <img src="/images/index/banner-view-recipe.svg" className={classes.recipe__banner__photo} />
            </div>
            </>
        }
    </div>

    return (
        <LayoutPage content={content} />
    );
}

export default connect()(CreateRecipe);