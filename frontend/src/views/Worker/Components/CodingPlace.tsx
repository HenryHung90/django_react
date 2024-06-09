import React, {useEffect, useState, useRef} from "react";

// style
import {Box, Container, Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

// API

// components
import {Editor} from "@monaco-editor/react";

// interface
import {CodingPlace_Props, terminalMessage} from "../../../utils/Interface/Worker/Worker"

const CodingPlace = (props: CodingPlace_Props) => {
    const {
        languageType,
        setCodeSync,
        html_code,
        css_code,
        javascript_code,
        terminal_code,
        set_html_code,
        set_css_code,
        set_javascript_code,
        setTerminal_code
    } = props

    // 承接 code 使用
    const [codingView, setCodingView] = useState<string>("")

    // 使 terminal 永遠都會顯示最新的
    const terminalContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (terminalContainerRef.current && (terminalContainerRef.current.scrollHeight - terminalContainerRef.current.scrollTop) < 1200)
            terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight

    }, [terminal_code, languageType]);

    useEffect(() => {
        switch (languageType) {
            case "html":
                setCodingView(html_code)
                break
            case "css":
                setCodingView(css_code)
                break
            case "javascript":
                setCodingView(javascript_code)
                break
            case 'terminal':
                console.log(terminal_code)
                break
        }
    }, [languageType]);

    return (
        <Box sx={{px: 1, py: 1}}>
            {languageType !== 'terminal' &&
                <Editor
                    height="90vh"
                    theme='vs-dark'
                    value={codingView}
                    onChange={(value) => {
                        if (value) {
                            setCodeSync(false)
                            switch (languageType) {
                                case "html":
                                    set_html_code(value)
                                    break
                                case "css":
                                    set_css_code(value)
                                    break
                                case "javascript":
                                    set_javascript_code(value)
                                    break
                            }
                        }
                    }}
                    onMount={(editor) => {
                        editor.focus()
                    }}
                    language={languageType}
                />}
            {languageType === 'terminal' &&
                <Container
                    ref={terminalContainerRef}
                    sx={{
                        backgroundColor: '#14213d',
                        color: '#e5e5e5',
                        fontFamily: 'monospace',
                        fontSize: '24px',
                        height: '90vh',
                        overflowY: 'scroll',
                    }}
                >
                    <Button
                        variant='contained'
                        sx={{
                            position: 'absolute',
                            left: '77%',
                            top: '8%',
                        }}
                        onClick={() => {
                            setTerminal_code([])
                        }}
                    ><DeleteIcon/>
                    </Button>
                    {terminal_code.map((value: terminalMessage, index) => {
                        if (value.status === 'error') {
                            return <Box
                                key={index}
                                sx={{backgroundColor: '#cc5757', my: 1}}
                            >
                                {value.message}
                            </Box>
                        } else {
                            return <Box
                                key={index}
                                sx={{backgroundColor: '#14213d', my: 1}}
                            >
                                {value.message}
                            </Box>
                        }
                    })}
                </Container>
            }
        </Box>
    )
}
export default CodingPlace