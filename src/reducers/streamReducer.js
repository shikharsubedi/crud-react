import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_STREAM:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    case FETCH_STREAMS:
      const responseObject = action.payload.reduce((acc, stream) => {
        acc[stream.id] = { ...stream }
        return acc
      }, {})
      return { ...state, ...responseObject }
    default:
      return state
  }
}
