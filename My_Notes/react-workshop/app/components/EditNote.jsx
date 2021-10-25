import React, { Component } from 'react';
import { NoteConsumer } from './NoteProvider';
import Form from './styles/Form';
import FancyButton from './styles/FancyButton';
import Router from 'next/router';

class EditNote extends Component {
  state = {
    title: this.props.note.title,
    content: this.props.note.content,
    _id: this.props.note._id,
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, updateNote) => {
    e.preventDefault();
    updateNote(this.state);
    Router.push(`/`);
  };

  render() {
    return (
      <NoteConsumer>
        {({ updateNote }) => {
          <Form onSubmit={e => this.handleSubmit(e, updateNote)}>
            <label htmlFor="title">
              <input
                value={this.state.title}
                required
                onChange={this.saveToState}
                type="text"
                name="title"
                id="title"
              />
            </label>
            <label htmlFor="content">
              <textarea
                value={this.state.content}
                required
                type="text"
                name="content"
                id="content"
                onChange={this.saveToState}
              />
            </label>

            <FancyButton type="submit">Update Note</FancyButton>
          </Form>
        }}
      </NoteConsumer>
    );
  }
}

export default EditNote;
