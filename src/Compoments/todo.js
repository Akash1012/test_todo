import React, { useState } from "react";
import "antd/dist/antd.css";
import './table.css'
import { Table, Input, Popconfirm, Form, Button, Modal, DatePicker } from 'antd';
import { connect } from 'react-redux'
import { newPost, onDelete } from '../action'

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
    const inputNode = inputType === "number" ? <Input /> : <Input />;
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

const Todo = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false)
    const [input, SetInput] = useState('')
    const [editingKey, setEditingKey] = useState("");
    const [iconLoading, setIconLoading] = useState(false)
    const [dateString, setdateString] = useState('')

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
    };

    const deleteItem = record => {
        props.onDelete(record.key)
    }

    const addItem = (name, date) => {
        setIconLoading(true)
        setTimeout(() => {
            if (name === undefined) {
                alert("Please Write Name ....")
            } else {
                const newTodo = {
                    key: name + Math.floor(Math.random() * 10) + 1,
                    name,
                    date
                }

                props.addingNewTodo(newTodo)
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
        alert("Sorry Edit Functionality is not working for now .....")
        setEditingKey("");
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "25%",
            editable: true
        },
        {
            title: "Date",
            dataIndex: "date",
            width: "25%",
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
                inputType: col.dataIndex === "date" ? "number" : "text",
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

    function onChange(date, dateString) {
        setdateString(dateString)
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
                        <DatePicker onChange={onChange} format="DD-MM-YYYY" date='date' />
                        <br />
                        <Button type="primary" htmlType="submit"
                            style={{ 'marginTop': '20px' }}
                            loading={iconLoading}
                            onClick={addItem.bind(this, input.name, dateString)}>
                            Click To Add Name<br />
                            <br />
                        </Button>
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
                    dataSource={props.defaultTodo}
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

const mapStateToProps = (state) => {
    return {
        defaultTodo: state.rootData.todoData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addingNewTodo: todo => dispatch(newPost(todo)),
        onDelete: (id) => dispatch(onDelete(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)