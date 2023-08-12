import { Autocomplete, TextField, Box } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setLocal } from "../../redux/slices/configSlice";
import { Locale } from "../../redux/slices/configSlice";

interface CountryType {
    code: string;
    label: string;
    phone: string;
    value: Locale;
    suggested?: boolean;
}

const Local = () => {
    const dispatch = useAppDispatch();
    let timer: NodeJS.Timeout;

    const handleLocal = (option: CountryType) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            dispatch(setLocal({str: option.value, code: option.phone}));
        }, 1000);
    };

    const countries: readonly CountryType[] = [
        { code: 'PL', label: 'Polish', phone: '+1', value: 'pl' },
        { code: 'UA', label: 'Ukraine', phone: '+380', value: 'uk' },
        { code: 'IT', label: 'Italian', phone: '+39', value: 'it' }];

    return (
        <Autocomplete
            color='success'
            id="country-select-demo"
            sx={{ bgcolor: '#F3F3F8', mb: '30px' }}
            options={countries}
            size={"small"}
            defaultValue={countries[0]}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    <span onClick={() => handleLocal(option)}>{option.label} ({option.code}) {option.phone}</span>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
};

export default Local;
