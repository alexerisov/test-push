import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { NoSsr } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { ReactSortable } from 'react-sortablejs';

import { TextField } from '@material-ui/core';
import FieldError from '../../elements/field-error';
import { CardImageEditRecipe } from '@/components/elements/card';

import {chefPencilUploadActions, modalActions, recipeEditActions, recipeUploadActions} from '@/store/actions';
import { recoveryLocalStorage } from '@/utils/web-storage/local';
import { validator } from '@/utils/validator';
import { nameErrorRecipe } from '@/utils/datasets';

import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import classes from './form-create-chef-pencil.module.scss';
import { useActions } from "@/customHooks/useActions";

const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px'
    },
    '& .MuiInputBase-input': {
      height: 'auto'
    }
  }
});

const Editor = dynamic(() => import('@/components/blocks/Editor'), {
  ssr: false
});

function FormCreateChefPencil({ id, isEditing, initData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.chefPencilUpload);
  const classMarerialUi = useStyles();
  const { open, close } = useActions(modalActions);
  const {update, uploadChefPencil, updateError, updateChefPencil} = useActions(chefPencilUploadActions);

  // For uploading images
  const [isDragging, setIsDragging] = useState(false);
  const uploadImageLabel = useRef();
  const [errorDeleteImages, setErrorDeleteImages] = useState('');
  const [images, setImages] = useState([]);

  useEffect(async () => {
    if (isEditing) {
      const newData = {...initData};
      newData.main_image = initData?.images?.[0];
      newData.images_to_delete = [];
      update(initData);
      return;
    }

    const newData = {
      ...data,
      title: '',
      html_content: '',
      images: [],
      main_image: null,
      error: null
    };

    update(newData);
  }, []);

  // for Drag and Drop, because Sortable.js don't maintain File
  useEffect(() => {
    if (Array.isArray(data?.images)) {
      const imagesData = data?.images?.map((item, index) => {
        return item instanceof File ? { id: index, image: item } : item;
      });

      setImages(imagesData);
      setErrorDeleteImages('');
    }
  }, [data]);

  const onChangeField = name => {
    return event => {
      const newData = { ...data, [name]: event.target.value };
      const currentLength = event?.target.value.length;
      const newError = {
        ...error,
        [name]: `${validator.getErrorStatusByCheckingLength({
          currentLength,
          ...getMaxLengthOfField(name)
        })}`
      };
      update(newData);
      updateError(newError);
    };
  };

  const onChangeEditorField = value => {
      if (!value) {
        const newData = { ...data, html_content: value };
        const newError = {
          ...error,
          html_content: 'Required field'
        };
        dispatch(chefPencilUploadActions.update(newData));
        dispatch(chefPencilUploadActions.updateError(newError));
        return;
      }

      const newData = { ...data, html_content: value };
      const newError = {
        ...error,
        html_content: ''
      };
      dispatch(chefPencilUploadActions.update(newData));
      dispatch(chefPencilUploadActions.updateError(newError));
  };

  //todo check getMaxLengthDescription
  const getMaxLengthOfField = name => {
    switch (name) {
      case 'title':
        return { maxLength: 50 };
      case 'description':
        return { maxLength: 500 };
    }
  };

  const handleClickPopupOpen = (name, params) => {
    return () => {
      open(name, params);
    };
  };

  const handleAddImage = e => {
    // for drag and drop
    if (isDragging && e?.dataTransfer?.files?.length !== 0) {
      const newImageList = [...data?.images, ...Object.values(e.dataTransfer.files)];
      const newData = { ...data, images: newImageList };
      update(newData);
    }

    if (!isDragging && e?.currentTarget?.files?.length !== 0) {
      const newImageList = [...data?.images, ...Object.values(e.currentTarget.files)];
      const newData = { ...data, images: newImageList };
      update(newData);
    }
  };

  const [statusSubmit, setStatusSubmit] = useState('Submit');

  function uploadChefPencilHandler(e) {
    e.preventDefault();
    setStatusSubmit('Loading...');

    const clonedData = { ...data };

    if (isEditing) {
      if (clonedData.main_image instanceof File) {
        clonedData.main_image = clonedData.main_image.name;
      } else {
        clonedData.main_image = clonedData.main_image.id;
      }

      updateChefPencil(clonedData, id)
        .then(data => {
          setStatusSubmit('Submit');
          return open('editSuccessful', {
            handleClick: (e) => handleClickForModal(e, id),
            handleCancel: handleCloseForModal
          });
        })
        .catch(err => {
          handleErrorScroll(err.response.data);
          setStatusSubmit('Submit');
          console.log(err);
        });

      return;
    }

    clonedData.main_image = clonedData?.images?.[0].name;
    uploadChefPencil(clonedData)
      .then(data => {
        setStatusSubmit('Submit');
        return open('uploadSuccessful', {
          handleClick: (e) => handleClickForModal(e, data?.pk),
          handleCancel: handleCloseForModal
        });
      })
      .catch(err => {
        handleErrorScroll(err.response.data);
        setStatusSubmit('Submit');
        console.log(err);
      });
  }

  const handleClickForModal = (e, id) => {
    e.preventDefault();

    if (isEditing) {
      router.push(`/chef-pencil/${id}`);
      close();
      return;
    }

    router.push(`/chef-pencil/${id}`);
    close();
  };

  const handleCloseForModal = () => {
    if (isEditing) {
      router.push(`/chef-pencil/${id}`);
      close();
      return;
    }

    router.push(`/`);
    close();
  };

  // Scroll to errors
  const handleErrorScroll = error => {
    if (error !== null) {
      const elementError = nameErrorRecipe.find(item => error[item.nameErrorResponse]);
      if (elementError?.nameErrorResponse === 'description') {
        const el = document.querySelector(`textarea[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
      if (elementError?.nameDiv) {
        const el = document.querySelector(`div[id=${elementError.nameDiv}]`);
        scrollToElement(el);
        return;
      }
      if (elementError) {
        const el = document.querySelector(`input[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
    }
  };

  const scrollToElement = el => {
    el !== null && el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  };

  const mobile = useMediaQuery('(max-width:576px)');

  function handleDrop(event) {
    event.preventDefault();
    handleAddImage(event);
    setIsDragging(false);
    uploadImageLabel.current.style.border = '1px dashed #DFDFDF';
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    uploadImageLabel.current.style.border = '1px dashed black';
  }

  function handleDragLeave() {
    setIsDragging(false);
    uploadImageLabel.current.style.border = '1px dashed #DFDFDF';
  }

  function handleDragEnter(event) {
    event.preventDefault();
  }

  // Reload data from localStorage
  /*const [restoreRecipeData, setRestoreRecipeData] = useState(false);

  useEffect(() => {
    if (restoreRecipeData) {
      const newData = {
        ...data,
        images: [],
        preview_full_thumbnail_url: '',
        preview_mp4_url: '',
        preview_thumbnail_url: '',
        preview_webm_url: ''
      };
      recoveryLocalStorage.setCreateRecipe(newData);
    }
  }, [data]);

  useEffect(() => {
    const newData = recoveryLocalStorage.getCreateRecipe();
    newData && props.dispatch(recipeUploadActions.update(newData));
    setRestoreRecipeData(true);
  }, []);

  const handleClearForm = () => {
    recoveryLocalStorage.deleteCreateRecipe();
    router.reload();
  };*/

  const getMarkUpForEditingImages = () => {
    return (
      <>
        {images?.length !== 0
          ? images?.map((item, index, array) => {
            const card = (
              <CardImageEditRecipe
                image={item}
                delete={handleRemoveImage}
                update={handleUpdateImage}
                key={index}
                src={item.url ?? URL.createObjectURL(item.image)}
                id={index}
                pk={item.image ? null : item.id}
              />
            );

            if (index === array.length - 1) {
              return (
                <>
                  {card}
                  <label
                    htmlFor="create-images"
                    ref={uploadImageLabel}
                    className={classes.createPencilLabel_type_addImage}
                    onDrop={event => handleDrop(event)}
                    onDragOver={event => handleDragOver(event)}
                    onDragEnter={event => handleDragEnter(event)}
                    onDragLeave={event => handleDragLeave(event)}>
                    <PhotoCameraOutlinedIcon fontSize={'small'} color={'action'} />
                    <p className={classes.createPencilLabel_type_addImage__text}>
                      jpeg, png, webp, tif, less than 50 Mb
                    </p>
                    <p className={classes.createPencilLabel_type_addImage__subtext}>Upload Photo</p>
                  </label>
                  <input
                    type="file"
                    id="create-images"
                    name="create-images"
                    accept="image/*"
                    multiple
                    onChange={handleAddImage}
                    className={classes.createPencilInput_type_addImage}
                  />
                </>
              );
            }

            return card;
          })
          :
          <>
            <label
              htmlFor="create-images"
              ref={uploadImageLabel}
              className={classes.createPencilLabel_type_addImage}
              onDrop={event => handleDrop(event)}
              onDragOver={event => handleDragOver(event)}
              onDragEnter={event => handleDragEnter(event)}
              onDragLeave={event => handleDragLeave(event)}>
              <PhotoCameraOutlinedIcon fontSize={'small'} color={'action'} />
              <p className={classes.createRecipeLabel_type_addImage__text}>
                jpeg, png, webp, tif, less than 50 Mb
              </p>
              <p className={classes.createPencilLabel_type_addImage__subtext}>Upload Photo</p>
            </label>
            <input
              type="file"
              id="create-images"
              name="create-images"
              accept="image/*"
              multiple
              onChange={handleAddImage}
              className={classes.createPencilInput_type_addImage}
            />
          </>}
      </>
    );
  };

  const getMarkUpForUploadedImages = () => {
    return (
      <>
        {images?.length !== 0
          ? images?.map((item, index, array) => {
            const card = (
              <CardImageEditRecipe
                key={index}
                image={item}
                src={item.url ?? URL.createObjectURL(item.image)}
                delete={handleRemoveImage}
                update={handleUpdateImage}
                id={index}
                pk={item?.id}
              />
            );

            if (index === array.length - 1) {
              return <>{card}</>;
            }

            return card;
          })
          : ''}
        <label
          htmlFor="create-images"
          ref={uploadImageLabel}
          className={classes.createPencilLabel_type_addImage}
          onDrop={event => handleDrop(event)}
          onDragOver={event => handleDragOver(event)}
          onDragEnter={event => handleDragEnter(event)}
          onDragLeave={event => handleDragLeave(event)}>
          <PhotoCameraOutlinedIcon fontSize={'small'} color={'action'} />
          <p className={classes.createPencilLabel_type_addImage__text}>jpeg, png, webp, tif, less than 50 Mb</p>
          <p className={classes.createPencilLabel_type_addImage__subtext}>Upload Photo</p>
        </label>
        <input
          type="file"
          id="create-images"
          name="create-images"
          accept="image/*"
          multiple
          onChange={handleAddImage}
          className={classes.createPencilInput_type_addImage}
        />
      </>
    );
  };

  const sortList = e => {
    const imagesData = e.filter(item => !item.filtered).map(item => (item.image ? item.image : item));
    const newData = { ...data, images: imagesData, main_image: imagesData[0] };
    update(newData);
  };

  const handleUpdateImage = (e, id) => {
    if (e.currentTarget?.files?.length !== 0) {
      const newImage = e.currentTarget.files[0];
      const newImageList = data?.images.map((item, index) => {
        return index === id ? newImage : item;
      });
      const newData = { ...data, images: newImageList };
      update(newData);
    }
  };

  function handleRemoveImage(id, pk) {
    if (data?.images?.length === 1) {
      setErrorDeleteImages('Your recipe must have at least one photo');
      return;
    }

    const newImagesList = data?.images.filter((image, index) => index !== id);
    const newData = { ...data, images: newImagesList };

    // Filter for filtering new files
    const newDataWithDelete = isEditing
      ? {...newData, images_to_delete: []}
      : { ...newData, images_to_delete: [...data.images_to_delete, pk].filter(item => item) };

    update(newDataWithDelete);
  }

  return (
    <div className={classes.createPencil__wrapper}>
      <div className={classes.createPencil__header}>
        <h1 className={classes.createPencil__header__title}>Create Chef Pencil</h1>
      </div>
      <form className={classes.createPencil}>
        <div className={classes.createPencilSection}>
          <div>
            <label htmlFor="create-title" className={classes.createPencilLabel}>
              <span style={{ color: 'red' }}>* </span>Title
            </label>
            <NoSsr>
              <TextField
                id="create-title"
                type="text"
                onChange={onChangeField('title')}
                value={data?.title}
                variant="outlined"
                fullWidth
                className={classMarerialUi.textField}
                error={Boolean(error?.title)}
                helperText={error?.title}
                inputProps={{ maxLength: 50 }}
              />
            </NoSsr>
          </div>
        </div>

        <div className={classes.createPencilSection} id="chef-pencil-upload-image">
          <h2 className={!data?.images?.length ? classes.createPencilLabel : classes.createPencilLabel_margin}>
            <span style={{ color: 'red' }}>* </span>Chef Pencil Image
          </h2>
          <div className={classes.createPencilUpload}>
            <ReactSortable
              delayOnTouchOnly={false}
              list={[...images, { id: 'not-draggable', filtered: true, chosen: true }]}
              setList={sortList}
              animation={200}
              filter=".form-create-recipe_createRecipeLabel_type_addImage__17fDT"
              draggable=".card-image_cardImage__yt16O"
              preventOnFilter
              className={classes.createPencilSection__grid_type_cardImages}>
              {isEditing ? getMarkUpForEditingImages() : getMarkUpForUploadedImages()}
            </ReactSortable>
          </div>
          <div className={classes.fieldError}>
            <FieldError errors={error?.images ? error : { images: errorDeleteImages }} path="image" />
          </div>
        </div>

        <h2 className={classes.createPencilLabel}>
          <span style={{ color: 'red' }}>* </span>Description
        </h2>
        <Editor data={data} initText={initData?.html_content} handleChange={onChangeEditorField} />
        <div className={classes.fieldError} id="chef-pencil-editor">
          <FieldError errors={error} path="html_content" />
        </div>
      </form>

      <div className={classes.createPencilbuttonContainer}>
        <button className={classes.createPencilButton} onClick={uploadChefPencilHandler}>
          <p className={classes.createPencilButton__text}>{statusSubmit}</p>
        </button>
        <button className={classes.createPencilButton_color_gray} onClick={() => router.push('/my-pencils')}>
          <p className={classes.createPencilButton__text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}

export default FormCreateChefPencil;
