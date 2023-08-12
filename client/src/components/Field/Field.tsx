import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFailCount } from '../../redux/slices/configSlice';

const Field = () => {
    const dispatch = useAppDispatch();
    const failCount = useAppSelector((state) => state.config.failCount);
    const [inputValue, setInputValue] = useState<number>(failCount);
    let timer: NodeJS.Timeout;

    useEffect(() => {
        setInputValue(failCount);
    }, [failCount]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(parseInt(event.target.value));
        clearTimeout(timer);

        if (event.target.value !== '') {
            timer = setTimeout(() => {
                dispatch(setFailCount(parseInt(event.target.value)));
            }, 1000);
        }
    };

    return (
        <Box sx={{ width: '100%', mb: '30px' }}>
            <TextField
                value={inputValue > 1000 ? 1000 : inputValue}
                size="small"
                type="number"
                color="success"
                onChange={handleChange}
                fullWidth
                inputProps={{
                    min: 0,
                    max: 1000,
                    maxLength: 4,
                }}
            />
        </Box>
    );
};

export default Field;
