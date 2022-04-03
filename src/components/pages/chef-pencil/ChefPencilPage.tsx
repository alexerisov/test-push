import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useActions } from '@/customHooks/useActions';
import { useRouter } from 'next/router';
import { useMobileDevice } from '@/customHooks/useMobileDevice';
import { NextSeo } from 'next-seo';

import ResipeComments from '@/components/blocks/recipe-comments';
import { CardChefPencil } from '@/components/elements/card';
import RecipeNotFound from '@/components/elements/recipe-not-found';

import { pageNames } from '@/utils/datasets';
import Account from '@/api/Account';
import { modalActions } from '@/store/actions';
import ChefPencil from '@/api/ChefPencil.js';
import { recipePhotoSlider } from '@/store/actions';

import s from './ChefPencilPage.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import VideoImageCarousel from '@/components/blocks/video-image-carousel/video-image-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonShare } from '@/components/elements/button';
import savedStatus from '~public/images/index/savedStatus.svg';
import notSavedStatus from '~public/images/index/notSavedStatus.svg';
import { useAuth } from '@/utils/Hooks';
import LayoutPageNew from '@/components/layouts/layout-page-new';

const useStyledTooltip = makeStyles({
  tooltip: {
    padding: '5px 10px !important',
    fontSize: '16px',
    hyphens: 'auto',
    maxWidth: '400px'
  }
});

export const ChefPencilPage: React.FC<any> = ({ pencilData, notFound, absolutePath }) => {
  const { session, status: loading } = useAuth();
  const toolTipStyles = useStyledTooltip();

  // Bind Modal action creators with dispatch
  const { open, close } = useActions(modalActions);
  const { setItems: setImageCarouselItems } = useActions(recipePhotoSlider);
  const [pencilImages, setPencilImages] = useState([]);

  const [isMobileOrTablet] = useMobileDevice();
  const router = useRouter();
  const [pencil, setPencil] = useState<any>();
  const [pencilId, setPencilId] = useState<string | string[]>();
  const [userId, setUserId] = useState();
  const [latestPencils, setLatestPencils] = useState();
  const [rating, setRating] = useState(null);
  const [likePencil, setLikePencil] = useState(pencilData?.user_liked);
  const [likesNumber, setLikesNumber] = useState(pencilData?.likes_number);
  const [savedId, setSavedId] = useState(pencilData?.user_saved_chef_pencil_record);

  useEffect(() => {
    setPencilId(router.query.id);
    if (session) {
      Account.current().then(res => {
        setUserId(res.data.pk);
      });
    }
  }, [router]);

  useEffect(() => {
    setPencil(pencilData);

    // to get main image and create new array of pencil images in right order
    const clonedPencilImages = [...pencilData?.images];
    const mainImage = clonedPencilImages?.find(item => item.main_image);
    const pencilImages = clonedPencilImages?.filter(item => !item.main_image);

    setImageCarouselItems({
      ...pencilData,
      images: [mainImage, ...pencilImages]
    });

    setPencilImages([mainImage, ...pencilImages]);
  }, [pencilId]);

  useEffect(() => {
    ChefPencil.getLatestPencils().then(res => {
      setLatestPencils(res.data);
    });
  }, []);

  const getComments = ({ recipeId, page }: { recipeId: number; page: number }) => {
    return ChefPencil.getComments({ recipeId, page });
  };

  const uploadComment = ({ id, text }: { id: number; text: string }) => {
    return ChefPencil.uploadComments({ id, text });
  };

  const uploadLike = ({ id, type }: { id: number; type: 'like' | 'dislike' }) => {
    return ChefPencil.uploadCommentsLikes({ id, type });
  };

  const openRegisterPopup = (name: string) => {
    return () => {
      open(name).then((result: any) => {
        // result when modal return promise and close
      });
    };
  };

  const deletePencil = (confirm: any) => {
    if (confirm) {
      ChefPencil.deletePencil(pencilId)
        .then(res => {
          router.push('/my-pencils', undefined, { locale: router.locale });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleClickDelete = (name: string) => {
    return () => {
      open(name).then((result: any) => {
        deletePencil(result);
      });
    };
  };

  const redirectToHomeChefPage = () => {
    router.push(`/home-chef/${pencil?.user?.pk}`, undefined, { locale: router.locale });
  };

  const handleRating = async (value: any) => {
    if (!session) {
      open('register').then((result: any) => {
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
        const page: string = url.slice(url.lastIndexOf('/'));
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
        if (typeof page !== page) {
          setBreadcrumbsName('Home');
          setBreadcrumbsLink('/');
          return;
        }
        setBreadcrumbsName(pageNames[page]);
        setBreadcrumbsLink(page);
      }
    }
  }, []);

  const handleClickSearch = (name: string) => {
    return () => {
      open(name).then((result: any) => {
        // result when modal return promise and close
      });
    };
  };

  const onClickLike = () => {
    ChefPencil.uploadLikesPencil(pencilId)
      .then(res => {
        if (res.data.like_status === 'deleted') {
          setLikePencil(false);
          likesNumber > 0 && setLikesNumber(likesNumber - 1);
        } else {
          setLikePencil(true);
          setLikesNumber(likesNumber + 1);
        }
      })
      .catch(err => console.log(err));
  };
  const handleSavePencil = () => {
    ChefPencil.postSavedPencil(pencilData.pk)
      .then(res => {
        setSavedId(res.data.pk);
      })
      .catch(err => console.log(err));
  };
  const handleDeletePencilFromSaved = () => {
    ChefPencil.deleteSavedPencil(savedId)
      .then(res => {
        setSavedId(false);
      })
      .catch(err => console.log(err));
  };

  const content = (
    <div className={s.pencil}>
      <h2 className={s.pencil__navbar}>
        <div className={s.pencils__breadcrumbs}>
          <Link href="/">
            <a className={s.pencil__navbar__link}>Home /</a>
          </Link>
          {breadcrumbsLink !== '/' && (
            <Link href={breadcrumbsLink}>
              <a className={s.pencil__navbar__link}> {breadcrumbsName} /</a>
            </Link>
          )}
          <span> {pencil?.title}</span>
        </div>

        <SearchIcon className={s.pencil__searchIcon} onClick={handleClickSearch('SearchModal')} />
      </h2>
      <div className={s.pencil__content}>
        <div className={s.pencil__pencilContent}>
          <div className={s.pencil__header}>
            <div>
              <h2 className={s.pencil__title}>{pencil?.title}</h2>
              <p className={s.pencil__author}>
                by Chef{' '}
                <span onClick={redirectToHomeChefPage} className={s.pencil__authorText}>
                  {pencil?.user?.full_name}
                </span>
              </p>
            </div>
            <div className={s.pencil__icons}>
              {pencil?.user?.pk === userId && (
                <div>
                  <Link href={`/chef-pencil/editing/${pencilId}`}>
                    <a className={s.pencil__linkEdit}>
                      <img src="/images/index/pencil-black.svg" />
                    </a>
                  </Link>
                  <button className={s.pencil__deleteButton} onClick={handleClickDelete('confirmation')}>
                    <img src="/images/index/delete.svg" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={s.pencil__description}>
            {!pencilImages?.length ? (
              ''
            ) : (
              <VideoImageCarousel>
                {pencilImages?.map(item => (
                  <img
                    className={s.recipe__carouselItem}
                    key={`recipe-slider-${item?.pk}`}
                    src={item?.url}
                    alt="recipe photo"
                  />
                ))}
              </VideoImageCarousel>
            )}

            <p dangerouslySetInnerHTML={{ __html: pencil?.html_content }} className={s.pencil__descriptionText} />
          </div>

          <div className={s.pencil__social}>
            <div className={s.pencil__social_row}>
              {/* <div className={classes.pencil__social__views}>
                <img src="/images/index/ionic-md-eye.svg" alt="" />
                <span>{pencil.views_number} Views</span>487 Views
              </div> */}

              <div className={s.pencil__social__likes}>
                <img src="/images/index/Icon awesome-heart.svg" alt="" />
                <span>{Number(likesNumber)}</span>
              </div>
            </div>

            <div className={s.pencil__social_row}>
              <Tooltip
                classes={!isMobileOrTablet && { tooltip: toolTipStyles.tooltip }}
                title="Votes help recipe to get in production soon."
                disableFocusListener
                enterTouchDelay={200}
                leaveTouchDelay={2000}>
                <button
                  className={s.pencil__social__likes_last}
                  onClick={!session ? openRegisterPopup('register') : onClickLike}>
                  {!likePencil ? (
                    <img src="/images/index/Icon-awesome-heart-null.svg" alt="" />
                  ) : (
                    <img src="/images/index/Icon awesome-heart.svg" alt="" />
                  )}
                  <span className={s.pencil__social}>Vote</span>
                </button>
              </Tooltip>

              <ButtonShare id={pencilId} currentUrl={`${absolutePath}/chef-pencil/${pencilData?.pk}`} />

              {!savedId ? (
                <button
                  className={s.pencil__social__saveStatus}
                  onClick={!session ? openRegisterPopup('register') : handleSavePencil}>
                  <div className={s.pencil__social___saveStatusImageWrapper}>
                    <img className={s.pencil__social__saveStatusImage} src={notSavedStatus} alt="saved status" />
                  </div>
                  <span className={s.pencil__social__saveStatusLabel}>Save</span>
                </button>
              ) : (
                <button
                  className={s.pencil__social__saveStatus}
                  onClick={!session ? openRegisterPopup('register') : handleDeletePencilFromSaved}>
                  <div className={s.pencil__social___saveStatusImageWrapper}>
                    <img className={s.pencil__social__saveStatusImage} src={savedStatus} alt="saved status" />
                  </div>
                  <span className={s.pencil__social__saveStatusLabel}>Save</span>
                </button>
              )}
            </div>
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
        <div className={s.pencil__cards}>
          {latestPencils?.length !== 0 && (
            <>
              <h2 className={s.pencil__cards__title}>{"Latest from Chef's Pencil"}</h2>
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
      <LayoutPageNew content={!notFound ? content : <RecipeNotFound text="Chef's Pencil not found" />} />
    </>
  );
};
