import React, {useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";

// style
import {
    Box,
    Button,
    Container,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    AppBar, MenuItem, Menu
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from '@mui/icons-material/Terminal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHtml5, faCss3Alt, faJsSquare} from '@fortawesome/free-brands-svg-icons';
// API
import {API_studentprogram} from "../../../utils/API/API_POST";

// Components
import ControlBar_Menu from "./ControlBar_Menu";
import ControlBar_Button from "./ControlBar_Button";

// interface
import {pageSetting} from '../../../utils/Interface/ControlBar'
import {ControlBar_Props, studentProgramUpdate} from "../../../utils/Interface/Worker/Worker"

const ControlBar = (props: ControlBar_Props) => {
    const {
        currentPage,
        setCurrentPage,
        codeSync,
        setCodeSync,
        setLunchCode,
        html_code,
        css_code,
        javascript_code,
    } = props
    // 手機板 Nav Button
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const NavLocation = useNavigate()
    // Params
    const {program_id} = useParams();

    // 左側頁面選擇
    const pages: Array<pageSetting> = [
        {
            pageName: 'html',
            pageIcon: <FontAwesomeIcon icon={faHtml5}/>,
            click: (e: React.MouseEvent<HTMLElement> | undefined) => {
                setCurrentPage('html')
                setAnchorElNav(null);
            }

        },
        {
            pageName: 'javascript',
            pageIcon: <FontAwesomeIcon icon={faJsSquare}/>,
            click: (e: React.MouseEvent<HTMLElement> | undefined) => {
                setCurrentPage('javascript')
                setAnchorElNav(null);
            }
        },
        {
            pageName: 'css',
            pageIcon: <FontAwesomeIcon icon={faCss3Alt}/>,
            click: (e: React.MouseEvent<HTMLElement> | undefined) => {
                setCurrentPage('css')
                setAnchorElNav(null);
            }
        },
        {
            pageName: 'console',
            pageIcon: <TerminalIcon/>,
            click: (e: React.MouseEvent<HTMLElement> | undefined) => {
                setCurrentPage('terminal')
                setAnchorElNav(null);
            }
        },
    ]

    // 右側控制盤
    const controlPanel: { [key: string]: () => void } = {
        lunch: () => {
            setLunchCode((prevState) => !prevState)
            setCodeSync(true)
            const updateData: studentProgramUpdate = {
                program_id: program_id,
                html_code: html_code,
                css_code: css_code,
                javascript_code: javascript_code
            }
            API_studentprogram(JSON.stringify(updateData), 'update').then(response => {

            })
        },
        save: () => {
            setCodeSync(true)
            const updateData: studentProgramUpdate = {
                program_id: program_id,
                html_code: html_code,
                css_code: css_code,
                javascript_code: javascript_code
            }
            API_studentprogram(JSON.stringify(updateData), 'update').then(response => {

            })
        },
        leave: () => {
            if (window.confirm("確定離開?")) {
                NavLocation("/home")
            }
        }
    }

    return (
        <AppBar position="static" sx={{backgroundColor: '#14213d', boxShadow: 'none', maxHeight: '10vh'}}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <CodeIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 10,
                            // 透過 display 選擇甚麼模板下 要出現/隱藏
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Coding
                    </Typography>
                    {/*電腦版選單*/}
                    <ControlBar_Menu currentPage={currentPage} pages={pages} isComputer={true} anchorElNav={anchorElNav}
                                     setAnchorElNav={setAnchorElNav}/>
                    {/*手機板選單*/}
                    <ControlBar_Menu currentPage={currentPage} pages={pages} isComputer={false}
                                     anchorElNav={anchorElNav}
                                     setAnchorElNav={setAnchorElNav}/>
                    <Box sx={{flexGrow: 0}}>
                        <ControlBar_Button type={'lunch'} controlPanel={controlPanel} codeSync={codeSync}/>
                        <ControlBar_Button type={'save'} controlPanel={controlPanel} codeSync={codeSync}/>
                        <ControlBar_Button type={'leave'} controlPanel={controlPanel} codeSync={codeSync}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default ControlBar
