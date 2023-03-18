import Box from '@mui/material/Box';
import React from "react";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { StyledTableRow, StyledTableCell } from '../GeneralComponents/TableSettings/TableStyle';


export default function ProfilePicture(props) {
  
  function createData(spot, route, grade, userGrade, topped, tries, score, comment) {
    return { spot, route, grade, userGrade, topped, tries, score, comment };
  }
  
  const rows = [
    createData('Schartenflue', 'Sensitive', '6b+', '6b+', 'Ja', 3, 3, 'Nett'),
    createData('Eppenberg', 'Tschortschi 1', '6b', '6b', 'Nein', 'n.A.', 4, 'dreckig'),
    createData('Gueberschwihr', 'Lamiak de droit', '5c', '5c+', 'Ja', 1, 4, 'Exen schlecht positioniert'),
    createData('Eppenberg', 'Tschortschi 1', '6b', '6b', 'Nein', 'n.A.', 4, 'dreckig'),
    createData('Gueberschwihr', 'Lamiak de droit', '5c', '5c+', 'Ja', 1, 4, 'Exen schlecht positioniert'),
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" >
        Deine letzten Einträge
      </Typography>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell>Spot</StyledTableCell>
                  <StyledTableCell align="right">Route</StyledTableCell>
                  <StyledTableCell align="right">Grad</StyledTableCell>
                  <StyledTableCell align="right">Subj. Grad</StyledTableCell>
                  <StyledTableCell align="right">Getoppt</StyledTableCell>
                  <StyledTableCell align="right">Versuche</StyledTableCell>
                  <StyledTableCell align="right">Bewertung</StyledTableCell>
                  <StyledTableCell align="right">Kommentar</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{row.spot}</StyledTableCell>
                  <StyledTableCell align="right">{row.route}</StyledTableCell>
                  <StyledTableCell align="right">{row.grade}</StyledTableCell>
                  <StyledTableCell align="right">{row.userGrade}</StyledTableCell>
                  <StyledTableCell align="right">{row.topped}</StyledTableCell>
                  <StyledTableCell align="right">{row.tries}</StyledTableCell>
                  <StyledTableCell align="right">{row.score}</StyledTableCell>
                  <StyledTableCell align="right">{row.comment}</StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
      </TableContainer>
    </Box>
  );
}