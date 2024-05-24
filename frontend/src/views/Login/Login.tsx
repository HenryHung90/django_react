import React from 'react'
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import $ from 'jquery'
import {
    Fade,
    Container,
    Box,
    Grid,
    Button,
} from "@mui/material";

import AlertLog from "../Components/AlertLog";
import Loading from "../Components/Loading";

import SideImage from "./Components/SideImage";
import Title from "./Components/Title";
import LoginInput from "./Components/LoginInput";

// import { Connection } from "../../common/axiosConnect";
import {API_login} from "../../utils/API";

interface loginProps {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    setTeacher: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = (props: loginProps) => {
    const {setUserName, setAuth, setAdmin, setTeacher} = props
    useEffect(() => {
        $("#acc").on("keydown", (e: object): void => {
            // if (e.keyCode === 13) login();
        });
        $("#psw").on("keydown", (e: object): void => {
            // if (e.keyCode === 13) login();
        });
    });
    //帳號密碼
    const [acc, setAcc] = useState<string>("");
    const [psw, setPsw] = useState<string>("");
    //設定顯示或隱藏psw
    const [showPassword, setShowPassword] = useState<boolean>(false);

    //AlertLog & Loading Setting------------------------------
    //AlertLog
    const [AlertOpen, setAlertLog] = useState<boolean>(false);
    const [AlertTitle, setAlertTitle] = useState<string>("");
    const [AlertMsg, setAlertMsg] = useState<string>("");
    const handleAlertLogClose = () => {
        setAlertLog(false);
        setTimeout(() => {
            setAlertTitle("");
            setAlertMsg("");
        }, 500);
    };
    const handelAlertLogSetting = (Title: string, Msg: string) => {
        setAlertLog(true);
        setAlertTitle(Title);
        setAlertMsg(Msg);
    };
    //Loading
    const [LoadingOpen, setLoading] = useState<boolean>(false);
    //---------------------------------------------------------

    const NavLocation = useNavigate();
    //Login Function
    const login = () => {
        if ($("#acc").val() === "" || $("#psw").val() === "") {
            setAlertLog(true);
            setAlertTitle("錯誤");
            setAlertMsg("帳號或密碼不得為空");
        }
        setLoading(true);
        API_login(acc, psw).then((response) => {
            setUserName(acc)
            setLoading(false)
            NavLocation("/home")
        })
        // Connection.login(acc, psw).then((res:object) => {
        //     if (res.data.state) {
        //         const tokenDetail = Connection.decode(res.data.result.token);
        //
        //         localStorage.setItem("token", res.data.result.token);
        //         localStorage.setItem(
        //             "refresh_token",
        //             tokenDetail.refresh_token
        //         );
        //
        //         setUserName(tokenDetail.name);
        //         setAuth(true);
        //         setAdmin(tokenDetail.is_admin);
        //         setTeacher(tokenDetail.is_teacher);
        //         NavLocation("/home");
        //     } else {
        //         handelAlertLogSetting("通知", res.data.msg);
        //         setLoading(false);
        //     }
        // });
    };

    return (
        <>
            <Loading Loading={LoadingOpen}/>
            <AlertLog
                AlertLog={AlertOpen}
                setAlertLog={handleAlertLogClose}
                AlertTitle={AlertTitle}
                AlertMsg={AlertMsg}
            />
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
                                    <Button variant="contained" sx={{
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
