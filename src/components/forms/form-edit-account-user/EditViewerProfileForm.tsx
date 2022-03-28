import React, { useState, useEffect } from 'react';
import s from './EditViewerProfileForm.module.scss';
import { connect } from 'react-redux';

import ContentLayout from '@/components/layouts/layout-profile-content';
import { profileActions, accountActions } from '@/store/actions';
import { validator } from '@/utils/validator';
import { LANGUAGES, nameErrorProfile } from '@/utils/datasets';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FieldError from '@/components/elements/field-error';
import { MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ViewerProfile } from '~types/profile';

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

const StyledInput = styled(Input)`
  display: none;
`;

interface EditViewerProfileFormProps {
  profile: ViewerProfile;
}

const EditViewerProfileForm: React.FC<EditViewerProfileFormProps> = props => {
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
    }
  };

  const { email, full_name, phone_number, city, language, avatar, user_type } = props.profile;

  const [avatarFile, setAvatarFile] = useState<URL>(avatar);
  const [formStatus, setFormStatus] = useState<string | HTMLElement>('');
  const [statusSubmit, setStatusSubmit] = useState(t('submitStatus.update'));

  const formik = useFormik({
    initialValues: {
      email: email,
      full_name: full_name ?? '',
      phone_number: phone_number ?? '',
      city: city ?? '',
      language: language ?? '',
      avatar: avatar
    },
    onSubmit: values => {
      setStatusSubmit(t('submitStatus.loading'));
      setFormStatus('');
      values.user_type = user_type;
      values.phone_number = changePhone;
      props
        .dispatch(profileActions.updateProfileUser(values))
        .then(res => {
          setStatusSubmit(t('submitStatus.update'));
          setFormStatus(<span className={s.profile__formStatus_true}>{t('submitSuccess')}</span>);
          props.dispatch(accountActions.remind());
          router.push(router.asPath, undefined, { locale: LANGUAGES[values.language] });
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

  // scroll to error

  const handleErrorScroll = error => {
    if (error !== null) {
      const elementError = nameErrorProfile.find(item => error[item.nameErrorResponse]);
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
            <div className={s.profile__avatarBack} />
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
          <label className={s.profile__uploadLabel}>Profile-pic.jpg</label>
          <div className={s.profile__buttonUpdate_place_avatar}>
            <button type="submit" className={s.profile__buttonUpdate}>
              {statusSubmit}
            </button>
            <p className={s.profile__formStatus}>{formStatus}</p>
          </div>
        </div>
        <h2 className={s.profile__title}>{t('updateUserInfo')}</h2>
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
        <div>
          <label className={s.profile__label}>{t('cityInput.label')}</label>
          <StyledTextField
            id="city"
            name="city"
            variant="outlined"
            value={formik.values.city ? formik.values.city : ''}
            onChange={formik.handleChange}
            error={Boolean(errorForm?.city)}
            helperText={errorForm?.city}
          />
        </div>
        <div>
          <label className={s.profile__label}>{t('languageInput.label')}</label>
          <StyledSelect
            id="city"
            name="city"
            variant="outlined"
            value={formik.values.city ? formik.values.city : ''}
            onChange={e => {
              onChangeField('city', e);
            }}
            inputProps={{ maxLength: 255 }}
            error={Boolean(errorForm?.city)}
            helperText={errorForm?.city}>
            <MenuItem key={'english'} value={'english'}>
              {'English'}
            </MenuItem>
            <MenuItem key={'dutch'} value={'dutch'}>
              {'Dutch'}
            </MenuItem>
          </StyledSelect>
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

export default connect()(EditViewerProfileForm);
