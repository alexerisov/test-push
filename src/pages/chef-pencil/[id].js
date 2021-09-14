import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useActions } from '@/customHooks/useActions';
import LayoutPage from '@/components/layouts/layout-page';
import { useRouter } from 'next/router';
import { useMobileDevice } from '@/customHooks/useMobileDevice';
import { NextSeo } from 'next-seo';

import ResipeComments from '@/components/blocks/recipe-comments';
import { CardChefPencil } from '@/components/elements/card';
import RecipeNotFound from '@/components/elements/recipe-not-found';
import RatingComponent from '@/components/elements/rating';

import { pageNames } from '@/utils/datasets';
import Account from '@/api/Account.js';
import { modalActions } from '@/store/actions';
import Cookies from 'cookies';
import ChefPencil from '@/api/ChefPencil.js';

import classes from './id.module.scss';
import SearchIcon from '@material-ui/icons/Search';

function RecipePage({ pencilData, notFound, absolutePath }) {
  const account = useSelector(state => state.account);

  // Bind Modal action creators with dispatch
  const { open, close } = useActions(modalActions);

  const [isMobileOrTablet] = useMobileDevice();
  const router = useRouter();
  const [pencil, setPencil] = useState();
  const [pencilId, setPencilId] = useState();
  const [userId, setUserId] = useState();
  const [latestPencils, setLatestPencils] = useState();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    setPencilId(router.query.id);
    if (account.hasToken) {
      Account.current().then(res => {
        setUserId(res.data.pk);
      });
    }
  }, [router]);

  useEffect(() => {
    setPencil(pencilData);
  }, [pencilId]);

  useEffect(() => {
    ChefPencil.getLatestPencils().then(res => {
      setLatestPencils(res.data);
    });
  }, []);

  const getComments = ({ recipeId, page }) => {
    return ChefPencil.getComments({ recipeId, page });
  };

  const uploadComment = ({ id, text }) => {
    return ChefPencil.uploadComments({ id, text });
  };

  const uploadLike = ({ id, type }) => {
    return ChefPencil.uploadCommentsLikes({ id, type });
  };

  const openRegisterPopup = name => {
    return () => {
      open(name).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const deletePencil = confirm => {
    if (confirm) {
      ChefPencil.deletePencil(pencilId)
        .then(res => {
          router.push('/my-pencils');
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleClickDelete = name => {
    return () => {
      open(name).then(result => {
        deletePencil(result);
      });
    };
  };

  const redirectToHomeChefPage = () => {
    router.push(`/home-chef/${pencil?.user?.pk}`);
  };

  const handleRating = async value => {
    if (!account.hasToken) {
      open('register').then(result => {
        // result when modal return promise and close
      });
      return;
    }

    try {
      const response = ChefPencil.uploadRating({ value, id: pencilId });

      if (response?.status === 201) {
        setRating(response?.data?.rating);
      }
    } catch (e) {
      console.error(e);
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
          setBreadcrumbsLink(page);
          return;
        }
        if (page.includes('chef-pencil')) {
          setBreadcrumbsName("Chef's Pencil");
          setBreadcrumbsLink(page);
          return;
        }
        if (!pageNames[page]) {
          setBreadcrumbsName('Home');
          setBreadcrumbsLink('/');
          return;
        }
        setBreadcrumbsName(pageNames[page]);
        setBreadcrumbsLink(page);
      }
    }
  }, []);

  const handleClickSearch = name => {
    return () => {
      open(name).then(result => {
        // result when modal return promise and close
      });
    };
  };

  const content = (
    <div className={classes.pencil}>
      <h2 className={classes.pencil__navbar}>
        <div className={classes.pencils__breadcrumbs}>
          <Link href="/">
            <a className={classes.pencil__navbar__link}>Home /</a>
          </Link>
          {breadcrumbsLink !== '/' && (
            <Link href={breadcrumbsLink}>
              <a className={classes.pencil__navbar__link}> {breadcrumbsName} /</a>
            </Link>
          )}
          <span> {pencil?.title}</span>
        </div>

        <SearchIcon className={classes.pencil__searchIcon} onClick={handleClickSearch('SearchModal')} />
      </h2>
      <div className={classes.pencil__content}>
        <div className={classes.pencil__pencilContent}>
          <div className={classes.pencil__header}>
            <div>
              <h2 className={classes.pencil__title}>{pencil?.title}</h2>
              <p className={classes.pencil__author}>
                by Chef{' '}
                <span onClick={redirectToHomeChefPage} className={classes.pencil__authorText}>
                  {pencil?.user?.full_name}
                </span>
              </p>
            </div>
            <div className={classes.pencil__icons}>
              {pencil?.user?.pk === userId && (
                <div>
                  <Link href={`/chef-pencil/editing/${pencilId}`}>
                    <a className={classes.pencil__linkEdit}>
                      <img src="/images/index/pencil-black.svg" />
                    </a>
                  </Link>
                  <button className={classes.pencil__deleteButton} onClick={handleClickDelete('confirmation')}>
                    <img src="/images/index/delete.svg" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={classes.pencil__description}>
            {pencil?.image && <img src={pencil?.image} className={classes.pencil__mainImage} alt="pencil image" />}

            <p dangerouslySetInnerHTML={{ __html: pencil?.html_content }} className={classes.pencil__descriptionText} />
          </div>

          <ResipeComments
            id={pencilId}
            userId={userId}
            updateComments={getComments}
            addComment={uploadComment}
            uploadLikeHandler={uploadLike}
            deleteCommentHandle={ChefPencil.deleteComment}>
            {/*<RatingComponent rating={rating ?? pencil?.avg_rating} handleRating={handleRating} />*/}
          </ResipeComments>
        </div>
        <div className={classes.pencil__cards}>
          {latestPencils?.length !== 0 && (
            <>
              <h2 className={classes.pencil__cards__title}>{"Latest from Chef's Pencil"}</h2>
              {latestPencils?.length !== 0 &&
                latestPencils?.map((pencil, index) => {
                  return (
                    <CardChefPencil
                      key={`latest-pencil-${index}`}
                      title={pencil?.title}
                      image={pencil?.image}
                      chefName={pencil?.user?.full_name}
                      id={pencil.pk}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!notFound && (
        <NextSeo
          openGraph={{
            url: `${absolutePath}/recipe/${pencil?.pk}`,
            title: `${pencil?.title}`,
            images: [
              {
                url: `${pencil?.image}`,
                width: 800,
                height: 600,
                alt: 'pencil image'
              }
            ]
          }}
        />
      )}
      <LayoutPage content={!notFound ? content : <RecipeNotFound text="Chef's Pencil not found" />} />
    </>
  );
}

export default RecipePage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const cookies = new Cookies(context.req, context.res);
  const targetCookies = cookies.get('aucr');
  const token = !targetCookies ? undefined : decodeURIComponent(cookies.get('aucr'));

  try {
    const response = await ChefPencil.getTargetChefPencil(id, token);

    return {
      props: {
        pencilData: response.data,
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
