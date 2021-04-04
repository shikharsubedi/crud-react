import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchStream, deleteStream } from '../../actions'
import Modal from   '../Modal'
import history from '../../history'
import { Link } from 'react-router-dom'

const StreamDelete = (props) => {
  const { id } = props.match.params
  useEffect(() => {
    props.fetchStream(id)
  }, []
  )
  if (!props.stream) {
    history.push('/')
  }

  const onClick = _ => {
    props.deleteStream(id)
  }
  const actions = (
    <>
      <button
        className='ui button negative'
        onClick={onClick}>Delete
      </button>
      <Link to='/' className='ui button'>Cancel</Link>
    </>
  )
  const renderContent = () => {
    if (!props.stream) {
      return 'Loading...'
    }
    return `Are you sure you want to delete the stream with title: ${props.stream.title}`
  }

  return (
    <Modal
      title='Delete Stream'
      content={renderContent()}
      actions={actions}
      onDismiss={_ => history.push('/')}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, {
  fetchStream, deleteStream
})(StreamDelete)

