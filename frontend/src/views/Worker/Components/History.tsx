import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom";

// style
import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@mui/material"
import HistoryIcon from '@mui/icons-material/History';
// API
import {API_GET_studentProgram} from "../../../utils/API/API_GET";
// Components
import History_List from './History_List'
// interface
import {historyValue, History_Props} from '../../../utils/Interface/Worker/Worker'

const History = (props: History_Props) => {
    const {alertAndLoad} = props
    // 控制 History 開闔
    const [historyDown, setHistoryDown] = useState<boolean>(false)
    // History List
    const [historyList, setHistoryList] = useState<Array<historyValue>>([])
    // Params
    const {program_id} = useParams();

    useEffect(() => {
        if (historyDown) {
            API_GET_studentProgram(program_id || '', 'gethistory').then(response => {
                const historyData = JSON.parse(response.message)
                setHistoryList(historyData.reverse())
            })
        }
    }, [historyDown]);


    function handleHistoryDown() {
        setHistoryDown(prevState => !prevState)
    }

    return (
        <Container
            id='Worker_History_historyContainer'
            sx={{
                overflow: 'hidden',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                width: '100vw',
                maxWidth: '100vw !important',
                height: '100vh',
                zIndex: 1004,
            }}
        >
            <Box sx={{
                width: '95%',
                height: '100%',
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                transitionDuration: '0.5s',
                marginTop: 16,
                transform: historyDown ? 'translateX(48%)' : 'translateX(64%)',
            }}>
                <Box
                    id='Worker_History_historyBtn'
                    sx={{
                        width: '3%',
                        height: '10%',
                        borderRadius: '20px 0 0 20px',
                        boxShadow: '0 0 2px 1px #fca311',
                        display: 'flex',
                        transitionDuration: '0.5s',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'all',
                        color: '#e5e5e5',
                        backgroundColor: '#fca311',
                        '&:hover': {
                            color: '#14213d'
                        }
                    }}
                    onClick={handleHistoryDown}
                >
                    <HistoryIcon/>
                </Box>
                <Box
                    id='Worker_History_historyList'
                    sx={{
                        width: 300,
                        height: '80%',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255,255,255, 0.5)',
                        pointerEvents: 'all',
                        overflowY: 'scroll',
                    }}
                >
                    {
                        historyList.map((value, index) => (
                            <History_List value={value} index={index} alertAndLoad={alertAndLoad}/>
                        ))
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default History