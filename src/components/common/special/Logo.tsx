import React from 'react'
import { Link } from 'react-router-dom'
import { r } from '../../../app/router'

export const Logo = () => {
  return (
    <Link to={r['index']}>
      <img style={{ height: '3em', margin: '0.5em' }} src="/logo-black.png" />
    </Link>
  )
}
