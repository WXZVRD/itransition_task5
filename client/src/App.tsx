import React, {useEffect} from 'react';
import {Box, Container, Typography} from "@mui/material";
import TableRow from "./components/TableRow/TableRow";
import Header from "./components/Header/Header";
import TableList from "./components/TableList/TableList";

function App() {



  return (
   <Box sx={{bgcolor: '#F9F9FC'}}>
       <Container >
           <Header/>
           <TableList/>
       </Container>
   </Box>
  );
}

export default App;
