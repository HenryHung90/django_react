import Cookies from "universal-cookie"
import axios, {AxiosError} from "axios"
import {RequestParams, ResponseData, CSRF_cookies} from "./API_Interface"

class APIController {
    // 设置后端 API 地址
    protected baseURL: string;
    protected method: string;
    protected data: RequestParams | undefined
    protected cookies: Cookies
    protected TEST_MODE: boolean

    constructor(baseURL: string, method: string, data: RequestParams | undefined) {
        this.baseURL = window.location.origin + baseURL
        this.method = method
        this.data = data
        this.cookies = new Cookies()
        this.TEST_MODE = true
    }

    // 發送請求
    public async sendRequest() {
        // axios request
        return await axios({
            method: this.method,
            url: this.baseURL,
            withCredentials: this.TEST_MODE,
            data: this.data,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.cookies.get("csrftoken")
            }
        }).then((response) => {
            const resData: ResponseData = {
                message: response.data.message,
                status: response.status
            }
            return resData
        }).catch((error: AxiosError) => {
            return this.handleError(error)
        })
    }

    // 處理錯誤
    protected handleError(error: AxiosError) {
        if (error.response) {
            const data = error.response?.data as { message: string; status: number }
            // 回應錯誤
            console.error("Error Response:", data.message || error.message)
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error("Error Request:", error.request)
            // 提示用户请求超时
            alert("請求超時，請再試一次")
        } else {
            // 其他错误
            console.error("Error Message:", error.message)
        }
        const data = error.response?.data as { message: string; status: number }
        const resData: CSRF_cookies = {
            message: data.message || error.message,
            status: error.response ? error.response.status : 500,
            isAuthenticated: false,
            username: 'nobody'
        }
        return resData
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

    public async sendRequest_sessionAndUserinfo() {
        return await axios({
            method: this.method,
            url: this.baseURL,
            withCredentials: this.TEST_MODE,
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": this.cookies.get("csrftoken")
            }
        }).then((response) => {
            const resData: CSRF_cookies = {
                message: "",
                status: 200,
                isAuthenticated: response.data.isAuthenticated,
                username: response.data.username
            }
            return resData
        }).catch((error: AxiosError) => {
            return this.handleError(error)
        })
    }
}


export {API_GET, API_POST}