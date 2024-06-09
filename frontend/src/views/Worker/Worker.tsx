import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// style
// API
import {API_studentprogram} from "../../utils/API/API_POST";
// Components
import ControlBar from "./Components/ControlBar"
import CodingPlace from "./Components/CodingPlace"
import LunchView from "./Components/LunchView"
// interface
import {ResponseData} from "../../utils/API/API_Interface";
import {Worker_Props, userCode, terminalMessage} from "../../utils/Interface/Worker/Worker";

// 初始 Code
const CODE_SNIPPETS = {
    html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Hello world</title>\n</head>\n<body>\n</body>\n</html>\n',
    javascript: 'function hello() {\n    const abs = "Hello"\n    console.log(abs)\n}',
    css: 'body {\n    margin: 0;\n    padding: 0;\n}'
}

const Worker = (props: Worker_Props) => {
    // 使用者名稱
    const {UserName, alertAndLoad} = props
    // 目前頁面
    const [currentPage, setCurrentPage] = useState<'html' | 'javascript' | 'css' | 'terminal'>('javascript')
    // Coding 是否有儲存成功
    const [codeSync, setCodeSync] = useState<boolean>(true)

    // HTML Code
    const [html_code, set_html_code] = useState<string>("")
    // CSS Code
    const [css_code, set_css_code] = useState<string>("")
    // javascript Code
    const [javascript_code, set_javascript_code] = useState<string>("")
    // terminal console
    const [terminal_code, setTerminal_code] = useState<Array<terminalMessage>>([])
    // Lunch Code 是否執行程式(偵測是否有變化就執行)
    const [lunchCode, setLunchCode] = useState<boolean>(false)


    const {program_id} = useParams()


    useEffect(() => {
        // 從後端獲取該課程之 Coding
        API_studentprogram(program_id || '', 'getone').then((response: ResponseData) => {
            const userCode: userCode = JSON.parse(response.message)
            userCode.html_code === null ? set_html_code(CODE_SNIPPETS['html']) : set_html_code(userCode.html_code)
            userCode.css_code === null ? set_css_code(CODE_SNIPPETS['css']) : set_css_code(userCode.css_code)
            userCode.javascript_code === null ? set_javascript_code(CODE_SNIPPETS['javascript']) : set_javascript_code(userCode.javascript_code)
            setCurrentPage('html')
            alertAndLoad.setLoading(false)
        })
    }, []);


    return (
        <div>
            <LunchView
                lunchCode={lunchCode}
                html_code={html_code}
                css_code={css_code}
                javascript_code={javascript_code}
                setTerminal_code={setTerminal_code}
            />
            <ControlBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                codeSync={codeSync}
                setCodeSync={setCodeSync}
                setLunchCode={setLunchCode}
                html_code={html_code}
                css_code={css_code}
                javascript_code={javascript_code}
            />
            <CodingPlace
                languageType={currentPage}
                setCodeSync={setCodeSync}
                html_code={html_code}
                css_code={css_code}
                javascript_code={javascript_code}
                terminal_code={terminal_code}
                set_html_code={set_html_code}
                set_css_code={set_css_code}
                set_javascript_code={set_javascript_code}
                setTerminal_code={setTerminal_code}
            />
        </div>
    )

}
export default Worker
