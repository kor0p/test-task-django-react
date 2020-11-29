import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import clsx from 'clsx'
import moment from 'moment'

import { load } from '../utils'

const useStyles = makeStyles(({
  spacing,
}) => ({
  users: {
    marginTop: spacing(6),
  },
  table: {
    minWidth: 400,
  },
  btn: {
    margin: spacing(1),
  },
  left: {
    marginLeft: 'auto',
  },
  field: {
    margin: spacing(1),
  },
  select: {
    minWidth: 120,
  },
}));


export default function Users () {
  const c = useStyles()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [groups, setGroups] = useState(null)
  const [placeholder, setPlaceholder] = useState('')
  
  async function loadUsers () {
    try {
      setUsers(await load('users'))
      setUser(null)
      setPlaceholder('')
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  async function loadGroups () {
    try {
      setGroups(await load('groups'))
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  async function save (user) {
    try {
      if (user.id) {
        await load('users/' + user.id, 'PUT', user)
      } else {
        await load('users/', 'POST', user)
      }
      await loadUsers()
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  async function remove (id) {
    try {
      await load('users/' + id, 'DELETE')
      await loadUsers()
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  
  
  useEffect(() => Promise.all([loadGroups(), loadUsers()]), [])
  
  return <div className={c.users}>
    {placeholder}
    {users && <TableContainer component={Paper}>
      <Table className={c.table} aria-label='users'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            return <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{moment(user.created).format('llll')}</TableCell>
              <TableCell>{groups?.find(g => g.id === user.group)?.name}</TableCell>
              <TableCell>
                <Button
                  className={c.btn}
                  variant='outlined'
                  onClick={() => setUser({ ...user })}
                >
                  edit
                </Button>
                <Button
                  className={c.btn}
                  variant='outlined'
                  onClick={() => remove(user.id)}
                >
                  remove
                </Button>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>}
    <Button
      className={c.btn}
      color='primary'
      variant='outlined'
      onClick={() => setUser({ username: '', group: null })}
    >
      add user
    </Button>
    
    {user && <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {(user.id ? 'Edit' : 'Add') + ' user'}
        </Typography>
        <TextField
          className={c.field}
          label='Username'
          variant='outlined'
          value={user.username}
          onChange={e => setUser({ ...user, username: e.target.value })}
        />
        <FormControl className={clsx(c.field, c.select)} variant='outlined'>
          <InputLabel>Group</InputLabel>
          <Select
            label='Group'
            value={user.group}
            onChange={e => setUser({ ...user, group: e.target.value })}
          >
            {groups && groups.map(group => 
              <MenuItem value={group.id}>{group.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          className={clsx(c.btn, c.left)}
          variant='outlined'
          onClick={() => save(user)}
        >Save</Button>
      </CardActions>
    </Card>}
  </div>
}
