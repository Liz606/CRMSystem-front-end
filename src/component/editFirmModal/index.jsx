import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Modal, Form, Input, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  firmsList: state.firm.firmsList
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class EditFirmModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const seriesData =  Object.assign({}, {
        companyName: values.firmName,
        companyCategory: values.category,
        startDate: moment(values.createDate).format(yearFormat),
        expireDate: moment(values.expireDate).format(yearFormat),
        contactorName: values.contact,
        status: values.status,
        info: values.remark,
        phoneNumber: values.tel,
        qq: values.qq,
        employeeName: values.employeeName,
        province: values.province,
        gender: values.gender,
        email: values.email,
      });
      if (dataSource) { // 如果datasource是null，说明是新建客户
        seriesData.key = dataSource.key;
        this.props.updateFormData(seriesData); // 提交新数据
      } else {
        console.log('我是新企业', seriesData);
        this.props.addNewFormData(seriesData); // 提交新数据
      }
    });
    this.props.form.resetFields();
    // 提交成功，关闭模态框
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.props;
    // console.log(dataSource, 'wrapEditFirmModal');
    return (
      <div>
        <Modal
          title={dataSource ? "添加企业客户" : "修改企业客户"}
          width={820}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" form="formBox" onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <div className="container">
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Form id="formBox" onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="获得客户时间：">
                      {getFieldDecorator('createDate', {
                        initialValue: dataSource ? moment(dataSource.createDate) : moment(),
                        rules: [{ required: true, message: '请输入获得客户时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="负责人：">
                      {getFieldDecorator('employeeName', {
                        initialValue: 'Liz',
                      })(<Input  style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>

                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="企业名称：">
                      {getFieldDecorator('firmName', {
                        initialValue: dataSource ? dataSource.firmName : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="到期时间：">
                      {getFieldDecorator('expireDate', {
                        initialValue: dataSource ? moment(dataSource.expireDate) : moment(),
                        rules: [{ required: true, message: '客户到期时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="客户状态：">
                      {getFieldDecorator('status', {
                        initialValue: dataSource ? dataSource.status : 1
                      })(
                        <Select style={{ width: 120 }}>
                          <Select.Option value={1}>潜在客户</Select.Option>
                          <Select.Option value={2}>意向客户</Select.Option>
                          <Select.Option value={3}>成交客户</Select.Option>
                          <Select.Option value={4}>失败客户</Select.Option>
                          <Select.Option value={5}>已流失客户</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="所在城市：">
                      {getFieldDecorator('province', {
                        initialValue: dataSource ? dataSource.province : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="公司类别：">
                      {getFieldDecorator('category', {
                        initialValue: dataSource ? dataSource.category : 1
                      })(
                        <Select style={{ width: 120 }}>
                          <Select.Option value={1}>建筑业</Select.Option>
                          <Select.Option value={2}>农林牧渔</Select.Option>
                          <Select.Option value={3}>住宿餐饮</Select.Option>
                          <Select.Option value={4}>IT</Select.Option>
                          <Select.Option value={5}>金融业</Select.Option>
                          <Select.Option value={6}>房地产</Select.Option>
                          <Select.Option value={7}>政府机关</Select.Option>
                          <Select.Option value={8}>文体传媒</Select.Option>
                          <Select.Option value={9}>运输物流</Select.Option>
                          <Select.Option value={10}>商业服务</Select.Option>
                          <Select.Option value={11}>卫生医疗</Select.Option>
                          <Select.Option value={12}>教育培训</Select.Option>
                          <Select.Option value={13}>其他</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12} className="marker">
                    <Form.Item label="备注：">
                      {getFieldDecorator('remark', {
                        initialValue: dataSource ? dataSource.remark : null,
                      })(<TextArea placeholder="textarea with clear icon" rows={4}/>)}
                    </Form.Item>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="联系人：">
                      {getFieldDecorator('contact', {
                        initialValue: dataSource ? dataSource.contact : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="手机号：">
                      {getFieldDecorator('tel', {
                        initialValue: dataSource ? dataSource.tel : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="职务：">
                      {getFieldDecorator('position', {
                        initialValue: dataSource ? dataSource.position : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="QQ：">
                      {getFieldDecorator('qq', {
                        initialValue: dataSource ? dataSource.qq : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="性别：">
                      {getFieldDecorator('gender', {
                        initialValue: dataSource ? dataSource.gender : 1
                      })(
                        <Radio.Group onChange={this.onChangeGenders} >
                          <Radio value={1}>女</Radio>
                          <Radio value={2}>男</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="邮箱：">
                      {getFieldDecorator('email', {
                        initialValue: dataSource ? dataSource.email : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const wrapEditFirmModal = Form.create()(EditFirmModal);

export default wrapEditFirmModal;