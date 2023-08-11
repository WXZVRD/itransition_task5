import { Box, CircularProgress, Skeleton } from "@mui/material";
import TableRow from "../TableRow/TableRow";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchData, fetchMoreData } from "../../redux/slices/dataSlice";
import InfiniteScroll from 'react-infinite-scroller';

const TableList = () => {
    const dispatch = useAppDispatch();
    const config = useAppSelector(state => state.config);
    const { list, status } = useAppSelector(state => state.data);

    const [num, setNum] = useState(2);

    const loadMore = () => {
        setNum(num + 1);
        dispatch(fetchMoreData({ iseed: config.seed, locale: config.locale, page: num }));
    };

    useEffect(() => {
        if (status !== "loading") {
            dispatch(fetchData({ iseed: config.seed, locale: config.locale, page: config.pageCount, failCount: config.failCount }));
        }
    }, [config]);

    return (
        <Box>
            {status === "loaded" ? (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={true}
                    loader={<CircularProgress color="secondary" />}
                    className="infinite-scroll"
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '16px',
                            width: '100%',
                            padding: '16px',
                        }}
                    >
                        {list.map((el, index) => (
                            <TableRow
                                key={index}
                                index={index}
                                fullName={el.fullName}
                                uid={el.uid}
                                address={el.address}
                                phone={el.phone}
                            />
                        ))}
                    </Box>
                </InfiniteScroll>
            ) : (
                Array.from({ length: 20 }).map((_, index) => (
                    <Skeleton key={index} width="100%" height="50px" />
                ))
            )}
        </Box>
    );
};

export default TableList;
