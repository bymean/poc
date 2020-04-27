import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { Layout, Row, Col, Menu, Icon, Form, Input, Select, Button, DatePicker, Radio, Upload, Spin,message } from 'antd';

import { MailOutlined, AlertTwoTone } from '@ant-design/icons';
import HIRAGrid from '../components/molecules/grid/HIRAGrid';
import SearchForm from '../components/molecules/form/SearchForm';

import Wrapper from '../components/templates/layout/layout';
import Footer from '../components/templates/layout/footer';

import 'react-data-grid/dist/react-data-grid.css';

const GridSample2 = ({form}) => {
  let grid; /* 그리드 선언 */  
  const { getFieldDecorator } = form;
  const GRID_HEIGHT = 440; /* 그리드 높이 */
 // 그리드 데이터 값
 const [gridData, setGridData] = useState([]);
 // 그리드 로딩
 const [gridLoading, setGridLoading] = useState(false);
 // 그리드 시작 여부 판단
 const [isStart, setIsStart] = useState(false);

 const [collapsed, setCollapsed] = useState(false);
 const [searchForm, setSearchForm] = useState({}); /** 검색폼 */
 const [gubun, setgubun] = useState("");
 const [status, setstatus] = useState("");
 const [username, setusername] = useState("");

 const [no, setNo] = useState("");
 const [relNm, setRelNm] = useState("");
 const [famNm, setFamNm] = useState("");
 const [aplTpNm, setAplTpNm] = useState("");
 const [delDd, setDelDd] = useState("");
 const [typeCode, setTypeCode] = useState("");
 const [grd, setGrd] = useState("");
 const [natNm, setNatNm] = useState("");
 const [styAllowNm, setStyAllowNm] = useState("");
 const [regDt, setRegDt] = useState("");
 const [aplDt, setAplDt] = useState("");
 const [styDt, setStyDt] = useState("");
 const [prgStatNm, setPrgStatNm] = useState("");
 


  const { SubMenu } = Menu;
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

  // 그리드 기본 프로퍼티스
  const defaultColumnProperties = {
    resizable: true
  };
  
  // 그리드 ref 세팅
  const handleSetGrid = ref => {
    if (!grid) {
      grid = ref;
    }
  };
  const axiosConfig = {
    headers: {
      //'Content-Type': 'application/json charset=UTF-8'
    }
  };

  // 그리드 데이터 없음 view
  const EmptyRowsView = () => {
    return (
      <div style={{ textAlign: 'center', paddingTop: GRID_HEIGHT / 2 - 70 }}>
        <div className="ant-empty ant-empty-normal">
          <div className="ant-empty-image">
            {/* <img src="../resource/img/img_nodata.svg" alt='no data' /> */}
          </div>
          <p className="ant-empty-description" style={{color:'#fff'}}>조회결과가 없습니다</p>
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
      viewDetail(gridData[rowIdx]);
    }
    catch(e){

    }
  };  

  const columns = [
    { key: 'no', name: 'No', width:80 },
    { key: 'relNm', name: '관계', width:110 },
    { key: 'famNm', name: '가족성명',  width:190 },    
    { key: 'delDd', name: '취득(상실)일',  width:140 },
    { key: 'typeCode', name: '종별부호',  width:120 },
    { key: 'grd', name: '등급', width:110 },
    { key: 'regDt', name: '등록일',  width:140 },
    { key: 'natNm', name: '국적' ,  width:210},
    { key: 'styAllowNm', name: '체류자격',  width:100},
    { key: 'styDt', name: '체류기간', width:140 },
    { key: 'aplDt', name: '신청일자', width:140 },
    { key: 'prgStatNm', name: '진행상태', width:140 }
    ].map(c => ({ ...c, ...defaultColumnProperties }));
  
  //  const rows = [
  //    { : '', 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" },
  //    { id: 1, 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" },
  //    { id: 2, 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" }
  //    ];
  
  const fileInfo = {
    name: 'file',
    multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  const onChgDate = (date, dateString) => {
    console.log(date, dateString);
  }

  const handleSubmit = () => {
    console.log('handleSubmit');
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
     //getList();     
  }, []);
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
  
const rows = [{no : '', relNm : '', famNm: '', aplTpNm: '', delDd: '', typeCode: '', grd: '', natNm: '', styAllowNm: '', styDt: '', prgStatNm:'', regDt: '', aplDt: '' }];

const initForm = () =>{    
  viewDetail(rows[0]);
  setNo("");
  setRelNm("");
  setFamNm("");
  setAplTpNm("");
  setDelDd("");
  setTypeCode("");
  setGrd("");
  setNatNm("");
  setStyAllowNm("");
  setRegDt("");
  setAplDt("");
  setStyDt("");
  setPrgStatNm("");
};
// 목록 조회
  const getList = async () => {
    try {
      handleLoading(true);

      let searchParam;
      let parmKeyword = '';

      try {
        // if (searchForm){search-form mb-35
        //   searchParam = searchForm.getFieldsValue();
        // }

        let { keyword } = searchParam;
        parmKeyword = (keyword === undefined) ? '' : keyword;
      }
      catch(err){

      }
      //alert(Form.getfieldVelue('gubun'));
    
      const params = 'gubun='+gubun+'&status='+status+'&username='+username;      

      const res = await axios.post('http://localhost:8080/poc/singoList.do', params, axiosConfig)      
      .then(res => res)
      .catch(function (error) {
        console.log(error);
      });

      if (res) {
        const {resultList} = res.data;        
        const data = resultList;
    
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


  const setData = async () => {
    try {
      handleLoading(true);      
    
      const params = 'no='+no+'&relNm='+relNm+'&famNm='+famNm+'&aplTpNm='+aplTpNm+'&delDd='+delDd+'&typeCode='+typeCode+'&grd='+grd+'&regDt='+regDt+'&natNm='+natNm+'&styAllowNm='+styAllowNm+'&styDt='+styDt+'&aplDt='+aplDt+'&prgStatNm='+prgStatNm;
      
      //alert(params);

      const res = await axios.post('http://localhost:8080/poc/singoSave.do', params, axiosConfig)      
      .then(res => res)
       .catch(function (error) {
         console.log(error);
       });

      getList();

    } catch(e){
      console.log(e);
    }
    finally{
      handleLoading(false);
    }
  }



  // 그리드 및 버튼 로딩 제어
  const handleLoading = isLoading => {
    setGridLoading(isLoading);
    // setBtnSearchLoading(isLoading);
  };

  const viewDetail = async (dataMap) => {
    handleLoading(true);

    if (dataMap) {     
      form.setFieldsValue(dataMap);
      handleLoading(false);

      //alert(dataMap.no);

       setNo(dataMap.no);
       setRelNm(dataMap.relNm);
       setFamNm(dataMap.famNm);
       setAplTpNm(dataMap.aplTpNm);
       setDelDd(dataMap.delDd);
       setTypeCode(dataMap.typeCode);
       setGrd(dataMap.grd);
       setNatNm(dataMap.natNm);
       setStyAllowNm(dataMap.styAllowNm);
       setRegDt(dataMap.regDt);
       setAplDt(dataMap.aplDt);
       setStyDt(dataMap.styDt);
       setPrgStatNm(dataMap.prgStatNm);
      console.log('data ========>', dataMap);
    }
  }
  
  return (
    <Wrapper>
      <Layout.Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <h1 className="logo">
          <a href="#"><i>s</i><span>SampleGrid</span></a>
        </h1>
        <h2 class="sr-only">네비게이션</h2>
        <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="5">
            <Link to="./sampleBoard">
              <Icon type="user" />
              <span>클라우드 POC</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="./sampleGrid">
              <Icon type="video-camera" />
              <span>출산장려금 신청목록</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="./sampleGrid2">
              <Icon type="video-camera" />
              <span>자격신고내역</span>
            </Link>
          </Menu.Item>
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
        
          <Form {...formItemLayout} className="search-form mb-35">
            <Row gutter={20} type="flex">
              <Col xs={20}>
                <Row gutter={20}>
                  <Col xs={24} md={8}>
                    <Form.Item label="신청구분">
                      {getFieldDecorator('gubun', {
                        rules: [{ required: false, message: '' }],
                      })(
                        <Input type="gubun" name="gubun" value={gubun} onChange={e => setgubun(e.target.value)}/>
                        /*<Select
                          defaultValue="전체"
                          placeholder="전체"
                          type="gubun" name="gubun" value={gubun} onChange={e => setgubun(e.target.value)}
                        >
                          <Select.Option value="전체">전체</Select.Option>
                          <Select.Option value="접수">접수</Select.Option>
                          <Select.Option value="진행중">진행중</Select.Option>
                          <Select.Option value="완료">완료</Select.Option>
                        </Select>,*/
                      )}
                    </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item label="진행상태">
                        {getFieldDecorator('status', {
                          rules: [{ required: false, message: '' }],
                        })(
                          <Input type="status" name="status" value={status} onChange={e => setstatus(e.target.value)}/>
                          /*<Select                            
                            defaultValue="전체"
                            placeholder="전체"                                                       
                            type="status" name="status" value={status} onChange={e => setstatus(e.target.value)}
                          >
                            <Select.Option value="전체">전체</Select.Option>
                            <Select.Option value="접수">접수</Select.Option>
                            <Select.Option value="진행중">진행중</Select.Option>
                            <Select.Option value="완료">완료</Select.Option>
                          </Select>,*/
                        )}
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item {...formItemLayout} label="성명">
                        {getFieldDecorator('username', {
                          rules: [
                            {
                              required: false,
                              message: '',
                            },
                          ],
                        })(
                          <Row gutter={12}>                        
                              <Input type="username" name="username" value={username} onChange={e => setusername(e.target.value)}/>
                          </Row>
                        )}
                      </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className="text-right">
                <Button type="primary" htmlType="submit" className="mt-5" onClick={getList}>
                  조회
                </Button>
              </Col>
            </Row>
          </Form>

          <h3>직장피부양자 자격신고 내역</h3>
          <HIRAGrid
           columns={columns}
           rows={gridData}
           //rowGetter={i => gridData[i]}
           rowsCount={gridData.length}
           minHeight={GRID_HEIGHT}
           onRowClick={onCellSelected}
           enableCellAutoFocus={false}
           emptyRowsView={isStart ? LoadingRowsView : EmptyRowsView}
           onGridSort={(sortColumn, sortDirection) => setGridData(sortRows(gridData, sortColumn, sortDirection))}
          />

          <h3 className="mt-35">직장피부양자 자격신고</h3>
          <Form {...formItemLayout} className="wrap-form">
            <Row gutter={20}>
              <Col xs={24} md={8}>
                <Form.Item label="관계">
                  {getFieldDecorator('relNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="relNm" name="relNm" value={relNm} onChange={e => setRelNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="가족성명">
                  {getFieldDecorator('famNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="famNm" name="famNm" value={famNm} onChange={e => setFamNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="신청구분">
                  {getFieldDecorator('aplTpNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="aplTpNm" name="aplTpNm" value={aplTpNm} onChange={e => setAplTpNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="취득(상실)일">                  
                  {getFieldDecorator('delDd', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input defaultValue="" type="delDd" name="delDd" value={delDd} onChange={e => setDelDd(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="종별부호">
                  {getFieldDecorator('typeCode', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input defaultValue="" type="typeCode" name="typeCode" value={typeCode} onChange={e => setTypeCode(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="등급">
                  {getFieldDecorator('grd', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input defaultValue="" type="grd" name="grd" value={grd} onChange={e => setGrd(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="국적">
                  {getFieldDecorator('natNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="natNm" name="natNm" value={natNm} onChange={e => setNatNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="체류자격">
                  {getFieldDecorator('styAllowNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="styAllowNm" name="styAllowNm" value={styAllowNm} onChange={e => setStyAllowNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="체류기한">
                  {getFieldDecorator('styDt', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="styDt" name="styDt" value={styDt} onChange={e => setStyDt(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="등록일">
                  {getFieldDecorator('regDt', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="regDt" name="regDt" value={regDt} onChange={e => setRegDt(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="신청일자">
                  {getFieldDecorator('aplDt', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="aplDt" name="aplDt" value={aplDt} onChange={e => setAplDt(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="진행상태">
                  {getFieldDecorator('prgStatNm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" type="prgStatNm" name="prgStatNm" value={prgStatNm} onChange={e => setPrgStatNm(e.target.value)}/>,
                  )}
                </Form.Item>
              </Col> 
              {/* <Col xs={24}>
                <Form.Item label="첨부파일" {...OneItemLayout} className="one-item">
                  {getFieldDecorator('filenifo', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Upload.Dragger className="d-block mt-5">
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" /> 파일을 마우스로 끌어놓으세요.
                      </p>
                      <p className="ant-upload-hint">※ 가족관계증명서 필수 첨부(주민등록번호 전체 표시)</p>
                    </Upload.Dragger>,
                  )}
                </Form.Item>
              </Col> */}
              <Col xs={24} className="text-right btn-area pt-20 pr-20">
                {/* <Button type="primary" htmlType="submit">
                  승인요청
                </Button>                 */}
                <Button htmlType="submit" type="add" onClick={initForm}>
                  등록
                </Button>
                {/* <Button type="danger" htmlType="submit" onClick={}>
                  삭제
                </Button> */}
                <Button type="primary" htmlType="submit" onClick={setData}>
                  저장
                </Button>
              </Col>
            </Row>
          </Form>
        </Layout.Content>
        <Footer/>
      </Layout>
    </Wrapper>
  );
}

export default (Form.create()(GridSample2));
