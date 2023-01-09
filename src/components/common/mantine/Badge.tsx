import React, { useState, useRef, useLayoutEffect } from 'react'
import { Badge as MantineBadge } from '@mantine/core'

import { EnumType } from 'app/utils/mapEnumToBadgeColor'
import { mapEnumToBadgeColor } from 'app/utils/mapEnumToBadgeColor'

import { BadgeProps as MantineBadgeProps } from '@mantine/core'

type BadgeProps = {
  enumType?: EnumType
  enumName?: string
  enumId?: string
  text?: string
} & MantineBadgeProps

export const Badge: React.FC<BadgeProps> = ({
  enumType,
  enumName,
  text,
  children,
  ...props
}) => {
  const [color, Icon] = mapEnumToBadgeColor(enumType, enumName)
  const [fontSize, setFontSize] = useState(11)

  const badgeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const fontSize = parseInt(
      window.getComputedStyle(badgeRef.current as Element).lineHeight,
      10,
    )
    setFontSize(fontSize * 0.85)
  }, [])

  if (typeof color === 'string')
    return (
      <MantineBadge
        size="md"
        color={color}
        leftSection={Icon && <Icon size={fontSize} />}
        ref={badgeRef}
        {...props}
      >
        {children ?? text ?? enumName}
      </MantineBadge>
    )
  else if (typeof color === 'object')
    return (
      <MantineBadge
        size="md"
        leftSection={Icon && <Icon size={fontSize} />}
        //leftSection={Icon && <Icon size={theme.fontSizes[props.size || 'md']} />}
        sx={{ backgroundColor: color.bg, color: color.txt }}
        ref={badgeRef}
        {...props}
      >
        {children ?? text ?? enumName}
      </MantineBadge>
    )
  else
    return (
      <MantineBadge size="md" ref={badgeRef} {...props}>
        {text ?? children}
      </MantineBadge>
    )
}
