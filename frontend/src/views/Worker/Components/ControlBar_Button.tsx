import React from "react";
// style
import {Button} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";

// API

// components

// interface
import {ControlBarButton_Props} from "../../../utils/Interface/Worker/Worker";


const ControlBar_Button = (props: ControlBarButton_Props) => {
    const {type, controlPanel, codeSync} = props
    return (
        <Button
            sx={{
                mx: 1,
                backgroundColor: type === 'leave' ? '#cc5757' : '#57cc99',
                '&:hover': {
                    backgroundColor: type === 'leave' ? '#ff5757' : '#57ff99'
                }
            }}
            onClick={controlPanel[type]}
        >
            {type === 'save' && <SaveIcon sx={{color: codeSync ? 'white' : '#d62828', margin: '0 auto'}}/>}
            {type === 'leave' && <LogoutIcon sx={{color: 'white', margin: '0 auto'}}/>}
        </Button>
    )
}
export default ControlBar_Button