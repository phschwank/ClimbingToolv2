import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export default function Header(props) {

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Item>Placeholder Chat-Verlauf</Item>
    </Box>
  );
}