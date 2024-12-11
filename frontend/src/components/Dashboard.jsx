import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import {Container, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';


import ItemsContext from '../contexts/ItemsContext'; // Adjust the path as needed
import ItemsTable from "./ItemsTable";


function Dashboard() {
  const items = useContext(ItemsContext);
  const theme = useTheme();

  return (
    <Container maxWidth="lg" style={{ padding: theme.spacing(2) }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Divider></Divider>
      <Box>
        <ItemsTable items={items}/>
      </Box>
    </Container>
  );
}

export default Dashboard;
