import Box from '@mui/material/Box';
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { StyledTableRow, StyledTableCell } from '../GeneralComponents/TableSettings/TableStyle';


export default function ProfilePicture(props) {
  
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