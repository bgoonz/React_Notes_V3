import React, { Component } from 'react';
import Head from 'next/head';
import Note from './Note';
import NotesListStyles from './styles/NotesListStyles';
import withContextValues from '../lib/withContextValues';

class NotesList extends Component {
  componentDidMount() {
    this.props.contextValues.getNotes();
  }
  render() {
    const { notes } = this.props.contextValues.state;
    return (
      <NotesListStyles>
        <Head>
          <title>Notes - {this.props.contextValues.state.notes.length}</title>
        </Head>
        {notes.map((note, i) => <Note key={note._id} note={note} />)}
      </NotesListStyles>
    )
  }
}

export default withContextValues(NotesList);
