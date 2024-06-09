import React, {useState} from "react";
import $ from 'jquery'
// style
import {Button, Container, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

// API

// components

// interface
import {API_register} from "../../../utils/API/API_Core";
import {ResponseData} from "../../../utils/API/API_Interface";




const Register = () => {
    const [username, setUsername] = useState<string>("")
    const [password_one, setPassword_one] = useState<string>("")
    const [password_two, setPassword_two] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [classNumber, setClassNumber] = useState<string>("")

    function register() {
        API_register(parseInt(classNumber), username, password_one, name).then((response: ResponseData) => {
            console.log(response.message)
            alert(response.message)
        })
    }


    return (
        <Container maxWidth='sm'>
            <h1>Register</h1>
            <FormGroup>
                <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-account">屆數</InputLabel>
                    <Input
                        id="class"
                        type="text"
                        value={classNumber}
                        onChange={e => {
                            setClassNumber(e.target.value)
                        }}
                    />
                </FormControl>
                <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-account">帳號</InputLabel>
                    <Input
                        id="acc"
                        type="text"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                        }}
                    />
                </FormControl>
                <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">密碼</InputLabel>
                    <Input
                        id="psw1"
                        type={showPassword ? "text" : "password"}
                        value={password_one}
                        onChange={e => {
                            setPassword_one(e.target.value)
                        }}
                        // 結尾要放甚麼Icon
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(show => !show)}
                                    edge="end"
                                >
                                    {showPassword ? (<VisibilityOff/>) : (<Visibility/>)}
                                </IconButton>
                            </InputAdornment>
                        }/>
                </FormControl>
                <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">再次輸入密碼</InputLabel>
                    <Input
                        id="psw2"
                        type={showPassword ? "text" : "password"}
                        value={password_two}
                        onChange={e => {
                            setPassword_two(e.target.value)
                        }}
                        // 結尾要放甚麼Icon
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(show => !show)}
                                    edge="end"
                                >
                                    {showPassword ? (<VisibilityOff/>) : (<Visibility/>)}
                                </IconButton>
                            </InputAdornment>
                        }/>
                </FormControl>
                <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-account">姓名</InputLabel>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => {
                            setName(e.target.value)
                        }}
                    />
                </FormControl>
                <Button variant={"contained"} onClick={register}>註冊</Button>
            </FormGroup>
        </Container>
    )
}

export default Register