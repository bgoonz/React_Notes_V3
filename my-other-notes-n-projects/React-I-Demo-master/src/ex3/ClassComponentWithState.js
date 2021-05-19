import React, { Component } from 'react';

class ClassComponentWithState extends Component {
    constructor() {
        super();

        this.state = {
            aNumber: 8
        };
    }

    render() {
        return (
            <div>{`Here's a thing to render: ${this.state.aNumber}`}</div>
        );
    }
}

export default ClassComponentWithState;

