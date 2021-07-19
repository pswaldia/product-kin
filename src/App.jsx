import React from 'react'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
import './components/authentiication/authentication.css'
import Authentication from './components/authentiication/Authentication'
//import Forget from './components/forget-password/forget'
//import Reset from './components/reset-pass/reset'
//import Footer from './components/footer/footer'
//import Header from './components/header/header'
import Home from './components/home/home'
export default function App() {
    return (
        <div>
           {/*
            <Authentication/>
            <Forget/>
            <Reset/>
            <Header/>
            <Main/>
            <Footer/>
        */}
    <Router>
      <Switch>
        <Route
          path={"/login"}
          exact
          render={()=><Authentication/>}
        />
        <Route
          path={""}
          exact
          render={()=><Home/>}
        />
        <Route
          path={"/home"}
          exact
          render={()=><Home/>}
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
        /> */}
      </Switch>
    </Router>

            </div>
)
}

