 import React from 'react'
 import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
 import Routes from '../routes/routes'
 import Footer from '../footer/footer'
 import Header from '../header/header'
 import Main from '../main/main'
 export default function Home() {
     return (
         <div>
            <Header/>
            
            <Routes/> 
            <Footer/>
        </div>
)
 }
