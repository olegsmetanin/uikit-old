/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */

import {render} from 'react-dom'
import {hashHistory} from 'lib/router'
import {Router} from 'lib/router'
import {routes} from 'application/routes'

require('./styles/scss/styles.scss')

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


