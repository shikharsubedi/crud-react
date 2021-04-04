import React, { useEffect } from 'react'
import { fetchStreams } from '../../actions/index'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => {
    fetchStreams()
  }, [])
  const renderAdmin = (stream) => {
    if (currentUserId && stream.userId === currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete!</Link>
        </div>
      )
    }
  }
  const renderList = () => streams.map(stream => {
    return (
      <div className='item' key={stream.id}>
        {renderAdmin(stream)}
        <i className='large middle aligned icon camera' />
        <div className='content'>
          <Link to={`/streams/${stream.id}`} className='header'> {stream.title}</Link>          <div className='description'>{stream.description}</div>
        </div>
      </div>
    )
  })
  
  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Streams</h2>
      <div className='ui celled list'>{renderList()}</div>
      {renderCreate()}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, {
  fetchStreams
})(StreamList)
