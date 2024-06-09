import React from "react";

// style
import {Box} from "@mui/material";

// API

// components

// interface

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