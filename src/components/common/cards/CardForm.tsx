import React from 'react'

import { Card, CardProps } from './Card'

import { InputSubmit, InputSubmitProps } from '../inputs'

// type FormProps = {
//   className?: string;
//   handleSubmit: () => void;
// }

// type SubmitProps = {
//   text: string;
//   className?: string;
// }

type CardFormProps = {
  title?: string
  children: React.ReactNode
  submitText?: string
  handleSubmit: () => void
  className?: string
  formClassName?: string
  inputsWrapperClassName?: string
  inputSubmitProps?: InputSubmitProps
  inputSubmitWrapperClassname?: string
} & CardProps

export const CardForm: React.FC<CardFormProps> = ({
  title,
  children,
  submitText,
  handleSubmit,
  className = '',
  formClassName = '',
  inputsWrapperClassName = '',
  inputSubmitProps,
  inputSubmitWrapperClassname,

  ...props
}) => {
  return (
    <div className="">
      <Card
        className={`m-auto max-w-3xl ${className}`}
        sx={{ overflow: 'visible' }}
        {...props}
      >
        <form onSubmit={handleSubmit} className={`w-full ${formClassName}`}>
          <div className="text-xl font-semibold">{title}</div>

          <div
            className={`mt-8 mb-10 flex flex-col gap-y-2 ${inputsWrapperClassName}`}
          >
            {children}
          </div>
          <div className={inputSubmitWrapperClassname}>
            <InputSubmit text={submitText} fullWidth {...inputSubmitProps} />
          </div>
        </form>
      </Card>
    </div>
  )
}
