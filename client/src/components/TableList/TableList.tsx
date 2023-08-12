import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData, fetchMoreData } from "../../redux/slices/dataSlice";
import {TableContainer, Paper, TableCell, TableRow, TableHead, CircularProgress, Box} from "@mui/material";
import { setPage } from "../../redux/slices/configSlice";
import { TableVirtuoso } from "react-virtuoso";

const TableList = () => {
    const dispatch = useAppDispatch();
    const config = useAppSelector((state) => state.config);
    const { list, status } = useAppSelector((state) => state.data);

    const [num, setNum] = useState(2);

    const loadMore = () => {
        dispatch(fetchMoreData({ iseed: config.seed, locale: config.locale, page: num, failCount: config.failCount  }));
        setNum((prevNum) => prevNum + 1);
    };

    useEffect(() => {
        setNum(2)
        if (status !== "loading") {
            dispatch(fetchData({ iseed: config.seed, locale: config.locale, page: config.pageCount, failCount: config.failCount }));
        }
    }, [config]);

    const rowContent = (index:any) => {
        const row = list[index];
        return (
            <TableRow sx={{width:'3000px'}} key={index}>
                <TableCell
                    align={'left'}
                    width='70px'
                >{index}</TableCell>
                <TableCell width='260px'>{row.fullName}</TableCell>
                <TableCell width='290px'>
                    {row.address.country} {row.address.city} {row.address.street}
                </TableCell>
                <TableCell width='300px'>{row.uid}</TableCell>
                <TableCell width='300px'>{row.phone}</TableCell>
            </TableRow>
        );
    };

    const header = () => {
        return (
            <TableHead sx={{bgcolor:'white', width:'1150px', justifyContent:'space-between'}}>
                <TableRow sx={{width:'1250px',}}>
                    <TableCell >Num</TableCell>
                    <TableCell width='300px'>Full Name</TableCell>
                    <TableCell width='300px'>Address</TableCell>
                    <TableCell width='300px'>UID</TableCell>
                    <TableCell width='300px'>Phone</TableCell>
                </TableRow>
            </TableHead>
        )
    }

    return (
        <TableContainer sx={{width:'1150px'}} component={Paper}>
                <TableVirtuoso
                    style={{ height: 500, width: "1150px", justifyContent:'space-between' }}
                    data={Array.from({ length: list.length })}
                    itemContent={rowContent}
                    endReached={loadMore}
                    fixedHeaderContent={header}
                    components={{
                        TableHead: TableHead,
                        TableFoot: CircularProgress
                    }}
                />
        </TableContainer>
    );
};

export default TableList;
