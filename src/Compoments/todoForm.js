import React from 'react'
import { connect } from 'react-redux'
import { newPost } from '../action'
import './todo.css'

class TodoForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const post = {
            id: Math.random(),
            name1: this.state.title
        }
        this.setState({ title: '' })
        this.props.newPost(post)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title: </label> <br />
                        <input type='text' name='title'
                            onChange={this.onChange}
                            value={this.state.title} />
                    </div>
                    <br />
                    <button className ='btn' type='submit'>Submit</button> <br/><br></br>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        posts: state.anyName.items,
        newPost: state.anyName.item
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newPost: user => dispatch(newPost(user))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)