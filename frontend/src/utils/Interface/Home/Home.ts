import React from "react";
import {AlertAndLoad} from "../GlobalComponents/AlertAndLoad";

// Home.tsx
interface Home_Props {
    UserName: string | undefined
    setUserName: React.Dispatch<React.SetStateAction<string>>
    alertAndLoad: AlertAndLoad
}

// ProgramCard.tsx
interface ProgramCard_Props {
    alertAndLoad: AlertAndLoad
}


//Bar.tsx
interface Bar_Props {
    name: string | undefined
}

type pageAndSetting = {
    pageName: string,
    clicks: Function
}


export type{Home_Props, ProgramCard_Props, Bar_Props, pageAndSetting}