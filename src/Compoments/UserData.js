import React, { useState } from "react";
import "antd/dist/antd.css";
import './table.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal } from 'antd';
import Loading from "./Loading";



const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([
        {
            key: 1,
            name: 'Akash Gupta',
            email: 'gupta.akash2090@gmail.com',
            number: 'xxx-xxx-xxx'
        },
        {
            key: 2,
            name: 'Gupta',
            email: 'gupta.akash2090@gmail.com',
            number: 'xxx-xxx-xxx'
        }
    ]);
    const [visible, setVisible] = useState(false)
    const [input, SetInput] = useState('')
    const [editingKey, setEditingKey] = useState("");
    const [iconLoading, setIconLoading] = useState(false)

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const deleteItem = record => {
        setData(
            data.filter((todo) => {
                return todo.key !== record.key
            }))
    }

    const addItem = (name) => {
        setIconLoading(true)
        setTimeout(() => {
            let l = name.length
            if (l <= 0) {
                alert("Please Write Name ....")
            } else {
                setData([
                    ...data, {
                        ...name,

                        key: name + Math.floor(Math.random() * 10) + 1
                    }
                ])
            }
            setIconLoading(false)
            setVisible(false)
        }, 2000)
    }

    const cancel = () => {
        setEditingKey("");
    };

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        SetInput([])
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };

    const handleInput = (e) => SetInput({
        ...input,
        [e.target.name]: e.target.value
    })

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            // console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "User Name",
            dataIndex: "name",
            width: "25%",
            editable: true
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "15%",
            editable: true
        },
        {
            title: "Phone Number",
            dataIndex: "number",
            width: "15%",
            editable: true
        },
        {
            title: "Action",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <span
                            to="#"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8
                            }}
                        >
                            Save
            </span>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <span>Cancel</span>
                        </Popconfirm>
                    </span>
                ) : (<React.Fragment>
                    <span className='element' disabled={editingKey !== ""} onClick={() => edit(record)}>
                        Edit
                        </span>
                    {" | "}
                    <span className='element' disabled={editingKey !== ''} onClick={() => deleteItem(record)}>
                        Delete
                        </span>
                </React.Fragment>
                    );
            }
        }
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    const createButton = {
        backgroundColor: 'aquamarine',
        'color': 'black',
        'fontSize': 'bold',
        'marginTop': '50px',
        'marginBottom': '50px',
        'marginRight': '83%',
        'borderRadius': '4px'
    }

    return (
        <React.Fragment >

            <h2>I Use here React Hooks 16.11</h2>
            <Button type="primary" style={createButton} onClick={showModal}>
                Create User
            </Button>


            <Modal
                title="Add User Name And Email ...."
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                className='modal'
            >

                <Form className='modalform'>
                    <Form.Item name="note">
                        Name: <Input onChange={handleInput} name='name' />
                        <br />
                        <br />
                        Email: <Input onChange={handleInput} name='email' />
                        <br />
                        <br />
                        Phone Number: <Input onChange={handleInput} name='number' />
                        <Loading name={input} addItem={addItem} iconLoading={iconLoading} />
                        {/* <Button type="primary" htmlType="submit"
                            style={{ 'marginTop': '20px' }}
                            loading={iconLoading}
                            onClick={addItem.bind(this, input.name, input.email, input.number)}>
                            Click To Add Name<br />
                            <br />
                        </Button> */}
                    </Form.Item>
                </Form>
            </Modal>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell
                        }
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel
                    }}
                />
            </Form>
        </React.Fragment >
    );
};

export default EditableTable
