
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Breadcrumb} from 'antd';
import _ from 'lodash';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
const { Option } = Select;

const mapStateToProps = state => ({
  userName: state.sessions.user_name,
  userMsg: state.sessions.userMsg
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
class Personal extends Component {
  state = {
    edit: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    return;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentWillMount() {
  }
  handleReset = () => {
    this.setState({edit: false});
    this.props.form.resetFields();
  };
  handleEdit = () => {
    this.setState({edit: true});
  };
  render() {
    const { getFieldDecorator, userMsg } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    console.log('userMsg', userMsg);
    const residences = [
      {
        label: 'username', value: '李真',
      },{
        lable: 'employeeId', value: 'No.12306',
      },{
        lable: 'email', value: 'lizbaby606@163.com',
      },{
        lable: 'phone', value: '17844537359'}
    ];
    console.log(_.filter(residences, function(o) { return o.label === 'username'; })[0].value);
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.edit ? 
          <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
            <Form onSubmit={this.handleSubmit} style={{  maxWidth: 500}}>
              <Form.Item  label="用户名">
                {getFieldDecorator('username', {
                    // initialValue: _.find(residences, ['lable', 'username']).value,
                    rules: [{ required: true, message: '用户名不能为空!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item  label="员工号">
                {getFieldDecorator('employeeId', {
                    rules: [{ required: true, message: '用户名不能为空!' }],
                })(<Input placeholder="注意：此内容只能修改一次"/>)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的邮箱!',
                    },
                    {
                      required: true,
                      message: '邮箱不能为空!',
                    },
                  ],
                })(<Input style={{ maxWidth: 200 }} />)}
              </Form.Item>
              <Form.Item label="电话号码">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '电话号码不能为空!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
              </Form.Item>
              <Row>
                <Col span={24} style={{ textAlign: 'left' }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          :
          <div className="show-wrap" style={{ padding: 24, background: '#fff', minHeight: 360}}>
            <div className="item">用户名: <span>{_.filter(residences, {'lable': 'username'})}</span></div>
            <div className="item">员工号: <span>{_.filter(residences, {'lable': 'username'})}</span></div>
            <div className="item">邮箱: <span>{_.filter(residences, {'lable': 'username'})}</span></div>
            <div className="item">电话号码: <span>{_.filter(residences, {'lable': 'username'})}</span></div>
            <Row>
                <Col span={24} style={{ textAlign: 'left' }}>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleEdit}>
                    编辑
                  </Button>
                </Col>
              </Row>
          </div>
        }
      </div>
    );
  }
}
export default  Form.create()(Personal);