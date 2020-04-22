import React, {useState, useEffect} from 'react';

import { Row, Col, Form, Input, Button } from 'antd';

const SearchForm = ({ form, setTransForm, searchBtnClick }) => {
  const { getFieldDecorator } = form;
  const [isTransCheck, setIsTransCheck] = useState(true); /* 부모창으로 form Data 넘길때 체크 */

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    colon: false,
  };

  useEffect(() => {
    if (isTransCheck) {
      setTransForm(form);
      setIsTransCheck(false);
    }
  }, [isTransCheck, setTransForm]);

  return (
    <Form {...formItemLayout} className="search-form mb-35">
      <Row gutter={20} type="flex">
        <Col xs={24}>
          <Row gutter={20}>
            <Col xs={14}>
            </Col>
            <Col xs={8} className="text-right">
              <Form.Item {...formItemLayout} label="제목">
                {getFieldDecorator('keyword', {
                  rules: [
                    {
                      required: false,
                      message: '',
                    },
                  ],
                })(
                  <Input
                    defaultValue={''}
                    value={''}
                    onPressEnter={searchBtnClick}
                  />
                )}
              </Form.Item>
            </Col>
            <Col xs={2} className="text-right">
              <Button type="primary" htmlType="submit" className="mt-5" onClick={searchBtnClick}>
                조회
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(SearchForm);
