import {Box, Typography} from "@mui/material";
import React, {FC} from "react";

export interface IRowProps {
    index: number | string;
    fullName: string;
    uid: string;
    address: {
        country?: string;
        city?: string;
        street?: string;
    };
    phone: string;
}

const TableRow: FC<IRowProps> = ({ index, fullName, uid, address, phone }) => {
    return (
        <Box sx={{height:'260px', padding: '20px 10px', alignItems:'flex-start', justifyContent:'center', display:'flex', flexDirection:'column', border:'1px solid #eeeef2'}}>
            <Typography color='#484964' sx={{mr:'3rem', padding:'0 20px'}}>
                <b>Number</b> : { index }.
            </Typography>
                <Typography color='#484964' sx={{padding:'0 20px', mt:'10px'}}>
                    <b>Full Name</b> : { fullName }.
                </Typography>
                <Typography color='#484964' sx={{padding:'0 20px', mt:'10px'}}>
                    <b>UID</b> : { uid }.
                </Typography>
                <Typography color="#484964" sx={{ padding: "0 20px", mt:'10px' }}>
                    <b>Address</b> : {address.country && `${address.country}, `}
                    {address.city && `${address.city}, `}
                    {address.street && `${address.street}.`}
                </Typography>
                <Typography color='#484964' sx={{padding:'0 20px', mt:'10px'}}>
                    <b>Phone</b> : { phone }
                </Typography>
        </Box>
    )
}


export default TableRow