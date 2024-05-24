import React from 'react';
import {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

import './App.css'
import Home from "./views/Home/Home"
import Login from "./views/Login/Login"

function App() {
    const [pageName, setPageName] = useState<string | undefined>()
    const [Auth, setAuth] = useState<boolean>(false)
    const [Admin, setAdmin] = useState<boolean>(false)
    const [Teacher, setTeacher] = useState<boolean>(false)
    const [UserName, setUserName] = useState<string>("Test")


    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home UserName={UserName}/>}/>
                <Route path="*" element={<Login
                    setUserName={setUserName}
                    setAuth={setAuth}
                    setAdmin={setAdmin}
                    setTeacher={setTeacher}
                />}
                />
            </Routes>
        </Router>
    );
}

export default App;
