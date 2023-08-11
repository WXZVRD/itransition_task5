import ArrowCircleDownRoundedIcon from '@mui/icons-material/ArrowCircleDownRounded';
import { Button } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Parser } from '@json2csv/plainjs';

const ButtonCSV = () => {
    const list = useAppSelector(state => state.data.list);

    const downloadCSV = () => {
        try {
            const fields = ['fullName', 'uid', 'address.city', 'address.state', 'address.street', 'phone'];

            const parser = new Parser({ fields });
            const csv = parser.parse(list);

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            link.click();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button variant="contained" endIcon={<ArrowCircleDownRoundedIcon />} onClick={downloadCSV}>
            Export to CSV
        </Button>
    );
};

export default ButtonCSV;
