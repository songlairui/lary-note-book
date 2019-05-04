import React, { Component } from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const NOTE_LIST = gql`
  query NoteList {
    notes {
      id
      title
      content
      author {
        email
        name
      }
    }
  }
`

class NoteList extends Component {
  _getLinksToRender(data) {
    return data.notes
  }
  render() {
    return (
      <div className="note-list">
        <Query query={NOTE_LIST} variables={{}}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <span>Loading</span>
            if (error) return <span>error</span>

            const notesToRender = this._getLinksToRender(data)

            return notesToRender.map((item, idx) => (
              <div className="note-item" key={idx}>
                <h3 className="title">{item.title}</h3>
                <small className="author">{item.author.name}</small>
                <p className="content">{item.content}</p>
              </div>
            ))
          }}
        </Query>
      </div>
    )
  }
}

export default NoteList
