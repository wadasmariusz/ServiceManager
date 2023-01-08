import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useNavigateSearch } from 'app/hooks/useNavigateSearch'

import { createStyles } from '@mantine/core'
import { NavLink, Navbar, NavbarProps, Group } from '@mantine/core'

import { TSideNavItem } from 'app/config/sideNavigationConfig'

import { Logo } from 'components/common/special/Logo'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,

        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },

    navLinkChildren: {
      marginLeft: 28,
      paddingLeft: 12,
      borderLeft: `1px solid ${
        theme.colorScheme === 'light'
          ? theme.colors.gray[3]
          : theme.colors.dark[7]
      }`,
    },
  }
})

type LinksGroupProps = {
  navItem: TSideNavItem
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

const LinksGroup = ({ navItem, active, setActive }: LinksGroupProps) => {
  const { classes, cx } = useStyles()

  const navigate = useNavigate()
  const navigateSearch = useNavigateSearch()

  //return nested links
  if (navItem.routes) {
    return (
      <>
        <NavLink
          label={navItem.label}
          icon={navItem?.icon ? navItem.icon({ size: 24 }) : null}
          className={cx(classes.link)}
          classNames={{
            icon: classes.linkIcon,
            children: classes.navLinkChildren,
          }}
        >
          {navItem.routes.map((item) => (
            <a
              className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
              })}
              href={item.route as string}
              key={item.label}
              onClick={(event) => {
                event.preventDefault()
                setActive(item.label)

                if (item.config?.navigateWithSearch)
                  navigateSearch(item.route as string)
                else navigate(item.route)
              }}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </NavLink>
      </>
    )
  }

  //return link
  return (
    <>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: navItem.label === active,
        })}
        href={navItem.route as string}
        key={navItem.label}
        onClick={(event) => {
          event.preventDefault()
          setActive(navItem.label)
          if (navItem.config?.navigateWithSearch)
            navigateSearch(navItem.route as string)
          else navigate(navItem.route as string)
        }}
      >
        {navItem?.icon
          ? navItem.icon({ className: classes.linkIcon, size: 24 })
          : null}
        <span>{navItem.label}</span>
      </a>
    </>
  )
}

type MantineNavbarProps = {
  navConfig: TSideNavItem[]
} & Omit<NavbarProps, 'children' | 'width'>

export function MantineNavbar({ navConfig, ...props }: MantineNavbarProps) {
  const { classes } = useStyles()
  const { pathname } = useLocation()

  const [active, setActive] = useState('')

  const links = navConfig.map((navItem) => (
    <LinksGroup
      key={navItem.id}
      navItem={navItem}
      active={active}
      setActive={setActive}
    />
  ))

  useEffect(() => {
    navConfig?.map((item) => {
      //handle acteve nested route
      if (item.routes) {
        item.routes.map((item) => {
          if (pathname.includes(item.route as string)) {
            setActive(item.label)
            return
          }
        })
      } else {
        //handle active route
        if (pathname.includes(item.route as string)) {
          setActive(item.label)
          return
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <Navbar py="md" px={'xs'} {...props} height="100%">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <Logo />
          </Group>
          {links}
        </Navbar.Section>
      </Navbar>
    </>
  )
}

type SideNavigationProps = {
  width: string
  hidden: boolean
  navConfig: TSideNavItem[]
  toggleNav: () => void
} & MantineNavbarProps

export const SideNavigation = ({
  width,
  hidden,
  navConfig,
  toggleNav,
  ...props
}: SideNavigationProps) => {
  return (
    <>
      {/* side navbar backdrop */}
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`fade-transition fixed top-0 left-0 z-[75] h-full w-full bg-[rgba(0,0,0,.4)] duration-300 lg:hidden ${
          hidden ? 'invisible opacity-0' : 'opacity-1 visible'
        }`}
        onClick={toggleNav}
      ></div>

      {/* side navbar wrapper*/}
      <div
        className={`${width} fixed top-0 left-0 z-[100] h-screen transition-transform duration-300 lg:translate-x-0
          ${hidden ? ' -translate-x-full' : ' translate-x-0'} `}
      >
        {<MantineNavbar navConfig={navConfig} {...props} />}
      </div>
    </>
  )
}
