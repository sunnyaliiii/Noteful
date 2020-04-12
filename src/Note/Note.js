import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'

export default class Note extends React.Component {
  static contextType = AppContext;
  
  state = {
    error: null
  }

  handleDelete = async () => {
    try {
      if (this.props.match.params.noteId) {
        await this.context.onDeleteNote(this.props.id)
        this.props.history.push('/')
        this.context.updateNoteState(this.props.id)

      } else {
        await this.context.onDeleteNote(this.props.id)
        this.context.updateNoteState(this.props.id)
      }
    } catch(err) {
      this.setState({error: err.message})
    }
  }

  render() {
      return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleDelete}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
