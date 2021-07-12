import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from "@/components/layouts/layout-profile-content";
import CardHighestMeals from "@/components/elements/card-highest-meals";
import RaitingIcon from "@/components/elements/rating-icon";
import Recipe from '@/api/Recipe.js';
import { useRouter } from 'next/router';

function Recipe (props) {

    const router = useRouter();
    const [recipeId, setRecipeId] = useState();

    const [recipe, setRecipe] = useState();
    // const [author, setAuthor] = useState();

    useEffect(() => {
        getRecipe();
    }, [recipeId]);

    useEffect(() => {
        setRecipeId(router.query.id);
    }, [router]);

    const getRecipe = async () => {
        try {
          const response = await Recipe.getRecipe(recipeId);
          setRecipe(response.data);
        } catch (e) {
          console.log(e);
        }
    };

    const content = <div className={classes.recipe}>
        {recipe &&
            <>
            <h2 className={classes.recipe__navbar}>Home / Recipes / <span>{recipe.title}</span></h2>
            <div className={classes.recipe__content}>    
                <div className={classes.recipe__recipeContent}>
                    <div>
                        <h2 className={classes.recipe__title}>{recipe.title}</h2>
                        <p className={classes.recipe__author}>by Chef {recipe.user.full_name}</p>
                        <p className={classes.recipe__location}>{recipe.user.city}</p>
                        <RaitingIcon />
                    </div>
                    
                    <div>
                        <h2 className={classes.recipe__title}>Description</h2>
                        <p>{recipe.description}</p>
                    </div>
                </div>
                <div className={classes.recipe__cards}>
                    <div></div>
                </div>
            </div>
            </>
        }
    </div>

    return (
        <LayoutPage content={content} />
    );
}

export default connect()(Recipe);