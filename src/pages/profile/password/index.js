import React from 'react';
import classes from "./index.module.scss";
import LayoutPage from '@/components/layouts/layout-page';
import ContentLayout from "@/components/layouts/layout-profile-content";

const ProfilePassword = () => {

  const content = <>
      <ContentLayout>
        <p></p>
      </ContentLayout>
    </>;

  return (
    <LayoutPage content={content} />
  );
};
  
export default ProfilePassword;