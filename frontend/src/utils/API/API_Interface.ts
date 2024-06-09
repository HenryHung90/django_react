// Request 訊息內容
interface RequestParams {
    message: string
}

// Response 訊息內容
interface ResponseData {
    message: string
    status: number
}

// csrf cookie Response
interface CSRF_cookies extends ResponseData {
    isAuthenticated: boolean
    username: string
}


// API Extension ---------------------------------------------------------
interface Req_login extends RequestParams {
    username: string
    password: string
}

interface Req_register extends RequestParams {
    class_number: number
    username: string
    password: string
    name: string
}


export type{RequestParams, ResponseData, CSRF_cookies, Req_login, Req_register}