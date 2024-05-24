import {useState, useEffect} from "react";

import {API_ollama_ask, ResponseData} from "../../utils/API";

interface HomeProps {
    UserName: string | undefined
}

const Home = (props: HomeProps) => {
    const {UserName} = props
    const [ollamaReply, setOllamaReply] = useState<string>("Waiting...")

    useEffect(() => {
        API_ollama_ask("請問現在的JavaScript是第幾代?請用中文回答").then((response: ResponseData) => {
            setOllamaReply(response.message)
        })
    }, []);

    return (
        <div>
            <h1>This is {UserName} page</h1>
            <h2>Reply:{ollamaReply}</h2>
        </div>
    )
}

export default Home;
