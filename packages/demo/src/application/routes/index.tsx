/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:enable:no-unused-variable */
import {IndexRoute, Route} from 'application/lib/router'
import {Layout} from 'application/сomponents/Layout/Layout'
import {IndexPage} from 'application/pages/IndexPage'
import {NotFoundPage} from 'application/pages/NotFoundPage'


export const routes = () => {
  return (
    <Route>
      <Route path="/" component={Layout}>
        <IndexRoute
          component={IndexPage}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  )
}

