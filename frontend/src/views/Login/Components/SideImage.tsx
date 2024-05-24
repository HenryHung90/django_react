import React from "react";
import {Grid} from "@mui/material";

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