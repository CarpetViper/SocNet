import React from 'react';
import {Field} from 'redux-form';
import {maxLengthCreator} from '../../helpers/validators/validator'


export const FormControl = ({input, meta: {touched, error}, children}) => {

  const hasError = touched && error;
  return (
    <div>
          <div>
              {children}
          </div>
          {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea = (props) => {

  const {input, meta, child, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
  const {input, meta, child, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, name, validator, component, props = {}, text = '') => (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validator}
                   component={component}
                   {...props} /> {text}
        </div>
)
