import React from 'react';
import {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route, useNavigate,
} from "react-router-dom"

// API
import {API_getSession} from "./utils/API/API_Core";
import {CSRF_cookies, ResponseData} from "./utils/API/API_Interface";

// Global Component
import Loading from "./views/Components/Loading";
import AlertLog from "./views/Components/AlertLog";

// View
import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import Worker from './views/Worker/Worker'

function App() {
    const [Auth, setAuth] = useState<boolean>(false)
    const [Admin, setAdmin] = useState<boolean>(false)
    const [Teacher, setTeacher] = useState<boolean>(false)
    const [UserName, setUserName] = useState<string>("Test")

    //AlertLog & Loading Setting------------------------------
    //AlertLog
    const [AlertOpen, setAlertLog] = useState<boolean>(false)
    const [AlertTitle, setAlertTitle] = useState<string>("")
    const [AlertMsg, setAlertMsg] = useState<string>("")

    //Loading
    const [LoadingOpen, setLoading] = useState<boolean>(false)

    const alertAndLoad = {
        handelAlertLogSetting:
            (Title: string, Msg: string) => {
                setAlertLog(true)
                setAlertTitle(Title)
                setAlertMsg(Msg)
            },
        handleAlertLogClose:
            () => {
                setAlertLog(false);
                setTimeout(() => {
                    setAlertTitle("");
                    setAlertMsg("");
                }, 500);
            },
        setLoading:
            (load: boolean) => {
                setLoading(load)
            }
    }
    //---------------------------------------------------------
    useEffect(() => {
        API_getSession().then((response: CSRF_cookies) => {
            if (response.isAuthenticated) setAuth(response.isAuthenticated)
        }).catch((err: ResponseData) => {
            alert(err.message)
        })
    }, []);
    return (
        <>
            <Loading Loading={LoadingOpen}/>
            <AlertLog
                AlertLog={AlertOpen}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
                AlertLogClose={alertAndLoad.handleAlertLogClose}
            />
            <Router>
                <Routes>
                    <Route path='/home'
                           element={<Home UserName={UserName} setUserName={setUserName} alertAndLoad={alertAndLoad}/>}/>
                    <Route path='/worker/:program_id' element={<Worker UserName={UserName} alertAndLoad={alertAndLoad}/>}/>
                    <Route path="*" element={<Login
                        setUserName={setUserName}
                        setAuth={setAuth}
                        setAdmin={setAdmin}
                        setTeacher={setTeacher}
                        alertAndLoad={alertAndLoad}
                    />}
                    />
                </Routes>
            </Router>
        </>

    );
}

export default App;
