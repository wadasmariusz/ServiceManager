import { useMantineTheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Text } from 'components/common/mantine/Text'

type TAuthFormLinkProps = {
  label?: string
  to: string
  linkText: string
  className?: string
}
export const AuthFormLink: React.FC<TAuthFormLinkProps> = ({
  label,
  to,
  linkText,
  className,
}) => {
  const theme = useMantineTheme()
  return (
    <span
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`flex-gap-2 flex flex-wrap justify-center text-center ${className}`}
    >
      <Text>{label}</Text>
      <Link to={to} className={'ml-2'}>
        <Text
          color={theme.fn.primaryColor()}
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          {linkText}
        </Text>
      </Link>
    </span>
  )
}
