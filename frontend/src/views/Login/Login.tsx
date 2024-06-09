import React from 'react'
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import $ from 'jquery'

// style
import {
    Fade,
    Container,
    Box,
    Grid,
    Button,
} from "@mui/material";

// API
import {API_login} from '../../utils/API/API_Core'

// components
import SideImage from "./Components/SideImage";
import Title from "./Components/Title";
import LoginInput from "./Components/LoginInput";

// interface
import {ResponseData} from "../../utils/API/API_Interface"
import {Login_Props} from "../../utils/Interface/Login/Login";


const Login = (props: Login_Props) => {
    const {
        setUserName,
        setAuth,
        setAdmin,
        setTeacher,
        alertAndLoad
    } = props
    //帳號密碼
    const [acc, setAcc] = useState<string>("")
    const [psw, setPsw] = useState<string>("")
    //設定顯示或隱藏psw
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const NavLocation = useNavigate()


    $('#acc').on('keyup', (e) => {
        e.preventDefault()
        if (e.key === "Enter") $('#login').click()
    })
    $('#psw').on('keyup', (e) => {
        e.preventDefault()
        if (e.key === "Enter") $('#login').click()
    })

    //Login Function
    function login() {
        if (acc === "" || psw === "") {
            return alertAndLoad.handelAlertLogSetting("錯誤", "帳號或密碼不得為空!")
        }
        alertAndLoad.setLoading(true);
        API_login(acc, psw).then((response) => {
            if (response.status === 200) {
                setUserName(response.message)
                setAuth(true)
                alertAndLoad.setLoading(false)
                NavLocation("/home")
            } else {
                alertAndLoad.setLoading(false)
                alertAndLoad.handelAlertLogSetting('錯誤', response.message)
            }
        }).catch((err: ResponseData) => {
            alert(err.message)
        })
    }


    return (
        <>
            <Fade in={true} timeout={1200}>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: "100vw",
                        height: "100vh",
                        overflow: "hidden",
                    }}>
                    <SideImage/>
                    <Grid xs={12} sm={8}>
                        <Container
                            sx={{
                                margin: 0,
                                padding: 0,
                                backgroundColor: "rgb(183,74,95)",
                                maxWidth: "100% !important",
                                height: "100%",
                                display: "inline-flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Title/>
                            <Box sx={{
                                width: "70%",
                                margin: "0 auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "30px 20px",
                                border: "2.5px solid rgba(0,0,0,0.5)",
                                borderRadius: "10px",
                            }}>
                                <LoginInput
                                    acc={acc}
                                    psw={psw}
                                    showPassword={showPassword}
                                    setAcc={setAcc}
                                    setPsw={setPsw}
                                    setShowPassword={setShowPassword}
                                />
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "50px",
                                }}>
                                    <Button
                                        id='login'
                                        variant="contained"
                                        sx={{
                                            width: "40%",
                                            backgroundColor: "rgb(239,230,230)",
                                            color: "black",
                                            "&:hover": {
                                                backgroundColor:
                                                    "rgb(240,150,150)",
                                            },
                                        }} onClick={login}>
                                        登入
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </Fade>
        </>
    );
};

export default Login;
