import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// style
import {
    Grid,
    Container,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
// API
import {API_studentprogram} from "../../../utils/API/API_POST"

// components

// interface
import {ResponseData} from "../../../utils/API/API_Interface"
import {ProgramList} from '../../../utils/Interface/programList'
import {ProgramCard_Props} from "../../../utils/Interface/Home/Home";


const ProgramCard = (props: ProgramCard_Props) => {
    const {alertAndLoad} = props
    const [programList, setProgramList] = useState<Array<ProgramList>>([])
    const NavLocation = useNavigate()
    useEffect(() => {
        alertAndLoad.setLoading(true)
        API_studentprogram('', 'getall').then((response: ResponseData) => {
            setProgramList(JSON.parse(response.message))
            alertAndLoad.setLoading(false)
        })
    }, []);


    return (
        <Container maxWidth='lg' sx={{py: 4}}>
            <Grid container spacing={2}>
                {programList.map((program) => (
                    <Grid xs={12} md={3} sx={{display: 'flex', justifyContent: "center"}}>
                        <Card sx={{width: 245, mx: 2, my: 3}} onClick={(e) => {
                            alertAndLoad.setLoading(true)
                            NavLocation(`/Worker/${program.program_id}`)
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 140,
                                        backgroundColor: 'blue', // 这里设置纯色背景
                                    }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {program.program_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        最後編輯時間:{program.last_edit_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        加入時間:{program.join_date}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant='contained' startIcon={<CreateIcon/>} size="small">變更名稱</Button>
                                <Button variant='contained' color='error' startIcon={<DeleteIcon/>}
                                        size="small">刪除</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ProgramCard