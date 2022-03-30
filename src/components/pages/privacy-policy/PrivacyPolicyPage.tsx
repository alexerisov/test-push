import React from 'react';
import s from './PrivacyPolicyPage.module.scss';
import LayoutPageNew from '@/components/layouts/layout-page-new';
import { useTranslation } from 'next-i18next';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('privacyPolicy');

  const content = <div className={s.container} dangerouslySetInnerHTML={{ __html: t('privacyPolicy') }} />;

  return <LayoutPageNew content={content} />;
};
