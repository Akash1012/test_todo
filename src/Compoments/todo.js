import React from 'react'
import { connect } from 'react-redux'
import { onDelete } from '../action'
import './todo.css'

class Todo extends React.Component {
    render() {
        const data = (
            <table>
                <tr>
                    <th>Todo Task</th>
                    <th></th>
                </tr>

                {this.props.todoData.map(item => (
                    <tr>
                        <td> {item.name1} </td>
                        <td key={item.id} onClick={() => this.props.onDelete(item.id)}>Delete</td>
                    </tr>
                ))}

            </table>
        )

        return (
            <div>
                <h2>Add Your Todo Here --- Use Redux and plain css For Todo</h2>
                {data}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        posts: state.anyName.items,
        todoData: state.anyName.todoData
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => dispatch(onDelete(id))
    };
};




export default connect(mapStateToProps, mapDispatchToProps)(Todo)