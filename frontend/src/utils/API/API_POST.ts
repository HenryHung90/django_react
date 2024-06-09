import {API_POST} from "./API_Config";
import {RequestParams} from "./API_Interface"


const API_ollama_ask = (content: string) => {
    /**
     * 與 Ollama 模型進行對話
     * @param content 內容
     * @constructor
     */
    const askData: RequestParams = {
        message: content
    }
    return new API_POST(process.env.REACT_APP_API_OLLAMA_ASK || '', askData).sendRequest()
}

/**
 * 取得 Student Program 相關資訊
 * @param content 攜帶的相關資訊
 * Create: 提供 Program 名稱
 * Update: 提供 JSON.stringify 內容包含 program_id, html_code, javascript_code, css_code
 * @param type 使用何種模式
 * @constructor
 */
const API_studentprogram = (content: string, type: 'getall' | 'getone' | 'create' | 'update') => {
    const programData: RequestParams = {
        message: content,
    }
    switch (type) {
        case "create":
            return new API_POST(process.env.REACT_APP_API_STUDENTPROGRAM_CREATE || '', programData).sendRequest()
        case "getall":
            return new API_POST(process.env.REACT_APP_API_STUDENTPROGRAM_GETALL || '', programData).sendRequest()
        case "getone":
            return new API_POST(process.env.REACT_APP_API_STUDENTPROGRAM_GETONE || '', programData).sendRequest()
        case "update":
            return new API_POST(process.env.REACT_APP_API_STUDENTPROGRAM_UPDATE || '', programData).sendRequest()
    }
}

export {API_ollama_ask, API_studentprogram}