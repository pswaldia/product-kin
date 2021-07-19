import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
import Main from '../main/main'
//import Forget from '../forget-password/forget'
//import Reset from '../reset-pass/reset'

export default function Routes() {
    return (
        <div>
    <Router>
      <Switch>
        <Route
          path={""}
          exact
          render={()=><Main/>}
        />
         {/* <Route
          path={"/forget"}
          exact
          render={()=><Forget/>}
        />
        <Route
          path={"/reset"}
          exact
          render={()=><Reset/>}
        />  */}
      </Switch>
    </Router>

        </div>
)
}