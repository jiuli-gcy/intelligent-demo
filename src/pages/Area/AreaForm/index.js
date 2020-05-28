import React, { Component } from 'react';
import { Modal, Form, Input, Icon, Button, Select } from 'antd';

let id = 0;
const FormItem = Form.Item;
const Option = Select.Option;

class CustomizedForm extends Component {
    constructor(props) {
        super(props);
        this.uuid = 0;
    }
    componentDidMount() {

    }
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one 
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleCreate = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    };
    getInitialKeys(){
        const {tag} = this.props;
        let nextKeys = [];
        for(let i = 0; i < tag.length; i ++){
            nextKeys = nextKeys.concat([this.uuid, this.uuid + 1]);
            this.uuid = this.uuid + 2;
        }
        return nextKeys;
    }
    render() {
        const { visible, onCancel, form, okText, title } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 5 },
            },
            wrapperCol: {
                sm: { span: 16 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                sm: { span: 16, offset: 5 },
            },
        };
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '景区范围' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`location[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "请输入坐标",
                        },
                    ],
                })(<Input placeholder="景区范围点x,y" style={{ width:'80%', marginRight: 8 }} />)}
                {keys.length > 3 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));

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
                    {formItems}
                    <Form.Item {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> 增加点位
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const AreaForm = Form.create()(CustomizedForm);
export default AreaForm;