import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Authentication from './components/authentication/Authentication' 
import Main from './components/main/main';
import Forget from './components/authentication/forget-password/Forget'
import Reset from './components/authentication/reset-pass/Reset'
import Header from './components/header/header'
export default function App() {
    localStorage.setItem("case_no",0);
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/login" component = {Authentication} />
                    <Route exact path="/login/forget" component={Forget} />
                    <Route exact path="/login/reset/:id/:token" component={Reset} />
                    <Route component = {() => 
                        <>
                            <Header/>
                            <Main/>
                        </>
                    } />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
