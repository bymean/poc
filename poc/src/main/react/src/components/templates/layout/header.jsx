/**
 * 시스템명 : Tamplate Layout > Header
 * 업무명 :
 * 파일명 : header.js
 * 작성자 :  문병호
 * 작성일 :  2020.04.16
 *
 * 설  명 :  Tamplate  Layout > Header
 *---------------------------------------------------------------------------------------
 *  변경일     변경자  변경내역
 *---------------------------------------------------------------------------------------
 * 2020.04.16  문병호 최초 프로그램 작성
*/
import React, {useState} from 'react';
import { Layout, Icon } from 'antd';

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout.Header className="header">
      <Icon 
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu'}
        // type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggle}
      />
      <div className="etc-menu d-none d-lg-inline-block">
        <span>이 프로그램은 참고용으로 제작한 템플릿입니다.</span>
      </div>
    </Layout.Header>
  );
};

export default Header;
