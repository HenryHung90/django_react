import axios, {AxiosResponse, AxiosError} from "axios";

// Request 訊息內容
interface RequestParams {
    message: object
}

// Response 訊息內容
interface ResponseData {
    message: string
    status: number
}

// API 錯誤訊息
interface APIError {
    message: string
    status: number
    headers: object
}

class APIController {
    // 设置后端 API 地址
    protected baseURL: string;
    protected method: string;
    protected data: RequestParams | undefined

    constructor(baseURL: string, method: string, data: RequestParams | undefined) {
        this.baseURL = window.location.origin + baseURL
        this.method = method
        this.data = data
    }

    // 發送請求
    public async sendRequest() {
        // 发送请求
        return await axios({
            method: this.method,
            url: this.baseURL,
            withCredentials: true,
            data: this.data
        }).then((response) => {
            const resData: ResponseData = {
                message: response.data.message,
                status: response.data.status
            }
            return resData
        }).catch((error: AxiosError) => {
            return this.handleError(error)
        })
    }

    // 處理錯誤
    private handleError(error: AxiosError) {
        if (error.response) {
            // 回應錯誤
            console.error("Error Response:", error.response.data)
            console.error("Error Status:", error.response.status)
            console.error("Error Headers:", error.response.headers)
            // 提示錯誤
            alert("請求出錯，請再試一次");
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error("Error Request:", error.request)
            // 提示用户请求超时
            alert("請求超時，請再試一次");
        } else {
            // 其他错误
            console.error("Error Message:", error.message)
            // 提示用户其他錯誤
            alert("請求出錯，請再試一次");
        }
        const errorData: ResponseData = {
            message: error.message,
            status: 404
        }
        return errorData
    }
}

class API_POST extends APIController {
    constructor(baseURL: string, data: RequestParams) {
        super(baseURL, "POST", data)
        this.data = data
        this.baseURL = baseURL
    }
}

class API_GET extends APIController {
    constructor(baseURL: string) {
        super(baseURL, "GET", undefined)
        this.baseURL = baseURL
    }
}

// API Extension ---------------------------------------------------------
const API_login = (acc: string, psw: string) => {
    const loginData: RequestParams = {
        message: {
            acc: acc,
            psw: psw,
        }
    }
    return new API_POST(process.env.REACT_APP_API_LOGIN || '', loginData).sendRequest()
}

const API_ollama_ask = (content: string) => {
    const askData: RequestParams = {
        message: {
            content: content
        }
    }
    return new API_POST(process.env.REACT_APP_API_OLLAMA_ASK || '', askData).sendRequest()
}

export {API_login, API_ollama_ask}
export type {ResponseData}