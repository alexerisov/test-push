import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { connect } from 'react-redux';

import ContentLayout from '@/components/layouts/layout-profile-content';
import { modalActions } from '@/store/actions';
import { profileActions, accountActions } from '@/store/actions';
import { CardRoleModels } from '@/components/elements/card';
import { validator } from '@/utils/validator';
import { nameErrorProfile } from '@/utils/datasets';
import FieldError from '@/components/elements/field-error';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;
function FormEditAccountChef(props) {
  if (!props.account.profile) {
    return <div>loading...</div>;
  }

  const [errorForm, setErrorForm] = useState(null);

  function onChangeField(name, event) {
    const currentLength = event?.target.value.length;
    const newError = {
      ...errorForm,
      [name]: `${validator.getErrorStatusByCheckingLength({
        currentLength,
        ...getMaxLengthOfField(name)
      })}`
    };
    formik.handleChange(event);
    setErrorForm(newError);
  }

  const getMaxLengthOfField = name => {
    switch (name) {
      case 'full_name':
        return { maxLength: 80 };
      case 'city':
        return { maxLength: 255 };
    }
  };

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
    cooking_philosophy
  } = props.account.profile;

  const namesRoleModels = [];
  const avatarsRoleModels = [];

  const [roleModelsArr, setRoleModelsArr] = useState([]);

  useEffect(() => {
    if (role_models) {
      role_models.forEach(function (item) {
        namesRoleModels.push(item.name);
        avatarsRoleModels.push(item.file);
      });
      setRoleModelsArr(role_models);
    }
  }, [role_models]);

  const [avatarFile, setAvatarFile] = useState(avatar);
  const [formStatus, setFormStatus] = useState('');
  const [statusSubmit, setStatusSubmit] = useState('Update');

  const formik = useFormik({
    initialValues: {
      email: email,
      full_name: full_name ?? '',
      bio: bio ?? '',
      phone_number: phone_number ?? '',
      city: city ?? '',
      language: language ?? '',
      experience: experience ?? [],
      role_models: [],
      personal_cooking_mission: personal_cooking_mission ?? [],
      source_of_inspiration: source_of_inspiration ?? [],
      cooking_philosophy: cooking_philosophy ?? [],
      avatar: avatar,
      role_model_images: [],
      role_models_to_delete: []
    },
    // validationSchema: validationSchema,
    onSubmit: values => {
      setStatusSubmit('Loading...');
      setFormStatus('');
      values.user_type = user_type;
      values.phone_number = changePhone;
      props
        .dispatch(profileActions.updateAccountChef(values))
        .then(res => {
          setErrorForm(null);
          formik.setFieldValue('role_models', []);
          formik.setFieldValue('role_model_images', []);
          setStatusSubmit('Update');
          setFormStatus(<span className={classes.profile__formStatus_true}>Successfully sent</span>);
          props.dispatch(accountActions.remind());
        })
        .catch(error => {
          setErrorForm(error.response.data);
          handleErrorScroll(error.response.data);
          setStatusSubmit('Update');
          setFormStatus(<span className={classes.profile__formStatus_error}>Error</span>);
          console.log(error);
        });
    }
  });

  const inputRef = React.createRef();

  const onClickUpload = () => {
    inputRef.current.click();
  };

  const [changePhone, handleChangePhone] = useState(phone_number);

  const handleClickPopupOpenAddRoleModels = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params)).then(res => {
        if (res) {
          const data = roleModelsArr;
          data.push(res);
          setRoleModelsArr(data);
          setValuesRoleModels(data);
        }
      });
    };
  };

  const [cookingPhilosophyArr, setCookingPhilosophyArr] = useState(cooking_philosophy ?? []);
  const [sourceInspirationArr, setSourceInspirationArr] = useState(source_of_inspiration ?? []);
  const [personalCookingMissionArr, setPersonalCookingMissionArrr] = useState(personal_cooking_mission ?? []);

  const handleClickPopupOpenOtherInformations = (name, params) => {
    return () => {
      props.dispatch(modalActions.open(name, params)).then(res => {
        if (res) {
          formik.setFieldValue(res.name, res.data);
          if (res.name === 'cooking_philosophy') {
            setCookingPhilosophyArr(res.data);
          }
          if (res.name === 'source_of_inspiration') {
            setSourceInspirationArr(res.data);
          }
          if (res.name === 'personal_cooking_mission') {
            setPersonalCookingMissionArrr(res.data);
          }
        }
      });
    };
  };

  const resetValuesOtherInformations = (functionSetValues, name) => {
    functionSetValues([]);
    formik.setFieldValue(name, []);
  };

  const [roleModelsToDelete, setRoleModelsToDelete] = useState([]);

  const onClickDeleteRoleModels = (id, pk) => {
    if (pk) {
      const newData = roleModelsToDelete;
      newData.push(pk);
      setRoleModelsToDelete(newData);
      formik.setFieldValue('role_models_to_delete', newData);
    }
    const data = roleModelsArr.filter(function (item, index) {
      return index !== id;
    });
    setRoleModelsArr(data);
    setValuesRoleModels(data);
  };

  const setValuesRoleModels = data => {
    const nameArr = [];
    const avatarArr = [];
    data.forEach(function (item) {
      if (item.avatar instanceof File) {
        nameArr.push(item.name);
        avatarArr.push(item.avatar);
      }
    });
    formik.setFieldValue('role_models', nameArr);
    formik.setFieldValue('role_model_images', avatarArr);
  };

  const [experienceArr, setExperienceArr] = useState(experience ?? []);

  const handleClickPopupOpenaddExperience = name => {
    return () => {
      props.dispatch(modalActions.open(name)).then(res => {
        if (res) {
          const data = experienceArr;
          data.push(res.experience);
          setExperienceArr(data);
          formik.setFieldValue('experience', data);
        }
      });
    };
  };

  const onClickDeleteExperience = id => {
    const data = experienceArr.filter(function (item, index) {
      return index !== id;
    });
    setExperienceArr(data);
    formik.setFieldValue('experience', data);
  };

  // scroll to error

  const handleErrorScroll = error => {
    if (error !== null) {
      const elementError = nameErrorProfile.find(item => error[item.nameErrorResponse]);
      if (elementError?.nameErrorResponse === 'bio') {
        const el = document.querySelector(`textarea[id=${elementError.nameInput}]`);
        scrollToElement(el);
        return;
      }
      if (elementError?.nameErrorResponse === 'avatar') {
        const el = document.querySelector(`div[id=${elementError.nameInput}]`);
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

  return (
    <ContentLayout>
      <h2 className={classes.profile__title}>Update a New Photo</h2>
      <form onSubmit={formik.handleSubmit} className={classes.profile__data}>
        <div className={classes.profile__formAvatar}>
          <div className={classes.profile__upload} onClick={onClickUpload}>
            {!avatarFile ? (
              <img src="/images/index/default-avatar.png" alt="avatar" className={classes.profile__avatar} />
            ) : (
              avatarFile && <img src={avatarFile} alt="avatar" className={classes.profile__avatar} />
            )}
            <div className={classes.profile__avatarBack} id="avatar" />
          </div>
          <input
            type="file"
            ref={inputRef}
            name="avatar"
            value={formik.avatar}
            hidden
            onChange={event => {
              setAvatarFile(URL.createObjectURL(event.currentTarget.files[0]));
              formik.setFieldValue('avatar', event.currentTarget.files[0]);
            }}
          />
          <FieldError errors={errorForm} path="avatar" id="error" />
          <div className={classes.profile__buttonUpdate_place_avatar}>
            <button type="submit" className={classes.profile__buttonUpdate}>
              {statusSubmit}
            </button>
            <p className={classes.profile__formStatus}>{formStatus}</p>
          </div>
        </div>
        <h2 className={classes.profile__title}>Basic Information</h2>
        <div>
          <label className={classes.profile__label}>
            <span style={{ color: 'red' }}>* </span>Full Name
          </label>
          <StyledTextField
            id="full_name"
            name="full_name"
            value={formik.values.full_name ? formik.values.full_name : ''}
            onChange={e => {
              onChangeField('full_name', e);
            }}
            inputProps={{ maxLength: 80 }}
            variant="outlined"
            error={Boolean(errorForm?.full_name)}
            helperText={errorForm?.full_name}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Bio</label>
          <StyledTextField
            multiline
            rows={3}
            id="bio"
            name="bio"
            value={formik.values.bio ? formik.values.bio : ''}
            onChange={formik.handleChange}
            variant="outlined"
            error={Boolean(errorForm?.bio)}
            helperText={errorForm?.bio}
          />
        </div>
        <div>
          <label className={classes.profile__label}>
            <span style={{ color: 'red' }}>* </span>Email
          </label>
          <StyledTextField
            disabled
            id="email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(errorForm?.email)}
            helperText={errorForm?.email}
          />
        </div>
        <div>
          <label className={classes.profile__label}>Phone number</label>
          <PhoneInput
            country="us"
            id="phone_number"
            name="phone_number"
            international
            variant="outlined"
            value={changePhone}
            onChange={handleChangePhone}
            containerClass={classes.profile__inputPhone}
            inputStyle={{
              border: 'none',
              fontSize: '18px',
              color: '#6A6A6A',
              fontFamily: 'Montserrat',
              width: '100%'
            }}
            buttonStyle={{
              border: 'none',
              backgroundColor: '#ffffff'
            }}
          />
          <FieldError errors={errorForm} path="phone_number" id="error" />
        </div>
        <div className={classes.profile__container_emailAndPhone}>
          <div>
            <label className={classes.profile__label}>
              <span style={{ color: 'red' }}>* </span>City
            </label>
            <StyledTextField
              id="city"
              name="city"
              variant="outlined"
              value={formik.values.city ? formik.values.city : ''}
              onChange={e => {
                onChangeField('city', e);
              }}
              inputProps={{ maxLength: 255 }}
              error={Boolean(errorForm?.city)}
              helperText={errorForm?.city}
            />
          </div>
          <div>
            <label className={classes.profile__label}>Language</label>
            <StyledTextField
              id="language"
              name="language"
              variant="outlined"
              value={formik.values.language ? formik.values.language : ''}
              onChange={formik.handleChange}
              error={Boolean(errorForm?.language)}
              helperText={errorForm?.language}
            />
          </div>
        </div>
        <div className={classes.profile__experience}>
          <label className={classes.profile__label}>Work Experience (if any)</label>
          {experienceArr.map((item, index) => {
            return (
              <div className={classes.profile__experience__input} key={index}>
                <p>{item}</p>
                <button
                  className={classes.profile__experience__delete}
                  onClick={() => {
                    onClickDeleteExperience(index);
                  }}></button>
              </div>
            );
          })}
          <button
            className={classes.profile__buttonAddExperience}
            onClick={handleClickPopupOpenaddExperience('addExperience')}>
            Add Experience
          </button>
        </div>
        <div>
          <h2 className={classes.profile__title}>Role Models</h2>
          <div className={classes.profile__container_addRoleModels}>
            {roleModelsArr.map((item, index) => {
              return (
                <CardRoleModels
                  key={index}
                  id={index}
                  pk={item.pk ?? null}
                  delete={onClickDeleteRoleModels}
                  src={item.avatar ?? item.file}
                  title={item.name}
                />
              );
            })}
            <buuton
              className={classes.profile__button__addRoleModels}
              onClick={handleClickPopupOpenAddRoleModels('addRoleModel')}>
              <span className={classes.profile__button__addRoleModels__iconPlus}></span>
              <span>Add more</span>
            </buuton>
          </div>
        </div>
        <div>
          <h2 className={classes.profile__title}>Other Information</h2>
          <div className={classes.profile__container_otherInformations}>
            {personalCookingMissionArr.length === 0 ? (
              <button
                type="button"
                className={classes.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Personal Cooking Mission',
                  nameFormik: 'personal_cooking_mission'
                })}>
                <span className={classes.profile__button__addRoleModels__iconPlus}></span>
                <span>Personal Cooking Mission</span>
              </button>
            ) : (
              <div className={classes.profile__otherInformationsCard}>
                <div className={classes.profile__otherInformationsCard__header}>
                  <p className={classes.profile__otherInformationsCard__title}>Personal Cooking Mission</p>
                  <div className={classes.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Personal Cooking Mission',
                        nameFormik: 'personal_cooking_mission',
                        values: personalCookingMissionArr
                      })}
                    />
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonDelete}
                      onClick={() =>
                        resetValuesOtherInformations(setPersonalCookingMissionArrr, 'personal_cooking_mission')
                      }
                    />
                  </div>
                </div>
                <div className={classes.profile__otherInformationsCard__content}>
                  <img
                    src="/images/index/PersonalCookingMissionIcon.svg"
                    alt=""
                    className={classes.profile__iconOtherInformations}
                  />
                  <div className={classes.profile__otherInformationsCard__list}>
                    {personalCookingMissionArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {sourceInspirationArr.length === 0 ? (
              <button
                type="button"
                className={classes.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Source Of Inspiration',
                  nameFormik: 'source_of_inspiration'
                })}>
                <span className={classes.profile__button__addRoleModels__iconPlus}></span>
                <span>Source Of Inspiration</span>
              </button>
            ) : (
              <div className={classes.profile__otherInformationsCard}>
                <div className={classes.profile__otherInformationsCard__header}>
                  <p className={classes.profile__otherInformationsCard__title}>Source Of Inspiration</p>
                  <div className={classes.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Source Of Inspiration',
                        nameFormik: 'source_of_inspiration',
                        values: sourceInspirationArr
                      })}
                    />
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonDelete}
                      onClick={() => resetValuesOtherInformations(setSourceInspirationArr, 'source_of_inspiration')}
                    />
                  </div>
                </div>
                <div className={classes.profile__otherInformationsCard__content}>
                  <img
                    src="/images/index/SourceInspiration.svg"
                    alt=""
                    className={classes.profile__iconOtherInformations}
                  />
                  <div className={classes.profile__otherInformationsCard__list}>
                    {sourceInspirationArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {cookingPhilosophyArr.length === 0 ? (
              <button
                type="button"
                className={classes.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Cooking Philosophy',
                  nameFormik: 'cooking_philosophy'
                })}>
                <span className={classes.profile__button__addRoleModels__iconPlus}></span>
                <span>Cooking Philosophy</span>
              </button>
            ) : (
              <div className={classes.profile__otherInformationsCard}>
                <div className={classes.profile__otherInformationsCard__header}>
                  <p className={classes.profile__otherInformationsCard__title}>Cooking Philosophy</p>
                  <div className={classes.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Cooking Philosophy',
                        nameFormik: 'cooking_philosophy',
                        values: cookingPhilosophyArr
                      })}
                    />
                    <button
                      type="button"
                      className={classes.profile__otherInformationsCard__buttonDelete}
                      onClick={() => resetValuesOtherInformations(setCookingPhilosophyArr, 'cooking_philosophy')}
                    />
                  </div>
                </div>
                <div className={classes.profile__otherInformationsCard__content}>
                  <img
                    src="/images/index/CookingPhilosophyIcon.svg"
                    alt=""
                    className={classes.profile__iconOtherInformations}
                  />
                  <div className={classes.profile__otherInformationsCard__list}>
                    {cookingPhilosophyArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={classes.profile__otherInformationsCard__listIndex}>{index + 1}</div>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <button type="submit" className={classes.profile__buttonUpdate}>
            {statusSubmit}
          </button>
          <p className={classes.profile__formStatus}>{formStatus}</p>
        </div>
      </form>
    </ContentLayout>
  );
}

FormEditAccountChef.propTypes = {
  account: PropTypes.object.isRequired
};

export default connect(state => ({
  account: state.account
}))(FormEditAccountChef);
