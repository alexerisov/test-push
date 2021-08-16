import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

import { LayoutPage } from '@/components/layouts';
import RoleModel from '@/components/elements/role-model';
import CardFavouriteDishes from '@/components/elements/card/card-favourite-dishes';
import CardHomeChefProfile from '@/components/elements/card/card-homechef-profile';
import CardHighestMeals from '@/components/elements/card-highest-meals';

import Recipe from '@/api/Recipe';
import Account from '@/api/Account';

import styles from '@/pages/home-chef/index.module.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useAvatarStyles = makeStyles({
  root: {
      position: 'absolute',
      width: '114px !important',
      height: '114px !important'
  }
});

const HomePageOfTargetChef = () => {
  const mobile = useMediaQuery('(max-width: 568px)');
  const tablet = useMediaQuery('(max-width: 992px)');
  const avatarStyles = useAvatarStyles();
  const router = useRouter();
  const [chefInfo, setChefInfo] = useState(null);
  const [chefId, setChefId] = useState(null);
  const [uploadRecipes, setUploadRecipes] = useState();

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Pagination params
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const countPages = count => {
    const isRemainExists = count % itemsPerPage > 0;
    let pages = Math.floor(count / itemsPerPage);
    return isRemainExists ? ++pages : pages;
  };

  useEffect(async () => {
    if (chefId) {
      try {
        const response = await Account.getTargetChefAccountInfo(chefId);

        if (response.status === 200) {
          setChefInfo(response.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [chefId]);

  useEffect(() => {
    setChefId(router.query.id);
  }, [router]);

  useEffect(async () => {
    if (chefId) {
      try {
        const query = new URLSearchParams({
          page_size: 6,
          page: page
        });

        const response = await Recipe.getUploadRecipesForTargetUser({
          query,
          id: chefId
        });

        if (response.status === 200) {
          setNumberOfPages(countPages(response.data.count));
          setUploadRecipes(response.data.results);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [page, chefId]);

  const getVisibleRolesInCarousel = () => {
    if (mobile) {
      return 2;
    }

    if (tablet) {
      return 4;
    }

    return 8;
  };

  const getVisibleFavDishesInCarousel = () => {
    if (mobile) {
      return 1;
    }

    if (tablet) {
      return 2;
    }

    return 3;
  };

  const content = (
    <div className={styles.profile}>
      <h2 className={styles.navbar}>
        <Link href="/">
          <a>Home /</a>
        </Link>
        <span> My Profile</span>
      </h2>

      <section className={`${styles.section} ${styles.info}`}>
        <Avatar
          className={styles.avatar}
          classes={{ root: avatarStyles.root }}
          src={chefInfo?.avatar}
          variant="circle"
        />

        <div className={styles.info__content}>
          <div className={styles.info__left}>
            <div className={styles.name}>
              <h3 className={`${styles.field} ${styles.name__field}`}>Name</h3>
              <p className={`${styles.value} ${styles.name__value}`}>{chefInfo?.full_name}</p>
            </div>

            <table className={styles.info__left__table}>
              <tbody>
                <tr className={styles.row}>
                  <td className={styles.cell} style={{ width: '50%' }}>
                    <h3 className={styles.field}>Email</h3>
                    <p className={styles.value}>{!chefInfo?.email ? '-' : chefInfo.email}</p>
                  </td>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>Phone Number</h3>
                    <p className={styles.value}>{!chefInfo?.phone_number ? '-' : chefInfo.phone_number}</p>
                  </td>
                </tr>

                <tr className={styles.row}>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>City</h3>
                    <p className={styles.value}>{!chefInfo?.city ? '-' : chefInfo.city}</p>
                  </td>
                  <td className={styles.cell}>
                    <h3 className={styles.field}>Language</h3>
                    <p className={styles.value}>{!chefInfo?.language ? '-' : chefInfo.language}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.info__right}>
            <div className={styles.bio}>
              <h3 className={styles.field}>Bio</h3>
              <p className={styles.value}>{!chefInfo?.bio ? '-' : chefInfo?.bio}</p>
            </div>

            <div className={styles.experience}>
              <h3 className={styles.field}>Experience</h3>
              <p className={styles.value}>{!chefInfo?.experience ? '-' : chefInfo?.experience}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>My Role Models</h2>

        <div className={styles.roleCarousel}>
          <CarouselProvider
            naturalSlideWidth={95}
            isIntrinsicHeight={true}
            totalSlides={chefInfo?.role_models.length}
            step={getVisibleRolesInCarousel()}>
            <Slider className={styles.roleCarousel__slider}>
              {chefInfo?.role_models?.length ? (
                chefInfo.role_models.map((role, index) => {
                  return (
                    <Slide key={`role_model${role.pk}`} className={styles.roleCarousel__item} index={index}>
                      <RoleModel name={role.name} avatar={role.file} />
                    </Slide>
                  );
                })
              ) : (
                <span className={styles.roleCarousel__empty}>No Role models exists yet!</span>
              )}
            </Slider>
            {chefInfo?.role_models?.length !== 0 && (
              <>
                <ButtonBack className={styles.roleCarousel__prev}>
                  <NavigateBeforeIcon />
                </ButtonBack>
                <ButtonNext className={styles.roleCarousel__next}>
                  <NavigateNextIcon />
                </ButtonNext>
              </>
            )}
          </CarouselProvider>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>My Favourite Dishes</h2>

        <div className={styles.favDishesCarousel}>
          <CarouselProvider
            naturalSlideWidth={220}
            isIntrinsicHeight={true}
            totalSlides={chefInfo?.favorite_recipes?.length}
            step={getVisibleFavDishesInCarousel()}>
            <Slider className={styles.favDishesCarousel__slider}>
              {chefInfo?.favorite_recipes?.length ? (
                chefInfo?.favorite_recipes?.map(item => {
                  return (
                    <Slide key={`card-favorite-dish-${item.pk}`} className={styles.favDishesCarousel__item} index={1}>
                      <CardFavouriteDishes recipeId={item.pk} title={item.title} image={item.images[0].url} />
                    </Slide>
                  );
                })
              ) : (
                <span className={styles.favDishesCarousel__empty}>No favourite dishes exists yet!</span>
              )}
            </Slider>
            {chefInfo?.favorite_recipes?.length !== 0 && (
              <>
                <ButtonBack className={styles.favDishesCarousel__prev}>
                  <NavigateBeforeIcon />
                </ButtonBack>
                <ButtonNext className={styles.favDishesCarousel__next}>
                  <NavigateNextIcon />
                </ButtonNext>
              </>
            )}
          </CarouselProvider>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Other Information</h2>

        <div className={styles.itemsContainer}>
          {!chefInfo?.cooking_philosophy.every(item => !item.length) && (
            <CardHomeChefProfile type={1} list={chefInfo?.cooking_philosophy} />
          )}
          {!chefInfo?.personal_cooking_mission.every(item => !item.length) && (
            <CardHomeChefProfile type={2} list={chefInfo?.personal_cooking_mission} />
          )}
          {!chefInfo?.source_of_inspiration.every(item => !item.length) && (
            <CardHomeChefProfile type={3} list={chefInfo?.source_of_inspiration} />
          )}
          {chefInfo?.cooking_philosophy.every(item => !item.length) &&
            chefInfo?.personal_cooking_mission.every(item => !item.length) &&
            chefInfo?.source_of_inspiration.every(item => !item.length) && (
              <div className={styles.itemsContainer__empty}>No other information yet exist yet!</div>
            )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionRecipes}>
          <h2 className={styles.sectionTitle}>My Recipes</h2>

          <Tooltip title={expanded ? 'Close all' : 'Expand all'} aria-label="expand all">
            <NavigateBeforeIcon className={expanded ? styles.closed : styles.expanded} onClick={handleExpandClick} />
          </Tooltip>
        </div>

        <Collapse
          in={expanded}
          timeout="auto"
          collapsedSize={325}
          style={{ minHeight: '325px', visibility: 'visible' }}>
          <div className={styles.sectionRecipes__wrapper}>
            <div className={styles.itemsContainer}>
              {uploadRecipes &&
                uploadRecipes.map(item => (
                  <CardHighestMeals
                    key={`${item.pk + '1k0'}`}
                    name={item.user.full_name}
                    title={item.title}
                    image={item.images[0]?.url}
                    city={item.city}
                    id={item.pk}
                    likes={item?.['likes_number']}
                  />
                ))}
            </div>

            {expanded && (
              <Pagination
                classes={{ root: styles.sectionRecipes__pagination }}
                size={tablet ? 'small' : 'large'}
                count={numberOfPages}
                page={page}
                onChange={(event, number) => setPage(number)}
              />
            )}
          </div>
        </Collapse>
      </section>
    </div>
  );

  return <LayoutPage content={content} />;
};

export default HomePageOfTargetChef;
