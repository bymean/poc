import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { Layout, Row, Col, Menu, Icon, Form, Input, Select, Button, DatePicker, Radio, Upload, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import HIRAGrid from '../components/molecules/grid/HIRAGrid';

import Wrapper from '../components/templates/layout/layout';
import Footer from '../components/templates/layout/footer';

import 'react-data-grid/dist/react-data-grid.css';

const GridSample2 = ({form}) => {
  let grid; /* 그리드 선언 */
  const [gridData, setGridData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const { getFieldDecorator } = form;
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

  const columns = [
    { key: '1', name: 'No' },
    { key: '2', name: '관계' },
    { key: '3', name: '가족성명' },
    { key: '4', name: '신청구분' },
    { key: '5', name: '취득(상실)일' },
    { key: '6', name: '종별부호' },
    { key: '7', name: '등급' },
    { key: '8', name: '등록일' },
    { key: '9', name: '국적' },
    { key: '10', name: '체류자격' },
    { key: '11', name: '체류기간' },
    { key: '12', name: '신청일자' },
    { key: '13', name: '진행상태' }
    ].map(c => ({ ...c, ...defaultColumnProperties }));
  
  const rows = [
    { id: 0, 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" },
    { id: 1, 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" },
    { id: 2, 1: "3", 2: "부", 3: "홍길동", 4: "-", 5: "2019-10-01", 6: 20012, 7: 5, 8: "2013-02-05", 9: "독일", 10: "F-6-2", 11: "2022-02-22", 12: "2019-02-22", 13: "완료" }
    ];
  
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
    // getList();
  }, []);

  return (
    <Wrapper>
      <Layout.Sider className="sider" trigger={null} collapsible collapsed={collapsed}>
        <h1 className="logo">
          <a href="#"><i>s</i><span>SampleGrid</span></a>
        </h1>
        <h2 class="sr-only">네비게이션</h2>
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
              <span>출산장려금 신청목록</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/sampleGrid2">
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
                        <Select
                          defaultValue="1"
                          placeholder="전체"
                        >
                          <Select.Option value="1">전체</Select.Option>
                          <Select.Option value="2">접수</Select.Option>
                          <Select.Option value="3">진행중</Select.Option>
                          <Select.Option value="4">완료</Select.Option>
                        </Select>,
                      )}
                    </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item label="진행상태">
                        {getFieldDecorator('status', {
                          rules: [{ required: false, message: '' }],
                        })(
                          <Select
                            defaultValue="1"
                            placeholder="전체"
                          >
                            <Select.Option value="1">전체</Select.Option>
                            <Select.Option value="2">접수</Select.Option>
                            <Select.Option value="3">진행중</Select.Option>
                            <Select.Option value="4">완료</Select.Option>
                          </Select>,
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
                            <Col xs={10}>
                              <Input.Search
                                // placeholder="input search text" 
                                defaultValue=""
                                onSearch={value => console.log(value)}
                              />
                            </Col>
                            <Col xs={14}>
                              <Input defaultValue="" />
                            </Col>
                          </Row>
                        )}
                      </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={4} className="text-right">
                <Button type="primary" htmlType="submit" className="mt-5">
                  조회
                </Button>
              </Col>
            </Row>
          </Form>

          <h3>직장피부양자 자격신고 내역</h3>
          <HIRAGrid
            columns={columns}
            rows={rows}
            rowsCount={rows.length}
            onSetGrid={handleSetGrid}
          />

          <h3 className="mt-35">직장피부양자 자격신고</h3>
          <Form {...formItemLayout} className="wrap-form">
            <Row gutter={20}>
              <Col xs={24} md={8}>
                <Form.Item label="성명">
                  {getFieldDecorator('name', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="부서명">
                  {getFieldDecorator('dept', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input defaultValue="" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="진행상태">
                  {getFieldDecorator('status', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Select
                      defaultValue="1"
                      placeholder="전체"
                    >
                      <Select.Option value="1">전체</Select.Option>
                      <Select.Option value="2">접수</Select.Option>
                      <Select.Option value="3">진행중</Select.Option>
                      <Select.Option value="4">완료</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="신청구분">
                  {getFieldDecorator('reqGubun', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Select
                      // onChange={this.handleSelectChange}
                      defaultValue="1"
                      placeholder="전체"
                    >
                      <Select.Option value="1">전체</Select.Option>
                      <Select.Option value="2">접수</Select.Option>
                      <Select.Option value="3">진행중</Select.Option>
                      <Select.Option value="4">완료</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="관계">
                  {getFieldDecorator('relation', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Select
                      defaultValue="1"
                      placeholder="전체"
                    >
                      <Select.Option value="1">전체</Select.Option>
                      <Select.Option value="2">접수</Select.Option>
                      <Select.Option value="3">진행중</Select.Option>
                      <Select.Option value="4">완료</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="가족성명">
                  {getFieldDecorator('familyName', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Input defaultValue="" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="장애 및 유공자 여부">
                  {getFieldDecorator('gubun', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Select
                      defaultValue="1"
                      placeholder="전체"
                    >
                      <Select.Option value="1">전체</Select.Option>
                      <Select.Option value="2">접수</Select.Option>
                      <Select.Option value="3">진행중</Select.Option>
                      <Select.Option value="4">완료</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="종별부호/등급">
                  {getFieldDecorator('grade', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Row gutter={8}>
                      <Col span={12}>
                        <Select
                          defaultValue=""
                          placeholder=""
                        >
                          <Select.Option value="1">전체</Select.Option>
                          <Select.Option value="2">접수</Select.Option>
                          <Select.Option value="3">진행중</Select.Option>
                          <Select.Option value="4">완료</Select.Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        <Select
                          defaultValue=""
                          placeholder=""
                        >
                          <Select.Option value="1">전체</Select.Option>
                          <Select.Option value="2">접수</Select.Option>
                          <Select.Option value="3">진행중</Select.Option>
                          <Select.Option value="4">완료</Select.Option>
                        </Select>
                      </Col>
                    </Row>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="등록일">
                  {getFieldDecorator('regDate', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <DatePicker />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="외국인여부">
                  {getFieldDecorator('foreigner', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Select
                      defaultValue=""
                      placeholder=""
                    >
                      <Select.Option value="1">Y</Select.Option>
                      <Select.Option value="2">N</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="국적">
                  {getFieldDecorator('nation', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Select
                      defaultValue=""
                      placeholder=""
                    >
                      <Select.Option value="1">Y</Select.Option>
                      <Select.Option value="2">N</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="체류자격/기간">
                  {getFieldDecorator('term', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Row gutter={8}>
                      <Col span={12}>
                        <Input defaultValue="" />
                      </Col>
                      <Col span={12}>
                        <Input defaultValue="" />
                      </Col>
                    </Row>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item label="신청일자/취득(상실)일">
                  {getFieldDecorator('accept', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Row gutter={8}>
                      <Col span={12}>
                        <DatePicker  />
                      </Col>
                      <Col span={12}>
                        <DatePicker  />
                      </Col>
                    </Row>,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={16}>
                <Form.Item label="승인일자" {...TwoItemLayout}>
                  {getFieldDecorator('confirm', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <DatePicker  />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="반려사유" {...OneItemLayout} className="one-item">
                  {getFieldDecorator('denine', {
                    rules: [{ required: false, message: '' }],
                  })(
                    <Input.TextArea placeholder="반려사유를 입력해주세요." autoSize />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={24}>
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
              </Col>
              <Col xs={24} className="text-right btn-area pt-20 pr-20">
                <Button type="primary" htmlType="submit">
                  승인요청
                </Button>
                <Button htmlType="submit">
                  등록
                </Button>
                <Button type="danger" htmlType="submit">
                  삭제
                </Button>
                <Button type="primary" htmlType="submit">
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
