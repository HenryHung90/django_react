import React from "react";
// style
import {
    Box,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton
} from "@mui/material";
import {VisibilityOff, Visibility} from "@mui/icons-material"
// API

// components

// interface
import {LoginInput_Props} from "../../../utils/Interface/Login/Login";

const LoginInput = (props: LoginInput_Props) => {
    const {
        acc,
        psw,
        showPassword,
        setAcc,
        setPsw,
        setShowPassword
    } = props
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            '@media (max-width:600px)': {
                display: 'inline',
                textAlign: 'center'
            }
        }}>
            <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                <InputLabel htmlFor="standard-adornment-account">帳號</InputLabel>
                <Input
                    id='acc'
                    type="text"
                    value={acc}
                    onChange={e => {
                        setAcc(e.target.value)
                    }}
                />
            </FormControl>
            <FormControl sx={{m: 2, width: "30ch", '@media(max-width:600px)': {width: "20ch"}}} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">密碼</InputLabel>
                <Input
                    id='psw'
                    type={showPassword ? "text" : "password"}
                    value={psw}
                    onChange={e => {
                        setPsw(e.target.value)
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
        </Box>
    )
}

export default LoginInput