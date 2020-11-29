import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

import Header from './components/Header'
import Users from './components/Users'
import Groups from './components/Groups'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '90%',
    margin: 'auto',
  }
})

function App() {
  const c = useStyles()
  return (
    <Router>
      <Header />
      <Paper className={c.container} elevation={0}>
        <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/groups'>
          <Groups />
        </Route>
        </Switch>
        <Redirect to='/users' />
      </Paper>
    </Router>
  )
}

render(<App />, document.getElementById('app'));
