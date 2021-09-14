import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { NoSsr } from '@material-ui/core';
import dynamic from 'next/dynamic';

import { TextField } from '@material-ui/core';
import FieldError from '../../elements/field-error';
import { CardImageEditRecipe } from '@/components/elements/card';

import { chefPencilUploadActions, modalActions } from '@/store/actions';
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
  const { open } = useActions(modalActions);
  const {update, uploadChefPencil, updateError, updateChefPencil} = useActions(chefPencilUploadActions);

  // For uploading images
  const [isDragging, setIsDragging] = useState(false);
  const uploadImageLabel = useRef();

  useEffect(async () => {
    if (isEditing) {
      update(initData);
      console.log(initData);
      return;
    }

    const newData = {
      ...data,
      title: '',
      html_content: '',
      image: null,
      error: null
    };

    update(newData);
  }, []);

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
      const newData = { ...data, image: e?.dataTransfer?.files[0] };
      update(newData);
    }

    if (!isDragging && e?.currentTarget?.files?.length !== 0) {
      const newData = { ...data, image: e?.currentTarget?.files[0] };
      update(newData);
    }
  };

  const [statusSubmit, setStatusSubmit] = useState('Submit');

  function uploadChefPencilHandler(e) {
    e.preventDefault();
    setStatusSubmit('Loading...');

    if (isEditing) {
      updateChefPencil(data, id)
        .then(data => {
          setStatusSubmit('Submit');
          return dispatch(modalActions.open('uploadSuccessful'));
        })
        .catch(err => {
          handleErrorScroll(err.response.data);
          setStatusSubmit('Submit');
          console.log(err);
        });

      return;
    }

    uploadChefPencil(data)
      .then(data => {
        setStatusSubmit('Submit');
        return dispatch(modalActions.open('uploadSuccessful'));
      })
      .catch(err => {
        handleErrorScroll(err.response.data);
        setStatusSubmit('Submit');
        console.log(err);
      });
  }

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

  return (
    <>
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

        <div className={classes.createPencilSection}>
          <h2 className={!data?.image ? classes.createPencilLabel : classes.createPencilLabel_margin}>
            <span style={{ color: 'red' }}>* </span>Chef Pencil Image
          </h2>
          <div className={classes.createPencilUpload}>
            {data?.image && <CardImageEditRecipe image={data?.image} src={data?.image instanceof File ? URL.createObjectURL(data?.image) : data?.image} />}
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
                <p className={classes.createPencilLabel_type_addImage__text}>jpeg, png, webp, tif, less than 50 Mb</p>
                <p className={classes.createPencilLabel_type_addImage__subtext}>
                  {!data?.image ? 'Upload Photo' : 'Update Photo'}
                </p>
              </label>
              <input
                type="file"
                id="create-images"
                name="create-images"
                accept="image/*"
                onChange={handleAddImage}
                className={classes.createPencilInput_type_addImage}
              />
            </>
          </div>
          <div className={classes.fieldError}>
            <FieldError errors={error} path="image" />
          </div>
        </div>

        <Editor data={data} initText={initData?.html_content} handleChange={onChangeEditorField} />
        <div className={classes.fieldError}>
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
    </>
  );
}

export default FormCreateChefPencil;
