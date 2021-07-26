import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LayoutPage } from "@/components/layouts";
import { loginActions } from '@/store/actions';
import { useRouter } from 'next/router';
import HeaderDefault from "@/components/elements/header-default";

const ConfirmEmail = (props) => {
  const router = useRouter();
  const [response, setResponse] = useState();
  const [code, setCode] = useState();

  const onRedirectToMain = () => {
    router.push({ pathname: "/" });
  };

  useEffect(() => {
    setCode(router.query.code);
  }, [router]);


  useEffect(() => {
    if (code) {
      props.dispatch(
        loginActions.loginWithLink(code),
      ).then((res) => {
        setResponse(res);
        router.push('/');
      }).catch(e => {
        onRedirectToMain();
        console.log('error', e);
      });
    }
  }, [code]);

  const content = (
    <>
      {!response ? <h1>Loading...</h1> :
        <></>
      }
    </>
  );
  return <LayoutPage content={content} header={<HeaderDefault />} />;
};

export default connect()(ConfirmEmail);
