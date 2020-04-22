/**
 * 시스템명 :  표준 템플릿
 * 업무명 : -
 * 파일명 : HIRAGrid.jsx
 * @author 김우곤
 * @version 0.1
 * @since  2019.12.16
 * @description  표준 테이블 컴포넌트
 * 무한 스크롤 적용 시 세로 스크롤이 나오도록 테이블의 높이를 조정해야 함
 */

import React, { useState, useEffect } from 'react'; // REACT 기본 및 USESTATE 선언부
import PropsType from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { Spin } from 'antd';

const HIRAGrid = props => {
  // 그리드 import 로딩바
  const [isSpinLoading, setIsSpinLoading] = useState(false);
  const { minHeight, onSetGrid } = props;

  // lifecycle
  useEffect(() => {
    // if (process.browser) {
    //   // eslint-disable-next-line global-require
    //   ReactDataGrid = require('react-data-grid');
    //   setIsSpinLoading(false);
    // }
  }, []);

  return (
    <>
      <Spin spinning={isSpinLoading} tip="Loading...">
        <div className="ant-table-wrapper" style={{ minHeight: `${isSpinLoading ? `${minHeight}px` : '0'}` }} />
      </Spin>
      {ReactDataGrid && (
        <ReactDataGrid
          headerRowHeight={44}
          ref={ref => {
            if (onSetGrid) {
              onSetGrid(ref);
            }
          }}
          {...props}
        />
      )}
    </>
  );
};

HIRAGrid.propTypes = {
  minHeight: PropsType.number,
  onSetGrid: PropsType.func
};

HIRAGrid.defaultProps = {
  minHeight: null,
  onSetGrid: null
};

export default HIRAGrid;
