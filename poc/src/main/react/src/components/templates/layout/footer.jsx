/**
 * 시스템명 : Tamplate Layout > Footer
 * 업무명 :
 * 파일명 : footer.js
 * 작성자 :  문병호
 * 작성일 :  2020.04.16
 *
 * 설  명 :  Tamplate Layout > Footer
 *---------------------------------------------------------------------------------------
 *  변경일     변경자  변경내역
 *---------------------------------------------------------------------------------------
 * 2020.04.16  문병호 최초 프로그램 작성
 *---------------------------------------------------------------------------------------
 */

import React from 'react';
import { Layout } from 'antd';

const Footer = () => {

  return (
    <>
      <Layout.Footer className="footer">
      Copyright © 2020 Ubstory. All Rights Reserved.
      </Layout.Footer>
    </>
  );
};

export default Footer;
