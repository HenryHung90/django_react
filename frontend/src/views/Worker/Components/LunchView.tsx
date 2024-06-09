import React, {useEffect, useState} from "react"

// style
import {
    Container,
    Box, Button
} from "@mui/material"
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
// API
// Components
// interface
import {LunchView_Props, studentProgramUpdate, terminalMessage} from "../../../utils/Interface/Worker/Worker";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import {API_studentprogram} from "../../../utils/API/API_POST";
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
    } = props

    // demo 來源
    const [demoSrc, setDemoSrc] = useState<string>("")
    // demo 是否有降下來
    const [demoDown, setDemoDown] = useState<boolean>(true)
    // Params
    const {program_id} = useParams();

    function handleDemoStart() {
        setDemoDown((prevState) => !prevState)
        setDemoSrc(html_code + `<script>${LISTEN_LOG}</script>` + `<style>${css_code}</style>` + `<script>${javascript_code} </script>`)
        const updateData: studentProgramUpdate = {
            program_id: program_id,
            html_code: html_code,
            css_code: css_code,
            javascript_code: javascript_code
        }
        API_studentprogram(JSON.stringify(updateData), 'update').then(response => {

        })
    }


    useEffect(() => {
        handleDemoStart()
    }, [lunchCode]);

    useEffect(() => {
        // 捕捉 iframe 報錯
        window.addEventListener('message', (e: any) => {
            if (e.data.status) {
                setTerminal_code((prevMessages) => [
                    ...prevMessages,
                    {
                        status: e.data.status,
                        message: e.data.status === 'error' ? e.data.error : e.data.message,
                    }
                ])
            }
        }, false)
    }, []);

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
                transform: demoDown ? 'none' : 'translateY(-91vh)',

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
                        boxShadow: demoDown ? '-1px -1px 5px 2px rgba(255,255,255,0.5)' : 'none',
                        backgroundColor: 'rgba(255,255,255, 0.5)',
                        pointerEvents: 'all',
                    }}
                    srcDoc={demoSrc}
                />
                <Container
                    id='Worker_LunchView_demoBtn'
                    sx={{
                        width: '10%',
                        height: '5%',
                        border: '1px solid #fca311',
                        borderRadius: '0 0 20px 20px',
                        boxShadow: '0 0 2px 1px #fca311',
                        display: 'flex',
                        transitionDuration: '0.5s',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'all',
                        transform: {xs: 'translateX(-100px)', md: 'none'},
                        color: '#e5e5e5',
                        '&:hover': {
                            backgroundColor: '#fca311',
                            color: '#14213d'
                        }
                    }}
                >
                    <VideoLabelIcon/>
                </Container>
            </Box>
        </Container>
    )
}
export default LunchView