import React, {useEffect, useState} from "react"

// style
import {
    Container,
    Box, Button
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
// API
import {getNowTime} from "../../../utils/Tools/time"
// Components
// interface
import {LunchView_Props, studentProgramUpdate} from "../../../utils/Interface/Worker/Worker";
import {API_POST_studentProgram} from "../../../utils/API/API_POST";
import {useParams} from "react-router-dom";

const LISTEN_LOG: string = ' (function() {\n' +
    '                const originalLog = console.log;\n' +
    '                console.log = function(...args) {\n' +
    '                    window.parent.postMessage({ status: \'log\', message: args.join(\' \') }, \'*\');\n' +
    '                    originalLog.apply(console, args);\n' +
    '                };\n' +
    '                const originalError = console.error;\n' +
    '                console.error = function(...args) {\n' +
    '                    window.parent.postMessage({ status: \'error\', message: args.join(\' \') }, \'*\');\n' +
    '                    originalError.apply(console, args);\n' +
    '                };\n' +
    '                window.onerror = function(message, source, lineno, colno, error) {\n' +
    '                    window.parent.postMessage({ status: \'error\', message: message, source: source, lineno: lineno, colno: colno, error: error ? error.stack : null }, \'*\');\n' +
    '                };\n' +
    '                window.addEventListener(\'unhandledrejection\', function(event) {\n' +
    '                    window.parent.postMessage({ status: \'error\', message: event.reason ? event.reason.message : \'Unhandled rejection\', error: event.reason ? event.reason.stack : null }, \'*\');\n' +
    '                });\n' +
    '            })();'

const LunchView = (props: LunchView_Props) => {
    const {
        lunchCode,
        html_code,
        css_code,
        javascript_code,
        setTerminal_code,
        alertAndLoad,
    } = props

    // demo 來源
    const [demoSrc, setDemoSrc] = useState<string>("")
    // demo 是否有降下來
    const [demoDown, setDemoDown] = useState<boolean>(true)
    // Params
    const {program_id} = useParams();

    useEffect(() => {
        // 捕捉 iframe 報錯
        window.addEventListener('message', (e: any) => {
            if (e.data.status) {
                setTerminal_code((prevMessages) => [
                    ...prevMessages,
                    {
                        status: e.data.status,
                        message: e.data.status === 'error' ? e.data.error : e.data.message,
                        timelog: getNowTime("full")
                    }
                ])
            }
        }, false)
    }, []);


    // 偵測 lunchCode 是否啟動，啟動後更新 demo src
    useEffect(() => {
        handleDemoStart()
    }, [lunchCode]);


    function handleDemoStart() {
        setDemoDown((prevState) => !prevState)
        setDemoSrc(html_code + `<script>${LISTEN_LOG}</script>` + `<style>${css_code}</style>` + `<script>${javascript_code} </script>`)
        if (!demoDown) {
            alertAndLoad.setLoading(true)
            const updateData: studentProgramUpdate = {
                program_id: program_id,
                html_code: html_code,
                css_code: css_code,
                javascript_code: javascript_code
            }
            API_POST_studentProgram(JSON.stringify(updateData), 'update').then(response => {
                alertAndLoad.setLoading(false)
            })
        }
    }

    return (
        <Container
            id='Worker_LunchView_demoContainer'
            sx={{
                overflow: 'hidden',
                pointerEvents: demoDown ? 'pointer' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'fixed',
                width: '100vw',
                maxWidth: '100vw !important',
                height: '100vh',
                zIndex: 1004,
            }}
            onClick={handleDemoStart}
        >
            <Box sx={{
                width: '100%',
                height: '95%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                transitionDuration: '0.5s',
                transform: demoDown ? 'translateY(10px)' : 'translateY(-90vh)',
            }}>
                <iframe
                    id='Worker_LunchView_demoView'
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
                    loading='lazy'
                    style={{
                        width: '100%',
                        height: '95%',
                        border: 'none',
                        borderRadius: '10px',
                        // boxShadow: demoDown ? '-1px -1px 5px 2px rgba(255,255,255,0.5)' : 'none',
                        backgroundColor: '#e5e5e5',
                        pointerEvents: 'all',
                        // backdropFilter: 'blur(10px)',
                    }}
                    srcDoc={demoSrc}
                />
                <Container
                    id='Worker_LunchView_demoBtn'
                    sx={{
                        width: '8%',
                        height: '3%',
                        // border: '1px solid #fca311',
                        borderRadius: '0 0 10px 10px',
                        // boxShadow: '0 0 2px 1px #fca311',
                        display: 'flex',
                        transitionDuration: '0.5s',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'all',
                        transform: {xs: 'translateX(-100px)', md: 'none'},
                        color: '#14213d',
                        backgroundColor: '#e5e5e5',
                        '&:hover': {
                            backgroundColor: '#fca311',
                            color: '#14213d'
                        }
                    }}
                >
                    <PlayArrowIcon/>
                </Container>
            </Box>
        </Container>
    )
}
export default LunchView