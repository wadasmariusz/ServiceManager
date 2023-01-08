import { Card } from 'components/common/cards/Card'
import React from 'react'
type TAuthFormWrapperProps = {
  children: React.ReactNode
}
export const AuthFormWrapper: React.FC<TAuthFormWrapperProps> = ({
  children,
}) => {
  return (
    <div className="m-auto py-12 sm:w-[400px]">
      <Card>
        <div className="flex w-full flex-col">{children}</div>
      </Card>
    </div>
  )
}
