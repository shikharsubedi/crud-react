import React from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          type='text'
          {...input}
          autoComplete='off'       
        />
        {this.renderError(meta)}
      </div>
    )
  }
  renderError = ({ error, touched }) => {
    if(error && touched) {
      return (
        <div className='ui error message'>
          <div className='header'>
            {error}
          </div>
        </div>)
    }
    return null

  }
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render () {
    // console.log('redux form', this.props)
    return (
      <form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field name='description' component={this.renderInput} label='Enter description' />
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }
}
const validate = formValues => {
  const errors = {}
  if(!formValues.title) {
    errors.title = 'Title cannot be empty'
  }
  if(!formValues.description) {
    errors.description = 'Description cannot be empty'
  }
  return errors
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm)
