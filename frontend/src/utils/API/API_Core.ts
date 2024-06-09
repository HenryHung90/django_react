import {Req_login, Req_register} from "./API_Interface";
import {API_GET, API_POST} from "./API_Config";

/**
 * 註冊新使用者
 * @param classNumber 使用者屆數
 * @param acc 使用者帳戶
 * @param psw 使用者密碼
 * @param name 使用者名稱
 * @constructor
 */
const API_register = (classNumber: number, acc: string, psw: string, name: string) => {
    const registerData: Req_register = {
        message: "register user",
        class_number: classNumber,
        username: acc,
        password: psw,
        name: name
    }
    return new API_POST(process.env.REACT_APP_API_REGISTER || '', registerData).sendRequest()
}
/**
 * 登入功能
 * @param acc{string} 登入帳號
 * @param psw{string} 登入密碼
 * @constructor
 */
const API_login = (acc: string, psw: string) => {
    const loginData: Req_login = {
        message: 'login request',
        username: acc,
        password: psw,
    }
    return new API_POST(process.env.REACT_APP_API_LOGIN || '', loginData).sendRequest()
}
const API_logout = () => {
    return new API_GET(process.env.REACT_APP_API_LOGOUT || '').sendRequest()
}
/**
 * 取得 Session
 * @constructor
 */
const API_getSession = () => {
    return new API_GET(process.env.REACT_APP_API_GET_SESSION || '').sendRequest_sessionAndUserinfo()
}
/**
 * 取得 User 的資料
 * @constructor
 */
const API_getUserInfo = () => {
    return new API_GET(process.env.REACT_APP_API_GET_USERINFO || '').sendRequest_sessionAndUserinfo()
}

export {API_login, API_logout, API_getSession, API_getUserInfo, API_register}