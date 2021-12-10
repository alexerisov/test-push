import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import Recipe from '@/api/Recipe';
import { Button, CardMedia, IconButton, List, ListItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Link from 'next/link';
import logo from '../../../../../public/images/index/logo.svg';
import CardContent from '@material-ui/core/CardContent';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as IceCreamIcon } from '../../../../../public/icons/Ice Cream/Line.svg';
import { cookingSkill, recipeTypes } from '@/utils/datasets';
import { ReactComponent as HatChefIcon } from '../../../../../public/icons/Hat Chef/Line.svg';
import { Divider } from '@/components/basic-elements/divider';
import { CounterButton } from '@/components/blocks/cart-page/button-counter';
import { RecipeCard } from '@/components/basic-blocks/recipe-card';

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Recipe.getTopRatedMeals().then(data => {
      setRecipes(data.data);
    });
  }, []);

  return (
    <div className={classes.slider_body}>
      <List className={classes.slider_body_list}>
        {recipes?.length > 0 &&
          recipes.map(recipe => (
            <ListItem key={recipe.pk}>
              <RecipeCard recipe={recipe} />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export const WeekMenuBlock = () => {
  return (
    <section className={classes.container}>
      <div className={classes.slider_title}>Browse Weekmenu</div>
      <div className={classes.slider_subtitle}>Let's go to meet new sensations</div>
      <RecipeSlider />
    </section>
  );
};
