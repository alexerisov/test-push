import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import s from './LanguageSelector.module.scss';

import FlagUS from '../../../../public/icons/flags/us.svg';
import FlagNL from '../../../../public/icons/flags/nl.svg';
import { IconButton, ListItemIcon, ListItemText, MenuItem, Select } from '@material-ui/core';
import { BasicIcon } from '@/components/basic-elements/basic-icon';
import { useRouter } from 'next/router';
import { LANGUAGES } from '@/utils/datasets';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ITEM_HEIGHT = 24;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  disableScrollLock: true,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
    }
  }
};

export const LanguageSelector = () => {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  // @ts-ignore
  const isAuthorized = useSelector((state: RootState) => state.account?.hasToken);
  // @ts-ignore
  const profileLanguage = useSelector((state: RootState) => state.profile?.language);

  const languageList = [
    {
      value: 'en',
      icon: FlagUS
    },
    {
      value: 'nl',
      icon: FlagNL
    }
  ];

  const [currentLanguage, setCurrentLanguage] = React.useState<string>('nl');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    for (let key in LANGUAGES) {
      if (isAuthorized) {
        if (profileLanguage === LANGUAGES[key]) {
          router.locale = key;
        }
      }
    }
  }, [i18n.language]);

  const onChangeSelect = event => {
    setCurrentLanguage(event.target.value);
    router.push(router.asPath, undefined, { locale: event.target.value });
  };

  const getOptionList = list => {
    return list.map(el => {
      const Icon = el.icon;
      return (
        <MenuItem key={el.value} value={el.value} className={s.menu__item}>
          <ListItemIcon>
            <BasicIcon icon={el.icon} size={'24px'} viewBox={'0 0 640 480'} />
          </ListItemIcon>
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Select
        id="language-selector"
        value={currentLanguage}
        onChange={onChangeSelect}
        className={s.select}
        variant="outlined"
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            className: s.paper
          }
        }}>
        {getOptionList(languageList)}
      </Select>
    </div>
  );
};
