import React, { Component } from 'react'
import { Button } from 'antd';


class Loading extends Component {
    state = {
        iconLoading: false
    }

    render() {
        return (
            <Button type="primary" htmlType="submit"
                style={{ 'marginTop': '20px' }}
                loading={this.props.iconLoading}
                onClick={this.props.addItem.bind(this, this.props.name)}>
                Click To Add Name<br />
                <br />
            </Button>
        )
    }
}

export default Loading