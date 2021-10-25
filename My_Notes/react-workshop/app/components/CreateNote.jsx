import React, { Component } from 'react';
import { NoteConsumer } from './NoteProvider';
import ToggleDrawer from './ToggleDrawer';
import Form from './styles/Form';
import FancyButton from './styles/FancyButton';
import CreateNoteDropDown from './styles/CreateNoteDropdown';

class CreateNote extends Component {
  state = {
    title: '',
    content: '',
  }

  saveToState = event => this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event, saveNote) => {
    event.preventDefault();
    saveNote(this.state);
    this.setState({ title: '', content: '' });
  }

  render () {
    return (
      <NoteConsumer>
        {({ state, toggleDrawer, saveNote }) => {
          return (
            <CreateNoteDropDown open={state.drawerOpen}>
              <Form onSubmit={e => this.handleSubmit(e, saveNote)}>
                <label htmlFor="title">
                  <input
                    value={this.state.title}
                    onChange={this.saveToState}
                    required
                    type="text"
                    name="title"
                    id="title"
                  />
                </label>
                <label htmlFor="content">
                  <textarea
                    value={this.state.content}
                    onChange={this.saveToState}
                    required
                    type="text"
                    name="content"
                    id="content"
                  />
                </label>
                <FancyButton type="submit">Save Note</FancyButton>
                <FancyButton type="button" onClick={toggleDrawer}>Close</FancyButton>
              </Form>
            </CreateNoteDropDown>
          )
        }}
      </NoteConsumer>
    );
  }
}

export default CreateNote;
