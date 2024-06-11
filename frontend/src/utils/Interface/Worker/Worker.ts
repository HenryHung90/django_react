import React from "react";
import {AlertAndLoad} from "../GlobalComponents/AlertAndLoad"
import {pageSetting} from "../ControlBar";

// Worker.tsx--------------------------------------------------------------------
interface Worker_Props {
    UserName: string | undefined
    alertAndLoad: AlertAndLoad
}

type userCode = {
    html_code: string,
    css_code: string,
    javascript_code: string,
}

type terminalMessage = {
    status: 'log' | 'error',
    message: string,
    timelog: string,
}

// CodingPlace.tsx--------------------------------------------------------------------
interface CodingPlace_Props {
    languageType: 'html' | 'javascript' | 'css' | 'terminal',
    setCodeSync: React.Dispatch<React.SetStateAction<boolean>>,
    html_code: string,
    css_code: string,
    javascript_code: string,
    terminal_code: Array<terminalMessage>,
    set_html_code: React.Dispatch<React.SetStateAction<string>>,
    set_css_code: React.Dispatch<React.SetStateAction<string>>,
    set_javascript_code: React.Dispatch<React.SetStateAction<string>>,
    setTerminal_code: React.Dispatch<React.SetStateAction<Array<terminalMessage>>>
}

// ControlBar.tsx--------------------------------------------------------------------
interface ControlBar_Props {
    currentPage: string,
    setCurrentPage: React.Dispatch<React.SetStateAction<'html' | 'javascript' | 'css' | 'terminal'>>,
    codeSync: boolean,
    setCodeSync: React.Dispatch<React.SetStateAction<boolean>>,
    setLunchCode: React.Dispatch<React.SetStateAction<boolean>>,
    html_code: string,
    css_code: string,
    javascript_code: string,
    alertAndLoad: AlertAndLoad
}

type studentProgramUpdate = {
    program_id: string | undefined,
    html_code: string,
    css_code: string,
    javascript_code: string
}

// ControlBar_Button.tsx------------------------------------------------------------
interface ControlBarButton_Props {
    type: 'save' | 'leave',
    controlPanel: { [key: string]: () => void },
    codeSync: boolean,
}

// ControlBar_Menu.tsx--------------------------------------------------------------
interface ControlBarMenu_Prop {
    pages: Array<pageSetting>,
    currentPage: string,
    isComputer: boolean,
    anchorElNav: null | HTMLElement,
    setAnchorElNav: React.Dispatch<React.SetStateAction<null | HTMLElement>>
}

// LunchView.tsx--------------------------------------------------------------------
interface LunchView_Props {
    lunchCode: boolean,
    html_code: string,
    css_code: string,
    javascript_code: string,
    setTerminal_code: React.Dispatch<React.SetStateAction<Array<terminalMessage>>>
    alertAndLoad: AlertAndLoad
}

// History.tsx---------------------------------------------------------------------
interface History_Props {
    alertAndLoad: AlertAndLoad,
}

// History_List.tsx----------------------------------------------------------------
type historyValue = {
    time: string,
    size: number,
    html_code: string,
    css_code: string,
    javascript_code: string,
}

interface HistoryList_Props {
    index: number,
    value: historyValue,
    alertAndLoad: AlertAndLoad,
}

export type {
    Worker_Props,
    userCode,
    terminalMessage,
    CodingPlace_Props,
    ControlBar_Props,
    studentProgramUpdate,
    ControlBarButton_Props,
    ControlBarMenu_Prop,
    LunchView_Props,
    History_Props,
    historyValue,
    HistoryList_Props,
}