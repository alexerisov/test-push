import React, { useState, useEffect } from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from "@/components/layouts/layout-profile-content";
import PropTypes from "prop-types";
import { modalActions } from '@/store/actions';

import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { profileActions, accountActions } from '@/store/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardRoleModels } from '@/components/elements/card';

const StyledTextField = styled(TextField)`
  width: 561px;
    .PrivateNotchedOutline-root-1:hover {
      border-color: #000000;
    }
`;

const StyledAutoTextField = styled(TextField)`
  width: auto;
`;

function FormEditAccountChef (props) {

  if (!props.account.profile) {
    return (<div>loading...</div>);
  }

  const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,18}(\s*)?$/;

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .required('Email is required'),
    full_name: yup
      .string('Enter your Full Name')
      .required('Full Name is required')
      .min(1, 'Full Name should be of minimum 1 characters length')
      .max(80, 'Full Name should be of maximum 80 characters length'),
    phone_number: yup
      .string('Enter your Phone number')
      .matches(phoneRegExp, 'Phone number is not valid')
  });

  const { 
    email,
    full_name,
    phone_number, 
    city,
    language, 
    avatar,
    user_type, 
    bio,
    role_models,
    experience,
    personal_cooking_mission,
    source_of_inspiration,
    cooking_philosophy,
  } = props.account.profile;

  const namesRoleModels = [];
  const avatarsRoleModels = [];

  const [roleModelsArr, setRoleModelsArr] = useState([]);

  useEffect(() => {
    if (role_models) {
      role_models.forEach(function(item) {
      namesRoleModels.push(item.name);
      avatarsRoleModels.push(item.file);
    });
    setRoleModelsArr(role_models);
  }
  }, [role_models])

  const [avatarFile, setAvatarFile] = useState(avatar);
  const [formStatus, setFormStatus] = useState('');
  const [statusSubmit, setStatusSubmit] = useState('Update');

  const formik = useFormik({
    initialValues: {
      email: email,
      full_name: full_name ?? "",
      bio: bio ?? "",
      phone_number: phone_number ?? "",
      city: city ?? "",
      language: language ?? "",
      experience: experience ?? "",
      role_models: namesRoleModels ?? [],
      personal_cooking_mission: personal_cooking_mission ?? [],
      source_of_inspiration: source_of_inspiration ?? [],
      cooking_philosophy: cooking_philosophy ?? [],
      avatar: avatar,
      role_model_images: avatarsRoleModels ?? [],
      role_models_to_delete: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setStatusSubmit('Loading...')
      setFormStatus('')
      values.user_type = user_type;
      console.log(values)
      props.dispatch(profileActions.updateAccountChef(values))
      .then((res) => {
        setStatusSubmit('Update')
        setFormStatus(<span className={classes.profile__formStatus_true}>Successfully sent</span>)
        props.dispatch(accountActions.remind());
      })
      .catch((error) => {
        setStatusSubmit('Update')
        setFormStatus(<span className={classes.profile__formStatus_error}>Error</span>)
        console.log(error);
      })
    },
  });

  const inputRef = React.createRef();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  const handleClickPopupOpenAddRoleModels = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params))
        .then((res) => {
          if (res) {
            const data = roleModelsArr;
            data.push(res)
            setRoleModelsArr(data);
            setValuesRoleModels(data);
          }
        })
    };
  };

  const [cookingPhilosophyArr, setCookingPhilosophyArr] = useState(cooking_philosophy ?? []);
  const [sourceInspirationArr, setSourceInspirationArr] = useState(source_of_inspiration ?? []);
  const [personalCookingMissionArr, setPersonalCookingMissionArrr] = useState(personal_cooking_mission ?? []);

  const handleClickPopupOpenOtherInformations = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params))
        .then((res) => {
          if (res) {
            formik.setFieldValue(res.name, res.data);
            if (res.name === "cooking_philosophy") {
              setCookingPhilosophyArr(res.data);
            }
            if (res.name === "source_of_inspiration") {
              setSourceInspirationArr(res.data);
            }
            if (res.name === "personal_cooking_mission") {
              setPersonalCookingMissionArrr(res.data);
            }
          }
        })
    };
  };

  const resetValuesOtherInformations = (functionSetValues, name) => {
    functionSetValues([]);
    formik.setFieldValue(name, []);
  }

  const roleModelsToDelete = [];

  const onClickDeleteRoleModels = (id, pk) => {
    if (pk) {
      roleModelsToDelete.push(pk);
      formik.setFieldValue("role_models_to_delete", roleModelsToDelete);
    }
    const data = roleModelsArr.filter(function(item, index) {
      return index !== id;
    });
    setRoleModelsArr(data);
    setValuesRoleModels(data);
  }

  const setValuesRoleModels = (data) => {
    const nameArr = [];
    const avatarArr = [];
    data.forEach(function(item) {
      if (item.avatar instanceof File) {
        nameArr.push(item.name);
        avatarArr.push(item.avatar);
      }
    });
    formik.setFieldValue("role_models", nameArr);
    formik.setFieldValue("role_model_images", avatarArr);
  }

  return (
    <ContentLayout>
      <h2 className={classes.profile__title}>Update a New Photo</h2>
      <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
        <div className={classes.profile__formAvatar}>
          <div className={classes.profile__upload} onClick={onClickUpload}>
            { !avatarFile ? <img src="/images/index/default-avatar.png" alt="avatar" className={classes.profile__avatar}/>
            : avatarFile && <img src={avatarFile} alt="avatar" className={classes.profile__avatar}/>}
            <div className={classes.profile__avatarBack} />
          </div>
          <input
              type="file"
              ref={inputRef}
              name="avatar"
              value={formik.avatar}
              hidden
              onChange = {(event) => {
                setAvatarFile(URL.createObjectURL(event.currentTarget.files[0]));
                formik.setFieldValue("avatar", event.currentTarget.files[0]);
              }}
          />
          <label>Profile-pic.jpg</label>
          <div>
            <button type="submit" className={classes.profile__buttonUpdate}>{statusSubmit}</button>
            <p className={classes.profile__formStatus}>{formStatus}</p>
          </div>
        </div>
        <h2 className={classes.profile__title}>Basic Information</h2>
        <div>
          <label className={classes.profile__label}>Full Name</label>
          <StyledTextField
            id="full_name"
            name="full_name"
            value={formik.values.full_name ? formik.values.full_name : ""}
            onChange={formik.handleChange}
            variant="outlined"
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Bio</label>
          <StyledTextField
            multiline
            rows={3}
            id="bio"
            name="bio"
            value={formik.values.bio ? formik.values.bio : ""}
            onChange={formik.handleChange}
            variant="outlined"
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
        </div>
        <div className={classes.profile__container_emailAndPhone}>
          <label className={classes.profile__label}>Email</label>
          <StyledAutoTextField
            disabled
            id="email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <label className={classes.profile__label}>Phone Number</label>
          <StyledAutoTextField
            id="phone_number"
            name="phone_number"
            variant="outlined"
            value={formik.values.phone_number ? formik.values.phone_number : ""}
            onChange={formik.handleChange}
            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            helperText={formik.touched.phone_number && formik.errors.phone_number}
          />
        </div>
        <div className={classes.profile__container_emailAndPhone}>
          <label className={classes.profile__label}>City</label>
          <StyledAutoTextField
            id="city"
            name="city"
            variant="outlined"
            value={formik.values.city ? formik.values.city : ""}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <label className={classes.profile__label}>Language</label>
          <StyledAutoTextField
            id="language"
            name="language"
            variant="outlined"
            value={formik.values.language ? formik.values.language : ""}
            onChange={formik.handleChange}
            error={formik.touched.language && Boolean(formik.errors.language)}
            helperText={formik.touched.language && formik.errors.language}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Work Experience (if any)</label>
          <StyledTextField
            id="experience"
            name="experience"
            value={formik.values.experience ? formik.values.experience : ""}
            onChange={formik.handleChange}
            variant="outlined"
            error={formik.touched.experience && Boolean(formik.errors.experience)}
            helperText={formik.touched.experience && formik.errors.experience}
          />
        </div>
        <div>
          <h2 className={classes.profile__title}>Role Models</h2>
          <div className={classes.profile__container_addRoleModels}>
            {roleModelsArr.map((item, index) => {
              return <CardRoleModels key={index} id={index} pk={item.pk ?? null} delete={onClickDeleteRoleModels} src={item.avatar ?? item.file} title={item.name} />
            })}
            <buuton
              className={classes.profile__button__addRoleModels}
              onClick={handleClickPopupOpenAddRoleModels("addRoleModel")}
            >
              <span className={classes.profile__button__addRoleModels__iconPlus}></span>
              <span>Add more</span>
            </buuton>
          </div>
        </div>
        <div>
          <h2 className={classes.profile__title}>Other Informations</h2>
          <div className={classes.profile__container_otherInformations}>

            {(personalCookingMissionArr.length === 0)
            ? <button
              type="button"
              className={classes.profile__button__otherInformations}
              onClick={
                handleClickPopupOpenOtherInformations(
                  "addOtherInformations",
                  {title: "Add Personal Cooking Mission", nameFormik: "personal_cooking_mission"})
              }
            >
              <span className={classes.profile__button__addRoleModels__iconPlus}></span>
              <span>Personal Cooking Mission</span>
            </button>
            : <div className={classes.profile__otherInformationsCard}>
              <div className={classes.profile__otherInformationsCard__header}>
                <p className={classes.profile__otherInformationsCard__title}>Personal Cooking Mission</p>
                <div>
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonEdit}
                    onClick={
                      handleClickPopupOpenOtherInformations(
                        "addOtherInformations",
                        {title: "Add Personal Cooking Mission",
                        nameFormik: "personal_cooking_mission",
                        values: personalCookingMissionArr})
                    }
                  />
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonDelete}
                    onClick={() => 
                      resetValuesOtherInformations(setPersonalCookingMissionArrr, "personal_cooking_mission")
                    }
                  />
                </div>
              </div>
              <div className={classes.profile__otherInformationsCard__content}>
                <img src="/images/index/PersonalCookingMissionIcon.svg" alt="" className={classes.profile__iconOtherInformations}/>
                <div className={classes.profile__otherInformationsCard__list}>
                  {personalCookingMissionArr.map((item, index) => {
                    return <div key={index}>
                      <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  })}
                </div>
              </div>
            </div>}

            {(sourceInspirationArr.length === 0)
            ? <button
              type="button"
              className={classes.profile__button__otherInformations}
              onClick={
                handleClickPopupOpenOtherInformations(
                  "addOtherInformations",
                  {title: "Add Source Of Inspiration", nameFormik: "source_of_inspiration"})
              }
            >
              <span className={classes.profile__button__addRoleModels__iconPlus}></span>
              <span>Source Of Inspiration</span>
            </button>
            : <div className={classes.profile__otherInformationsCard}>
              <div className={classes.profile__otherInformationsCard__header}>
                <p className={classes.profile__otherInformationsCard__title}>Source Of Inspiration</p>
                <div>
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonEdit}
                    onClick={
                      handleClickPopupOpenOtherInformations(
                        "addOtherInformations",
                        {title: "Add Source Of Inspiration",
                        nameFormik: "source_of_inspiration",
                        values: sourceInspirationArr})
                    }
                  />
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonDelete}
                    onClick={() => 
                      resetValuesOtherInformations(setSourceInspirationArr, "source_of_inspiration")
                    }
                  />
                </div>
              </div>
              <div className={classes.profile__otherInformationsCard__content}>
                <img src="/images/index/SourceInspiration.svg" alt="" className={classes.profile__iconOtherInformations}/>
                <div className={classes.profile__otherInformationsCard__list}>
                  {sourceInspirationArr.map((item, index) => {
                    return <div key={index}>
                      <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  })}
                </div>
              </div>
            </div>}

            {(cookingPhilosophyArr.length === 0)
            ? <button
              type="button"
              className={classes.profile__button__otherInformations}
              onClick={
                handleClickPopupOpenOtherInformations(
                  "addOtherInformations",
                  {title: "Add Cooking Philosophy", nameFormik: "cooking_philosophy"})
              }
            >
              <span className={classes.profile__button__addRoleModels__iconPlus}></span>
              <span>Cooking Philosophy</span>
            </button>
            : <div className={classes.profile__otherInformationsCard}>
              <div className={classes.profile__otherInformationsCard__header}>
                <p className={classes.profile__otherInformationsCard__title}>Cooking Philosophy</p>
                <div>
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonEdit}
                    onClick={
                      handleClickPopupOpenOtherInformations(
                        "addOtherInformations",
                        {title: "Add Cooking Philosophy",
                        nameFormik: "cooking_philosophy",
                        values: cookingPhilosophyArr})
                    }
                  />
                  <button 
                    type="button"
                    className={classes.profile__otherInformationsCard__buttonDelete}
                    onClick={() => 
                      resetValuesOtherInformations(setCookingPhilosophyArr, "cooking_philosophy")
                    }
                  />
                </div>
              </div>
              <div className={classes.profile__otherInformationsCard__content}>
                <img src="/images/index/CookingPhilosophyIcon.svg" alt="" className={classes.profile__iconOtherInformations}/>
                <div className={classes.profile__otherInformationsCard__list}>
                  {cookingPhilosophyArr.map((item, index) => {
                    return <div key={index}>
                      <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                      <span>{item}</span>
                    </div>
                  })}
                </div>
              </div>
            </div>}

          </div>
        </div>
        <div>
          <button type="submit" className={classes.profile__buttonUpdate}>{statusSubmit}</button>
          <p className={classes.profile__formStatus}>{formStatus}</p>
        </div>
      </form>
    </ContentLayout>)
}

FormEditAccountChef.propTypes = {
  account: PropTypes.object.isRequired,
};

export default connect((state => ({
  account: state.account,
})))(FormEditAccountChef);