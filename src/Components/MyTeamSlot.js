import React from 'react';
import './MyTeamSlot.css'

const colorPicker = {
    QB: '#ffc09f',
    WR: '#ffee93',
    RB: '#a0ced9',
    TE: '#adf7b6',
}

const renderPlayers = (players, func) => {
    if (Object.keys(players).length === 0) {
        return (<div>none</div>);
    }
    return Object.keys(players).map((key) => (
        <div>
            <a
                className="RemovePlayer"
                onClick={(e)=>{func(e)}}
                value={key}
            >X</a>{' '}{players[key].Name} - {players[key].Bye}
        </div>
    ));
}

const MyTeamSlot = ({ players, slot, removeFromTeam }) => {
    return (
        <div className="MyTeamSlot">
            <div className="MTSHeader">
                {slot}
            </div>
            <div className="MyTeamByPosition">
                {renderPlayers(players, removeFromTeam)}
            </div>
        </div>
    );
};

export default MyTeamSlot;
