import Box from '@mui/material/Box';
import React from "react";
import defaultPicture from './Default.jpg'
import Grid from '@mui/material/Grid';


export default function ProfilePicture(props) {

  // ergänzen, dass Default-Bild nur angezeigt wird, wenn kein anderes über die props mitgegeben wurde

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <img
            src={defaultPicture}
            alt="Default"
            height="200"
          />
        </Grid>
      </Grid> 
    </Box>
  );
}