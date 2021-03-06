import React, { Component } from 'react';
import { Modal, Form, Button, Timeline, TimePicker, DatePicker, Select, Row, Col, Input, Divider } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { addNewClientRecord } from '../../actions/client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  oneClientRecord: state.client.oneClientRecord,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewClientRecord
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class AddClientRecordModal extends Component {
  state = {
    visible: false,
    editBox: false,
    recorderDate: "",
    recorderHour: ""
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      editBox: false,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleEditBox = (e) => {
    e.preventDefault();
    if (!this.state.editBox) {
      this.setState({
        editBox: true,
      });
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        const data = Object.assign({}, {
          createDate: `${moment(values.recordTimeDay).format(yearFormat)} ${moment(values.recordTimeHour).format(hourFormat)}`,
          resourceId: this.props.dataSource.clientId,
          status: values.status,
          content: values.recordContent
        });
        this.props.addNewClientRecord(data);
      });
      this.setState({
        editBox: false,
      });
    }
  }
  getStatus(text) {
    if (text === 1) {
      return "潜在";
    } else if (text === 2) {
      return "意向";
    } else if (text === 3) {
      return "成交";
    } else if (text === 4) {
      return "失败";
    } else if (text === 5) {
      return "已流失";
    }
  }
  getStatusColor(text) {
    if (text === 1) {
      return "orange";
    } else if (text === 2) {
      return "blue";
    } else if (text === 3) {
      return "green";
    } else if (text === 4) {
      return "red";
    } else if (text === 5) {
      return "gray";
    }
  }
  render() {
    const { editBox } = this.state;
    const { oneClientRecord, dataSource } = this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log(oneClientRecord, dataSource, 'AddClientRecordModal');
    return (
      <Modal
        title="个人跟进记录"
        width={820}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            关闭
          </Button>
        ]}
      >
        <div className="container">
          <Button type="primary" htmlType="submit" form="formBox" onClick={this.handleEditBox}>{editBox ? '提交' : '写跟进'}</Button>
          {editBox ?
            <div>
              <Form id="formBox" onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="跟进时间：">
                      {getFieldDecorator('recordTimeDay', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入跟进时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                    <Form.Item style={{ position: 'absolute', right: '75px', top: '39px' }}>
                      {getFieldDecorator('recordTimeHour', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入跟进时间。' }],
                      })(<TimePicker />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="客户状态：">
                      {getFieldDecorator('status', {
                        initialValue: dataSource.status // 获取当前客户的状态
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
                </Row>
                <Row>
                  <Form.Item label="跟进结果：">
                    {getFieldDecorator('recordContent', {
                    })(<TextArea placeholder="textarea with clear icon" rows={4} />)}
                  </Form.Item>
                </Row>
              </Form>
            </div>
            : null}
          <hr />
          <Timeline style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {oneClientRecord ? oneClientRecord.map(item =>
              <Timeline.Item color={this.getStatusColor(item.status)} key={`hd-${item.key ? item.key : Math.random()}`}>
                {item.content} {moment(item.createDate).format('YYYY/MM/DD HH:mm')} {item.employeeName} --- {this.getStatus(item.status)}
              </Timeline.Item>) :
              "NO DATA"}
          </Timeline>
        </div>
      </Modal>
    );
  }
}

const wrapAddClientRecordModal = Form.create()(AddClientRecordModal);

export default wrapAddClientRecordModal;