import React from 'react';
import './MyTeam.css'
import MyTeamSlot from './MyTeamSlot';

const MyTeam = ({ myTeam, removeFromTeam }) => {
    const slots = Object.keys(myTeam);
    console.log(slots);
    return (
        <div className="MyTeam">
            <div style={{color: 'red', fontWeight: 'bold'}}>
                MY TEAM
            </div>
            <div className="MyTeamByPosition">
                {slots.map((slot) => <MyTeamSlot players={myTeam[slot]} slot={slot} removeFromTeam={removeFromTeam} />)}
            </div>
        </div>
    );
};

export default MyTeam;
