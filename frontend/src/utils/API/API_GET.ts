import {API_GET} from "./API_Config";

const API_GET_studentProgram = (content: string | null, type: 'getone' | 'getall' | 'gethistory') => {
    switch (type) {
        case "getall":
            return new API_GET(process.env.REACT_APP_API_STUDENTPROGRAM_GETALL || '').sendRequest()
        case "getone":
            return new API_GET(process.env.REACT_APP_API_STUDENTPROGRAM_GETONE + `?program_id=${content}` || '').sendRequest()
        case 'gethistory':
            return new API_GET(process.env.REACT_APP_API_STUDENTPROGRAM_GETHISTORY + `?program_id=${content}` || '').sendRequest()
    }

}


export {API_GET_studentProgram}