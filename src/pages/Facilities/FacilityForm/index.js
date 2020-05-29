import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Select } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react'
const Option = Select.Option;
const FormItem = Form.Item;
@inject('areaStore') @observer
class CustomizedForm extends Component {
    constructor(props) {
        super(props);
        this.uuid = 0;
    }

    handleCreate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newdata = {
                    key: toJS(this.props.areaStore.facilities).length + 1,
                    areaid:values.areaid,
                    name: values.name,
                    fStatus: values.fStatus,
                    coordinate: values.coordinate,
                    tags: values.tags,
                }
                console.log(newdata);
                this.props.areaStore.handlefOP(newdata, 'add', this.props.onCancel);
            }
        });
    };
    getInitialKeys() {
        const { tag } = this.props;
        let nextKeys = [];
        for (let i = 0; i < tag.length; i++) {
            nextKeys = nextKeys.concat([this.uuid, this.uuid + 1]);
            this.uuid = this.uuid + 2;
        }
        return nextKeys;
    }
    render() {
        const { visible, onCancel, form, okText, title } = this.props;
        const areas = toJS(this.props.areaStore.areas)
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
                    <FormItem label="名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入设施名称！' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <Form.Item label="所属景区" {...FormItemLayout}>
                        {getFieldDecorator('areaid', {
                            rules: [{ required: true, message: '请选择所属景区！' }],
                        })(
                            <Select
                                showSearch
                                optionFilterProp="children"
                                // onChange={this.onChange}
                                // onFocus={this.onFocus}
                                // onBlur={this.onBlur}
                                // onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    areas.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.id} >{item.name}</Option>
                                        );
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <FormItem label="设施状态" {...FormItemLayout} hasFeedback>
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
                    <Form.Item label="标签"  {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('tags', {
                            rules: [
                                { required: true, message: '请选择设施标签！', type: 'array' },
                            ],
                        })(
                            <Select mode="multiple" >
                                <Option value="休闲">休闲</Option>
                                <Option value="绿化">绿化</Option>
                                <Option value="商超设施">商超设施</Option>
                                <Option value="旅游住宿">旅游住宿</Option>
                            </Select>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const FacilityForm = Form.create()(CustomizedForm);
export default FacilityForm;