import { Button as MantineButton } from '@mantine/core'
import { ButtonProps as MantineButtonProps } from '@mantine/core'

export type ButtonProps = {
  text?: string
  onClick?: () => void
} & MantineButtonProps

export const Button = ({ text, children, ...props }: ButtonProps) => {
  return (
    <>
      {/* my={1} is useful for click animation.
     When Button is placed in a div which has the same height as the button,
     then click animation doesn't cause overflow and scrollbar. */}
      <MantineButton radius="md" my={1} {...props}>
        {children || text}
      </MantineButton>
    </>
  )
}

// const PropsTest = () => {
//   return (
//     <div>
//       <Button
//         text="hej"
//         onClick={() => true}
//         type='button'
//       />
//     </div>
//   )
// }
