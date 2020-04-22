import React from 'react';
import { Layout } from 'antd';

const GlobalLayout = props => {
  const { children } = props;

  return (
    <>
      <Layout>
        {children}
      </Layout>
    </>
  );
};

export default GlobalLayout;
