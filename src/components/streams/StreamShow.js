import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

const StreamShow = (props) => {
  const { id } = props.match.params
  useEffect(() => {
    props.fetchStream(id)
  }, [])

  if (!props.stream) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1> {props.stream.title}</h1>
      <h5> {props.stream.description}</h5>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {
  fetchStream
})(StreamShow)
