import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { Layout, Row, Col, Menu, Icon, Form, Input, Select, Button, DatePicker, Radio, Upload, Spin, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import SearchForm from '../components/molecules/form/SearchForm';
import HIRAGrid from '../components/molecules/grid/HIRAGrid';
// impor addons from 'react-data-grid-addons';
import Wrapper from '../components/templates/layout/layout';
import Footer from '../components/templates/layout/footer';
import 'react-data-grid/dist/react-data-grid.css';

const BoardSample = ({form}) => {
  let grid; /* 그리드 선언 */
  const GRID_HEIGHT = 296; /* 그리드 높이 */
  // 그리드 기본 프로퍼티스
  const defaultColumnProperties = {
    resizable: true
  };

  // 그리드 데이터 값
  const [gridData, setGridData] = useState([]);
  // 그리드 로딩
  const [gridLoading, setGridLoading] = useState(false);
  // 그리드 시작 여부 판단
  const [isStart, setIsStart] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [searchForm, setSearchForm] = useState({}); /** 검색폼 */

  const { getFieldDecorator } = form;
  const { SubMenu } = Menu;
  const { TextArea } = Input;

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    colon: false,
  };
  const OneItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  const TwoItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  // 그리드 로딩 view
  const LoadingRowsView = () => {
    return (
      <div style={{ textAlign: 'center', paddingTop: GRID_HEIGHT / 2 - 40 }}>
        <Spin spinning={gridLoading} isClass={false}>
          {' '}
        </Spin>
      </div>
    );
  };

  // 그리드 데이터 없음 view
  const EmptyRowsView = () => {
    return (
      <div style={{ textAlign: 'center', paddingTop: GRID_HEIGHT / 2 - 70 }}>
        <div className="ant-empty ant-empty-normal">
          <div className="ant-empty-image">
            {/* <img src="../resource/img/img_nodata.svg" alt='no data' /> */}
          </div>
          <p className="ant-empty-description" style={{color:'#fff'}}>no data</p>
        </div>
      </div>
    );
  };
  
  // 그리드 정렬
  // eslint-disable-next-line consistent-return
  const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    try {
      const comparer = (a, b) => {
        if (sortDirection === 'ASC') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        }

        if (sortDirection === 'DESC') {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }

        return 1;
      };
      return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer);
    } catch (err) {
      // sendError(constants.KSD_ERROR.EV, err);
    }
  };
  
  // 그리드 cell 선택 이벤트
  const onCellSelected = (rowIdx) => {
    try {
      // const rows = document.getElementsByClassName('react-grid-Row');
      // rows.forEach(e => e.classList.remove('table-row-selected'));
      // rows[rowIdx].classList.add('table-row-selected');

      // setSecnCd(trim(gridData[rowIdx].secnCd));
      viewDetail(gridData[rowIdx].B_IDX);
    }
    catch(e){

    }
  };

  // 그리드 및 버튼 로딩 제어
  const handleLoading = isLoading => {
    setGridLoading(isLoading);
    // setBtnSearchLoading(isLoading);
  };

  const columns = [
    { 
      key: 'RN', 
      name: 'No', 
      formatter: cell => {
        return <p className="text-center">{`${cell.row.RN}`}</p>;
      },
      width:100
    },
    { 
      key: 'B_IDX', 
      name: 'B_IDX', 
      width:0
    },
    {
      key: 'SUBJECT', 
      name: '제목',
      width: '50%'
    },
    { 
      key: 'WRITER', 
      name: '작성자 ',
      formatter: cell => {
        return <p className="text-center">{`${cell.row.WRITER}`}</p>;
      },
      width:200
    },
    { 
      key: 'WRITE_DATE', 
      name: '작성일자',
      formatter: cell => {
        return <p className="text-center">{`${cell.row.WRITE_DATE}`}</p>;
      },
      width:150
    }
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  // 목록 조회
  const getList = async () => {
    try {
      handleLoading(true);

      // const params = {
      //   menuId : 933,
      //   id : 8,
      //   bcIdx : 0,
      //   page : 1,
      //   // recordCountPerPage: 100,
      //   categoryAllYn : 'Y'
      // }
      let searchParam;
      let parmKeyword = '';

      try {
        if (searchForm){
          searchParam = searchForm.getFieldsValue();
        }

        let { keyword } = searchParam;
        parmKeyword = (keyword === undefined) ? '' : keyword;
      }
      catch(err){

      }

      const params = 'menuId=933&bsIdx=8&page=1&bcIdx=0&searchCondition=SUBJECT&searchKeyword=' + parmKeyword + '&categoryAllYn=Y';

      const res = await axios.post('http://tw.ubstory.co.kr/bbs/ajax/boardList.do', params, axiosConfig)
      // const res = await axios.post('http://eplatapi.ubstory.co.kr:8080/bbs/ajax/boardListTest.do', form, axiosConfig)
      .then(res => res)
      .catch(function (error) {
        console.log(error);
      });

      if (res) {
        const {resultList} = res.data;
        // setGridData(boardList);
        const data = resultList;
        
        // if (data && data.length > 0) {
        //   let no = 1;

        //   data.map(_data => {
        //     const _item = _data;
        //     _item.no = no; // 번호
        //     no += 1;
        //     return _item;
        //   });
        // }

        setGridData(data);

        setIsStart(false);

      }
    } catch(e){
      console.log(e);
    }
    finally{
      handleLoading(false);
    }
  }

  // 상세 조회
  const viewDetail = async (boardIdx) => {
    handleLoading(true);

    const params = 'bsIdx=8&bIdx=' + boardIdx + '&menuId=100';
    const res = await axios.post(`http://tw.ubstory.co.kr/bbs/ajax/boardView.do`, params, axiosConfig)
    if (res) {
      const { result } = res.data;
      // result.REMARK = result.REMARK
      form.setFieldsValue(result);
      handleLoading(false);
      console.log('data ========>', result);
    }
  }

  const handleSubmit = async () => {
    try {
      const body = form.getFieldsValue();
      

      const params = 'menuId=933&bsIdx=8&gno=0&page=1&NOTICE_YN=N&SDATE=&EDATE=&fileIdx=&imgStr=&WRITER=최고관리자' +
                      '&bIdx=' + body.B_IDX + 
                      '&SUBJECT=' + body.SUBJECT + 
                      '&REMARK=' + body.REMARK;

      const aConfig = {
        headers: {
          'Content-Type': 'multipart/form-data;'
        }
      };
    
      const res = await axios.post('http://tw.ubstory.co.kr/bbs/boardWriteProc.do', params, axiosConfig)
      .then(res => res)
      .catch(function (error) {
          console.log(error);
      });

      if (res) {
        getList();
      }
    }
    catch(err){

    }
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Wrapper>
      <Layout.Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <h1 className="logo">
          <a href="#"><i>s</i><span>SampleGrid</span></a>
        </h1>
        <h2 className="sr-only">네비게이션</h2>
        <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="5">
            <Link to="/sampleBoard">
              <Icon type="user" />
              <span>게시판</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/sampleGrid">
              <Icon type="video-camera" />
              <span>자격신고내역</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="7">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <MailOutlined />
                <span>Sub Menu</span>
              </span>
            }
          >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header class="header">
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
        <Layout.Content className="contents">
          <SearchForm setTransForm={form => setSearchForm(form)} searchBtnClick={getList} />
          <h3>게시판 목록</h3>
          <Spin spinning={false} isClass={false}>
          <HIRAGrid
            columns={columns}
            rows={gridData}
            // rowGetter={i => gridData[i]}
            rowsCount={gridData.length}
            minHeight={GRID_HEIGHT}
            onRowClick={onCellSelected}
            enableCellAutoFocus={false}
            emptyRowsView={isStart ? LoadingRowsView : EmptyRowsView}
            onGridSort={(sortColumn, sortDirection) => setGridData(sortRows(gridData, sortColumn, sortDirection))}
          />
          </Spin>

          <h3 className="mt-35">게시판 상세</h3>
          <Spin spinning={gridLoading} isClass={false}>
          <Form {...formItemLayout} className="wrap-form">
            <Row gutter={20}>
              <Col xs={24}>
                <Form.Item label="제목">
                  {getFieldDecorator('SUBJECT', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input placeholder='제목을 입력하세요.' maxLength={50} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="내용">
                  {getFieldDecorator('REMARK', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <TextArea rows={5} />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} className="text-right btn-area pt-20 pr-20">
                <Form.Item>{getFieldDecorator('B_IDX', { initialValue: '' })(<Input type="hidden" />)}</Form.Item>
                <Button htmlType="submit">
                  신규등록
                </Button>
                <Button type="danger" htmlType="submit">
                  삭제
                </Button>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  저장
                </Button>
              </Col>
            </Row>
          </Form>
          </Spin>
        </Layout.Content>
        <Footer/>
      </Layout>
    </Wrapper>
  );
}

export default (Form.create()(BoardSample));
