import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import AppContext from '../AppContext';
import './App.css';
import NotefulApi from '../NotefulService';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
    notefulApi: new NotefulApi()
  };

  async componentDidMount() {
    const {notefulApi} = this.state;

    try {
      const folders = await notefulApi.getFolders()
      const notes = await notefulApi.getNotes()  
      
      this.setState({
        folders,
        notes,
        error: null
      })
    } catch(err) {
      this.setState({error: err.message})
    }
  }

  onDeleteNote = (noteId) => {
    const {notefulApi} = this.state;
    return notefulApi.deleteNote(noteId)
  }

  updateNoteState = (noteId) => {
    console.log('note id: ', noteId)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== Number(noteId))
    })
  }

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} component={NoteListNav}/>
        )}
        <Route path='/note/:noteId' component={NotePageNav}/>
        <Route path='/add-folder' component={NotePageNav}/>
        <Route path='/add-note' component={NotePageNav}/>
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} component={NoteListMain}/>
        )}
        <Route path='/note/:noteId' component={NotePageMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    )
  }

  render() {
    return (
      <AppContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        onDeleteNote: this.onDeleteNote,
        updateNoteState: this.updateNoteState,
        addFolder: this.addFolder,
        addNote: this.addNote
      }}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
