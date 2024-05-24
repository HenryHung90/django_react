import React from "react";
import {Box} from "@mui/material";

const Title = () => {
    return (
        <Box
            sx={{
                width: "90%",
                margin: "50px 0",
                textAlign: "center",
                fontSize: 100,
                fontFamily: "Roboto Condensed",
                userSelect: "none",
                "@media (max-width:600px)": {fontSize: 40}
            }}>
            YZU AI learning Lab
        </Box>
    )
}

export default Title
export {}