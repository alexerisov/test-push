import React, { useEffect, useState} from 'react';
import classes from "./index.module.scss";
import CardPinnedMeals from "@/components/elements/card-pinned-meals";
import Recipe from '@/api/Recipe.js';

const PinnedMeals = () => {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getArrayPinnedMeals();
  }, []);

  const getArrayPinnedMeals = async () => {
    try {
      const response = await Recipe.getPinnedMeals();
      setMeals(response.data);
    } catch (e) {
      console.log(e);
    }
  };

    return (
      <section className={classes.container}>
        {meals.map(
          (item) =>
          <CardPinnedMeals
            key={item.pk}
            pk={item.pk}
            title={item.title}
            raitingValue={item.avg_rating}
            avatar={item?.images[0]?.url}
          />
        )}
      </section>
    );
  };
  
export default PinnedMeals;