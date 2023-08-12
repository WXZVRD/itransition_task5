import React, { useState, useEffect } from 'react';
import MUISlider from '@mui/material/Slider';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFailCount } from '../../redux/slices/configSlice';

const Slider = () => {
    const dispatch = useAppDispatch();
    const failCount = useAppSelector((state) => state.config.failCount);
    const [sliderValue, setSliderValue] = useState<number>(failCount);

    function valuetext(value: number) {
        return `${value}`;
    }

    useEffect(() => {
        if (failCount > 10) {
            setSliderValue(10);
        } else {
            setSliderValue(failCount);
        }
    }, [failCount]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const newSliderValue = typeof newValue === 'number' ? newValue : newValue[0];
        setSliderValue(newSliderValue);
        dispatch(setFailCount(newSliderValue));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <MUISlider
                aria-label="Temperature"
                value={sliderValue}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
            />
        </Box>
    );
};

export default Slider;
