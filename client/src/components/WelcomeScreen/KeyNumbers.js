import Box from '@mui/material/Box';
import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ProfilePicture(props) {

  // ergänzen, dass Daten dynamisch aus Datenbank geholt werden
  // ergänzen, dass die beiden Tabellen eine Basis-Komponente besitzen und alle Parameter dynamisch mitgegeben werden können

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, value) {
    return { name, value };
  }
  
  const rows = [
    createData('Alter', 29),
    createData('Grösse', '183 cm'),
    createData('Gewicht', '75 kg'),
    createData('Rotpunkt', '6b'),
    createData('Onsight', '6a'),
    createData('Flash', '6a+'),
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.value}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}