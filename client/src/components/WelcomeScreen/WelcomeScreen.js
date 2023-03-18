import * as React from 'react';
import Header from '../GeneralComponents/Header';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfilePicture from './ProfilePicture/ProfilePicture';
import KeyNumbers from './KeyNumbers';
import Chat from './Chat';
import LastEntries from './LastEntries';

const Welcome = () => {

    // Es muss noch ein Offset für den Header eingebaut werden, damit der Scroll-Balken früher erscheint

    return (
        <div>
            <Header 
                routes={{ route1: { link: '/Chat', name: 'Chat'}, route2: {link: '/willkommen/route', name: 'Route erfassen'}}} 
                title={'Startseite'}
            />
            <Box sx={{ flexGrow: 1, mt: '3rem' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ProfilePicture />
                    </Grid>
                    <Grid item xs={4}>
                        <KeyNumbers />
                    </Grid>
                    <Grid item xs={4}>
                        <Chat />
                    </Grid>
                    <Grid item xs={12}>
                        <LastEntries />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Welcome