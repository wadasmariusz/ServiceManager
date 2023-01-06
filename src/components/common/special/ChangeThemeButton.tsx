import { Menu, useMantineColorScheme } from '@mantine/core'
import { FaRegMoon, ImSun } from 'react-icons/all'

export const ChangeThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Menu.Item
      key={'changeTheme'}
      icon={dark ? <ImSun size={16} /> : <FaRegMoon size={16} />}
      onClick={() => toggleColorScheme()}
    >
      Change theme
    </Menu.Item>
  )
}
