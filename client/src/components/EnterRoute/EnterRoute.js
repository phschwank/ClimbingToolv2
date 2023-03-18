import * as React from 'react';
import Header from '../GeneralComponents/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Welcome = () => {

    // Es muss noch ein Offset für den Header eingebaut werden, damit der Scroll-Balken früher erscheint

    return (
        <div>
            <Header 
                routes={{ route1: { link: '/willkommen', name: 'Startseite'}, route2: {link: '/chat', name: 'Chat'}}} 
                title={'Routen erfassen'}
            />
            <Box sx={{ flexGrow: 1, mt: '3rem' }}>
                <Grid container spacing={2}>
                    Test
                </Grid>
            </Box>
        </div>
    )
}

export default Welcome