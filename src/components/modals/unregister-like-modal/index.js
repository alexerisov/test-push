import React from 'react';
import { LayoutModal } from '@/components/layouts';
import { useActions } from '@/customHooks/useActions';
import { Button } from '@material-ui/core';

const UnregisterActivityModal = props => {
  // Bind Modal action creators with dispatch
  const { open, close } = useActions(modalActions);

  const toRegister = () => {};
  const toLogin = () => {};
  return (
    <LayoutModal>
      <div>
        <h3>Put Your Dishes in the Spotlight!</h3>
        <p>Join Eatchefs and Let Foodies Feast Their Eyes on Your Skills</p>
        <Button variant="contained" color="primary" onClick={toRegister}>
          Become an eatchef
        </Button>
        <Button variant="contained" color="primary" onClick={toLogin}>
          Vote as a foodie
        </Button>
      </div>
    </LayoutModal>
  );
};

export default UnregisterActivityModal;
