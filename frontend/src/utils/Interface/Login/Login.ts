import React from "react";
import {AlertAndLoad} from "../GlobalComponents/AlertAndLoad";

//Login.tsx
interface Login_Props {
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>
    setTeacher: React.Dispatch<React.SetStateAction<boolean>>
    alertAndLoad: AlertAndLoad
}

// LoginInput.tsx
interface LoginInput_Props {
    acc: string
    psw: string
    showPassword: boolean
    setAcc: React.Dispatch<React.SetStateAction<string>>
    setPsw: React.Dispatch<React.SetStateAction<string>>
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}


export type{Login_Props, LoginInput_Props}
