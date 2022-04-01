import React, { useState, useEffect } from 'react';
import s from './EditChefProfileForm.module.scss';
import { connect } from 'react-redux';

import ContentLayout from '@/components/layouts/layout-profile-content';
import { modalActions } from '@/store/actions';
import { profileActions, accountActions } from '@/store/actions';
import { CardRoleModels } from '@/components/elements/card';
import { validator } from '@/utils/validator';
import { LANGUAGES, nameErrorProfile } from '@/utils/datasets';
import FieldError from '@/components/elements/field-error';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChefProfile } from '~types/profile';

const StyledTextField = styled(TextField)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .PrivateNotchedOutline-root-1:hover {
    border-color: #000000;
  }
`;

interface EditChefProfileFormProps {
  profile: ChefProfile;
}

const EditChefProfileForm: React.FC<EditChefProfileFormProps> = props => {
  const router = useRouter();
  const { t, i18n } = useTranslation('profilePage');

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
  } = props.profile;

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
  const [statusSubmit, setStatusSubmit] = useState(t('submitStatus.update'));

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
          setStatusSubmit(t('submitStatus.update'));
          setFormStatus(<span className={s.profile__formStatus_true}>{t('submitSuccess')}</span>);
          router.push(router.asPath, undefined, { locale: LANGUAGES[values.language] });
          props.dispatch(accountActions.remind());
        })
        .catch(error => {
          setErrorForm(error.response.data);
          handleErrorScroll(error.response.data);
          setStatusSubmit(t('submitStatus.update'));
          setFormStatus(<span className={s.profile__formStatus_error}>{t('submitError')}</span>);
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
      <h2 className={s.profile__title}>{t('updatePhoto')}</h2>
      <form onSubmit={formik.handleSubmit} className={s.profile__data}>
        <div className={s.profile__formAvatar}>
          <div className={s.profile__upload} onClick={onClickUpload}>
            {!avatarFile ? (
              <img src="/images/index/default-avatar.png" alt="avatar" className={s.profile__avatar} />
            ) : (
              avatarFile && <img src={avatarFile} alt="avatar" className={s.profile__avatar} />
            )}
            <div className={s.profile__avatarBack} id="avatar" />
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
          <div className={s.profile__buttonUpdate_place_avatar}>
            <button type="submit" className={s.profile__buttonUpdate}>
              {statusSubmit}
            </button>
            <p className={s.profile__formStatus}>{formStatus}</p>
          </div>
        </div>
        <h2 className={s.profile__title}>{t('basicInformation')}</h2>
        <div>
          <label className={s.profile__label}>
            <span style={{ color: 'red' }}>* </span>
            {t('nameInput.label')}
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
          <label className={s.profile__label}>{t('bioInput.label')}</label>
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
          <label className={s.profile__label}>
            <span style={{ color: 'red' }}>* </span>
            {t('emailInput.label')}
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
          <label className={s.profile__label}>{t('phoneInput.label')}</label>
          <PhoneInput
            country="us"
            id="phone_number"
            name="phone_number"
            international
            variant="outlined"
            value={changePhone}
            onChange={handleChangePhone}
            containerClass={s.profile__inputPhone}
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
        <div className={s.profile__container_emailAndPhone}>
          <div>
            <label className={s.profile__label}>
              <span style={{ color: 'red' }}>* </span>
              {t('cityInput.label')}
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
            <label className={s.profile__label}>{t('languageInput.label')}</label>
            <StyledSelect
              id="language"
              name="language"
              variant="outlined"
              MenuProps={{
                disableScrollLock: true
              }}
              value={formik.values.language ? formik.values.language : ''}
              onChange={formik.handleChange}
              error={Boolean(errorForm?.language)}
              helperText={errorForm?.language}>
              <MenuItem key={'english'} value={'english'}>
                {'English'}
              </MenuItem>
              <MenuItem key={'dutch'} value={'dutch'}>
                {'Dutch'}
              </MenuItem>
            </StyledSelect>
          </div>
        </div>
        <div className={s.profile__experience}>
          <label className={s.profile__label}>{t('experience.title')}</label>
          {experienceArr.map((item, index) => {
            return (
              <div className={s.profile__experience__input} key={index}>
                <p>{item}</p>
                <button
                  className={s.profile__experience__delete}
                  onClick={() => {
                    onClickDeleteExperience(index);
                  }}></button>
              </div>
            );
          })}
          <button
            className={s.profile__buttonAddExperience}
            onClick={handleClickPopupOpenaddExperience('addExperience')}>
            {t('experience.button')}
          </button>
        </div>
        <div>
          <h2 className={s.profile__title}>{t('role.title')}</h2>
          <div className={s.profile__container_addRoleModels}>
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
              className={s.profile__button__addRoleModels}
              onClick={handleClickPopupOpenAddRoleModels('addRoleModel')}>
              <span className={s.profile__button__addRoleModels__iconPlus}></span>
              <span style={{ textAlign: 'center' }}>{t('role.button')}</span>
            </buuton>
          </div>
        </div>
        <div>
          <h2 className={s.profile__title}>{t('otherInfo.title')}</h2>
          <div className={s.profile__container_otherInformations}>
            {personalCookingMissionArr.length === 0 ? (
              <button
                type="button"
                className={s.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Personal Cooking Mission',
                  nameFormik: 'personal_cooking_mission'
                })}>
                <span className={s.profile__button__addRoleModels__iconPlus}></span>
                <span>{t('otherInfo.mission')}</span>
              </button>
            ) : (
              <div className={s.profile__otherInformationsCard}>
                <div className={s.profile__otherInformationsCard__header}>
                  <p className={s.profile__otherInformationsCard__title}>{t('otherInfo.mission')}</p>
                  <div className={s.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Personal Cooking Mission',
                        nameFormik: 'personal_cooking_mission',
                        values: personalCookingMissionArr
                      })}
                    />
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonDelete}
                      onClick={() =>
                        resetValuesOtherInformations(setPersonalCookingMissionArrr, 'personal_cooking_mission')
                      }
                    />
                  </div>
                </div>
                <div className={s.profile__otherInformationsCard__content}>
                  <img
                    src="/images/index/PersonalCookingMissionIcon.svg"
                    alt=""
                    className={s.profile__iconOtherInformations}
                  />
                  <div className={s.profile__otherInformationsCard__list}>
                    {personalCookingMissionArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={s.profile__otherInformationsCard__listIndex}>{index + 1}</div>
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
                className={s.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Source Of Inspiration',
                  nameFormik: 'source_of_inspiration'
                })}>
                <span className={s.profile__button__addRoleModels__iconPlus}></span>
                <span>{t('otherInfo.inspiration')}</span>
              </button>
            ) : (
              <div className={s.profile__otherInformationsCard}>
                <div className={s.profile__otherInformationsCard__header}>
                  <p className={s.profile__otherInformationsCard__title}>{t('otherInfo.inspiration')}</p>
                  <div className={s.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Source Of Inspiration',
                        nameFormik: 'source_of_inspiration',
                        values: sourceInspirationArr
                      })}
                    />
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonDelete}
                      onClick={() => resetValuesOtherInformations(setSourceInspirationArr, 'source_of_inspiration')}
                    />
                  </div>
                </div>
                <div className={s.profile__otherInformationsCard__content}>
                  <img src="/images/index/SourceInspiration.svg" alt="" className={s.profile__iconOtherInformations} />
                  <div className={s.profile__otherInformationsCard__list}>
                    {sourceInspirationArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={s.profile__otherInformationsCard__listIndex}>{index + 1}</div>
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
                className={s.profile__button__otherInformations}
                onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                  title: 'Add Cooking Philosophy',
                  nameFormik: 'cooking_philosophy'
                })}>
                <span className={s.profile__button__addRoleModels__iconPlus}></span>
                <span>Cooking Philosophy</span>
              </button>
            ) : (
              <div className={s.profile__otherInformationsCard}>
                <div className={s.profile__otherInformationsCard__header}>
                  <p className={s.profile__otherInformationsCard__title}>{t('otherInfo.philosophy')}</p>
                  <div className={s.profile__otherInformationsCard__buttons}>
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonEdit}
                      onClick={handleClickPopupOpenOtherInformations('addOtherInformations', {
                        title: 'Add Cooking Philosophy',
                        nameFormik: 'cooking_philosophy',
                        values: cookingPhilosophyArr
                      })}
                    />
                    <button
                      type="button"
                      className={s.profile__otherInformationsCard__buttonDelete}
                      onClick={() => resetValuesOtherInformations(setCookingPhilosophyArr, 'cooking_philosophy')}
                    />
                  </div>
                </div>
                <div className={s.profile__otherInformationsCard__content}>
                  <img
                    src="/images/index/CookingPhilosophyIcon.svg"
                    alt=""
                    className={s.profile__iconOtherInformations}
                  />
                  <div className={s.profile__otherInformationsCard__list}>
                    {cookingPhilosophyArr.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className={s.profile__otherInformationsCard__listIndex}>{index + 1}</div>
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
          <button type="submit" className={s.profile__buttonUpdate}>
            {statusSubmit}
          </button>
          <p className={s.profile__formStatus}>{formStatus}</p>
        </div>
      </form>
    </ContentLayout>
  );
};

EditChefProfileForm.propTypes = {
  account: PropTypes.object.isRequired
};

export default connect(state => ({
  account: state.account
}))(EditChefProfileForm);
