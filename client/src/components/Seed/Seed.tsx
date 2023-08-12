import {Box, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {useAppDispatch} from "../../redux/hooks";
import {setFailCount, setSeed} from "../../redux/slices/configSlice";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import React, {useEffect, useState} from "react";



const Seed = () => {
    const dispatch = useAppDispatch()
    let timer: NodeJS.Timeout;
    const [inputValue, setInputValue] = useState("0");

    useEffect(() => {
        clearTimeout(timer);

        if (inputValue !== "") {
            timer = setTimeout(() => {
                dispatch(setSeed(parseInt(inputValue)));
            }, 1000);
        }
    }, [inputValue]);

    const generateSeed = () => {
        const newValue = Math.floor(Math.random() * 1000) + 1;
        setInputValue(newValue.toString());
    };

    const handleSeed = (target: HTMLTextAreaElement | HTMLInputElement) => {
        setInputValue(target.value)
    }




    return(
        <Box sx={{width:'100%'}}>
            <OutlinedInput
                defaultValue={0}
                value={inputValue}
                onChange={e =>  handleSeed(e.target)}
                fullWidth
                size={'small'}
                label="Seed"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={generateSeed}>
                            <ShuffleRoundedIcon/>
                        </IconButton>
                    </InputAdornment>
                } />

        </Box>
    )
}


export default Seed