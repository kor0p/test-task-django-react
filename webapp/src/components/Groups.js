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
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import clsx from 'clsx'

import { load } from '../utils'

const useStyles = makeStyles(({
  spacing,
}) => ({
  groups: {
    marginTop: spacing(6),
  },
  table: {
    minWidth: 400,
  },
  description: {
    whiteSpace: 'pre-wrap',
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


export default function Groups () {
  const c = useStyles()
  const [group, setGroup] = useState(null)
  const [groups, setGroups] = useState(null)
  const [placeholder, setPlaceholder] = useState('')
  
  async function loadGroups () {
    try {
      setGroups(await load('groups'))
      setGroup(null)
      setPlaceholder('')
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  async function save (group) {
    try {
      if (group.id) {
        await load('groups/' + group.id, 'PUT', group)
      } else {
        await load('groups/', 'POST', group)
      }
      await loadGroups()
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  async function remove (id) {
    try {
      await load('groups/' + id, 'DELETE')
      await loadGroups()
    } catch (e) {
      setPlaceholder('Error in request: ' + e)
    }
  }
  
  
  
  useEffect(() => loadGroups(), [])
  
  return <div className={c.groups}>
    {placeholder}
    {groups && <TableContainer component={Paper}>
      <Table className={c.table} aria-label='groups'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map(group => {
            return <TableRow key={group.id}>
              <TableCell>{group.id}</TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell className={c.description}>{group.description}</TableCell>
              <TableCell>
                <Button
                  className={c.btn}
                  variant='outlined'
                  onClick={() => setGroup({ ...group })}
                >
                  edit
                </Button>
                <Button
                  className={c.btn}
                  variant='outlined'
                  onClick={() => remove(group.id)}
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
      onClick={() => setGroup({ name: '', description: '' })}
    >
      add group
    </Button>
    
    {group && <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {(group.id ? 'Edit' : 'Add') + ' group'}
        </Typography>
        <TextField
          className={c.field}
          label='Name'
          variant='outlined'
          value={group.name}
          onChange={e => setGroup({ ...group, name: e.target.value })}
        />
        <TextField
          className={c.field}
          label='Description'
          variant='outlined'
          multiline
          value={group.description}
          onChange={e => setGroup({ ...group, description: e.target.value })}
        />
      </CardContent>
      <CardActions>
        <Button
          className={clsx(c.btn, c.left)}
          variant='outlined'
          onClick={() => save(group)}
        >Save</Button>
      </CardActions>
    </Card>}
  </div>
}
