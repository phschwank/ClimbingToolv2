import * as React from 'react';
import Header from './Header';

const Welcome = () => {
    return (
        <div>
            <Header 
                routes={{ route1: 'Chat', route2: 'Routen'}} 
                title={'Startseite'}
            />
            <section>
            <h1>Startseite</h1>
            <br />
            <p>Willkommen auf der Startseite</p>
            </section>
        </div>
    )
}

export default Welcome