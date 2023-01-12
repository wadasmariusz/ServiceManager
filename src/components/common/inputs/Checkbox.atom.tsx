import React from 'react'
import { Text } from '@mantine/core'

type CheckboxProps = {
  className?: string
  label?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ className, label }) => {
  return (
    <div className={`${className} mr-3 flex`}>
      <input type={'checkbox'} />
      {label && <Text>{label}</Text>}
    </div>
  )
}

export default Checkbox
