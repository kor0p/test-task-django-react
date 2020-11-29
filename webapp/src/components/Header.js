import React, { forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(({
  palette: {
    background,
    text,
  },
}) => ({
  list: {
    borderBottom: `1px solid ${text.secondary}`,
    paddingLeft: 0,
  },
  item: {
    display: 'inline-block',
    listStyle: 'none',
  },
  active: {
    border: `1px solid ${text.secondary}`,
    borderRadius: '4px 4px 0 0',
    margin: 0,
    marginBottom: -1,
    borderBottom: '1px solid white',
  },
}))
  
const LinkRef = forwardRef(({ active, ...props }, ref) => {
  const c = useStyles()
  return <Button
    {...props}
    className={clsx(c.item, active && c.active)}
    variant='text'
    color='primary'
    size='large'
    ref={ref}
  />
})

export default function Header () {
  const c = useStyles()
  const location = useLocation()
  const tabs = [{
    url: '/users',
    title: 'Users',
  }, {
    url: '/groups',
    title: 'Groups',
  }]
  
  return <nav>
    <div className={c.list}>
      {tabs.map(tab =>
        <Link
          key={tab.url}
          to={tab.url}
          component={LinkRef}
          active={location.pathname == tab.url}
        >
          {tab.title}
        </Link>
      )}
    </div>
  </nav>
}
