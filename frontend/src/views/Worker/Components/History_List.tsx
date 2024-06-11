import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Editor} from "@monaco-editor/react"

// style
import {
    Button,
    Card,
    Box,
    CardActions,
    CardContent,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material"
import CodeIcon from '@mui/icons-material/Code'
import RestoreIcon from '@mui/icons-material/Restore'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DeleteIcon from "@mui/icons-material/Delete"
// API
import {calculateTimeDifference} from "../../../utils/Tools/time"
import {API_POST_studentProgram} from "../../../utils/API/API_POST"

// Components
// interface
import {HistoryList_Props, studentProgramUpdate} from '../../../utils/Interface/Worker/Worker'

// Editor 編輯器(僅限讀取)
const ReadOnlyEditor: React.FC<{ code: string; language: string }> = ({code, language}) => {
    return (
        <Editor
            height='300px'
            theme='vs-dark'
            value={code}
            language={language}
            options={{readOnly: true}}
        />
    )
}

const History_List = (props: HistoryList_Props) => {
    const {value, index, alertAndLoad} = props
    // 是否開啟程式紀錄
    const [openCode, setOpenCode] = useState(false)
    // Params
    const {program_id} = useParams();

    function handleRecoverHistory() {
        if (window.confirm("確定回復到該紀錄?")) {
            alertAndLoad.setLoading(true)
            const updateData: studentProgramUpdate = {
                program_id: program_id,
                html_code: value.html_code,
                css_code: value.css_code,
                javascript_code: value.javascript_code
            }
            API_POST_studentProgram(JSON.stringify(updateData), 'update').then(response => {
                window.location.reload()
            })
        }
    }

    function handleDeleteHistory() {
        if (window.confirm("確定刪除該紀錄?")) {
            alertAndLoad.setLoading(true)
        }
    }

    return (
        <Card
            key={index}
            sx={{mx: 1, my: 1, px: 2, py: 1, width: 250}}
        >
            <Dialog
                open={openCode}
                fullWidth
                maxWidth='lg'
                onClose={() => {
                    setOpenCode(false)
                }}
            >
                <DialogTitle sx={{fontSize: 24, fontWeight: "bold", fontFamily: 'monospace'}}>
                    History: {value.time}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>HTML</DialogContentText>
                    <ReadOnlyEditor code={value.html_code} language={'html'}/>
                    <DialogContentText>CSS</DialogContentText>
                    <ReadOnlyEditor code={value.css_code} language={'css'}/>
                    <DialogContentText>JS</DialogContentText>
                    <ReadOnlyEditor code={value.javascript_code} language={'javascript'}/>
                </DialogContent>
                <DialogActions>
                    <Button
                        size="small"
                        variant='contained'
                        startIcon={<RestoreIcon/>}
                        onClick={handleRecoverHistory}
                    >回復至此</Button>
                    <Button
                        size="small"
                        color='error'
                        variant='contained'
                        onClick={handleDeleteHistory}
                    ><DeleteIcon/></Button>
                    <Button onClick={() => {
                        setOpenCode(false)
                    }}>關閉</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <EventNoteIcon sx={{marginRight: 1, fontSize: 18}}/>
                <Typography variant='overline'> 大約 {calculateTimeDifference(value.time)} 前</Typography>
            </Box>
            <CardContent>
                <Typography variant="subtitle2" color='text.secondary'>編輯時間:{value.time}</Typography>
                <Typography variant="subtitle2" color='text.secondary'>檔案大小:約 {value.size} byte</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant='contained'
                    startIcon={<CodeIcon/>}
                    onClick={() => {
                        setOpenCode(true)
                    }}
                >程式</Button>
                <Button
                    size="small"
                    variant='contained'
                    startIcon={<RestoreIcon/>}
                    onClick={handleRecoverHistory}
                >回復</Button>
                <Button
                    size="small"
                    sx={{
                        color: 'rgba(0,0,0,0.4)',
                        '&:hover': {
                            backgroundColor:'rgba(25,118,210,0.1)'
                        }
                    }}
                    onClick={handleDeleteHistory}
                ><DeleteIcon/></Button>
            </CardActions>
        </Card>
    )
}

export default History_List