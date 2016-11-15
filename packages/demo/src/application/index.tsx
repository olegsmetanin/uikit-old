/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {render} from 'react-dom'
import {hashHistory} from 'application/lib/router'
import {Router} from 'application/lib/router'
import {routes} from 'application/routes'

// require('./styles/styles.scss')

window['app'] = (options: any) => {

  const {el} = options
  const history = hashHistory
  render(
    <Router history={history}>
      {routes()}
    </Router>,
    el
  )

}


