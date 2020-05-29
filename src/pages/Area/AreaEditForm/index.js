import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Select } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
let id = 0;
const FormItem = Form.Item;
const Option = Select.Option;

@inject('areaStore') @observer
class CustomizedForm extends Component {
    constructor(props) {
        super(props);
    }
    handleCreate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newdata = {
                    key: values.key,
                    id: values.id,
                    name: values.name,
                    fStatus: values.fStatus,
                    coordinate: values.coordinate,
                    location:toJS(this.props.areaStore.areas)[values.key-1].location,
                    tags:toJS(this.props.areaStore.areas)[values.key-1].tags,
                    hot:toJS(this.props.areaStore.areas)[values.key-1].hot,
                }
                console.log(newdata);
                //this.props.areaStore.handleOP(newdata, 'add', this.props.onCancel);
            }
        });
    };
    render() {
        const { visible, onCancel, form, okText, title } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={this.handleCreate}
            >
                <Form layout="horizontal">
                <FormItem label="key" style={{'display':'none'}}>
                        {getFieldDecorator('key')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="id" style={{'display':'none'}}>
                        {getFieldDecorator('id')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入景区名称！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="景区状态" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('fStatus', {
                            rules: [{ required: true, message: '请选择状态！' }],
                        })(
                            <Select >
                                <Option value="正常">正常</Option>
                                <Option value="暂停使用">暂停使用</Option>
                                <Option value="维护中">维护中</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="位置" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('coordinate', {
                            rules: [{ required: true, message: '请输入坐标！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const AreaEditForm = Form.create()(CustomizedForm);
export default AreaEditForm;