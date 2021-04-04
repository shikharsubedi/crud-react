import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

const StreamEdit = (props) => {
  const { id } = props.match.params
  const onSubmit = formValues => {
    props.editStream(id, formValues)
  }
  useEffect(() => {
    props.fetchStream(id)
  }, [])
  if (!props.stream) {
    return (
      <div>
        Loading
      </div>
    )
  }
  return (
    <div>
      <h3>Edit a stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={{
          title: props.stream.title,
          description: props.stream.description
        }}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {
  fetchStream, editStream
})(StreamEdit)

