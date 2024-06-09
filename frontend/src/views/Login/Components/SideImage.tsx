import React from "react";
// style
import {Grid} from "@mui/material";

// API

// components

// interface

const SideImage = () => {
    return (
        <Grid
            xs={12}
            sm={4}
            sx={{
                backgroundImage: "url(../media/login.jpg)",
                backgroundSize: "cover",
                backgroundPositionX: -340,
            }}/>
    )
}

export default SideImage
export {}