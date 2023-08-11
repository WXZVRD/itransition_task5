import {Box, Slide} from "@mui/material";
import Local from "../Local/Local";
import Slider from "../Slider/Slider";
import Field from "../Field/Field";
import Seed from "../Seed/Seed";
import ButtonCSV from "../ButtonCSV/ButtonCSV";


const Header = () => {
    return (
        <Box sx={{height:'150px', alignItems:'center', display:'flex', justifyContent: 'space-between'}}>
            <Box sx={{width:'30%'}}>
                <Local/>
                <Seed/>
            </Box>

            <ButtonCSV/>

            <Box sx={{width:'30%'}}>
                <Field/>
                <Slider/>
            </Box>
        </Box>
    )
}

export default Header