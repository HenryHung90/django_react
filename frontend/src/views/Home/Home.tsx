import React, {useState, useEffect} from "react"

// style
// API
import {API_getUserInfo} from "../../utils/API/API_Core"
import {API_ollama_ask} from "../../utils/API/API_POST"
// 引入 markedHightlight
// 使用 Markdown 解析 chatGPT 回傳字串
// Ref -=-
// abstract: https://www.cnblogs.com/rotk2022/p/17223591.html
// hightlightJS:　https://highlightjs.org/#usage
// Markdown: https://marked.js.org/
// markedHightlight: https://www.npmjs.com/package/marked-highlight
import {Marked} from "marked"
import {markedHighlight} from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// components
import Bar from './Components/Bar'
import ProgramCard from "./Components/ProgramCard";
import Register from "./Components/Register"

// interface
import {ResponseData, CSRF_cookies} from "../../utils/API/API_Interface"
import {Home_Props} from "../../utils/Interface/Home/Home";


const Home = (props: Home_Props) => {
    const {UserName, setUserName, alertAndLoad} = props
    const [ollamaReply, setOllamaReply] = useState<string>("")
    const [enableHTML, setEnableHTML] = useState<boolean>(false)


    useEffect(() => {
        // API_ollama_ask("請給我一個簡單的HTML程式碼範例，內容還要包含簡單的 CSS 以及 JavaScript，JavaScript 要有包含 alert('Hello World')，請用中文回答").then((response: ResponseData) => {
        //     const chunk_message = response.message.split("")
        //     const marked = new Marked(
        //         markedHighlight({
        //             langPrefix: 'hljs language-',
        //             highlight(code, lang, info) {
        //                 const language: string = hljs.getLanguage(lang) ? lang : 'plaintext'
        //                 return hljs.highlight(code, {language}).value
        //             }
        //         })
        //     )
        //     slowLoop(chunk_message, 10)
        //
        //     function slowLoop(arr: string[], delay: number) {
        //         let index = 0
        //         const interval = setInterval(() => {
        //             if (index < arr.length) {
        //                 setOllamaReply((prevState) => prevState += arr[index++])
        //             } else {
        //                 clearInterval(interval)
        //                 setOllamaReply((prevState) => marked.parse(prevState).toString())
        //                 setEnableHTML(true)
        //             }
        //         }, delay)
        //     }
        //
        // }).catch((err) => {
        //     alert(err.message)
        // })

        API_getUserInfo().then((response: CSRF_cookies) => {
            setUserName(response.username)
        }).catch((err: ResponseData) => {
            alert(err.message)
        })
    }, [])


    return (
        <div>
            <Bar name={UserName}/>
            {/*<div dangerouslySetInnerHTML={{__html: ollamaReply}}/>*/}
            <ProgramCard alertAndLoad={alertAndLoad}/>
        </div>
    )
}

export default Home;
