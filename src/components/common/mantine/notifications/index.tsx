import { showNotification } from '@mantine/notifications'

import { IoCheckmarkSharp, IoClose } from 'react-icons/io5'

import { Trash, ExclamationMark } from 'tabler-icons-react'

type IconLiterals = 'checkMark' | 'delete' | 'exclamation'

type DefaultNotificationProps = {
  message?: string
  title?: string
  icon?: Omit<React.ReactNode, string> | IconLiterals
}

const mantineNotification = {
  success: (args: DefaultNotificationProps) =>
    showNotification({
      message: args.message || 'Akcja powiodła się',
      title: args.title,
      color: 'green',
      icon:
        typeof args.icon === 'string' ? (
          mapStringToIcon(args.icon as IconLiterals)
        ) : (
          <IoCheckmarkSharp size={20} color="ffffff" />
        ),
    }),

  error: (args: DefaultNotificationProps) =>
    showNotification({
      message: args.message || 'Error. Spróbój ponownie później',
      title: args.title,
      color: 'red',
      icon:
        typeof args.icon === 'string' ? (
          mapStringToIcon(args.icon as IconLiterals)
        ) : (
          <IoClose size={20} color="ffffff" />
        ),
    }),

  default: (args: DefaultNotificationProps) =>
    showNotification({
      message: args.message,
      title: args.title,
      color: 'violet',
    }),
}

export default mantineNotification

const mapStringToIcon = (icon: IconLiterals) => {
  switch (icon) {
    case 'delete':
      return <Trash size={20} color={'#ffffff'} />
    case 'exclamation':
      return <ExclamationMark size={20} color={'#ffffff'} />
    default:
      return <IoCheckmarkSharp size={20} color="#ffffff" />
  }
}
