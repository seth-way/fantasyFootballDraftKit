import React from 'react';
import './Player.css'

const colorPicker = {
    QB: '#ffc09f',
    WR: '#ffee93',
    RB: '#a0ced9',
    TE: '#adf7b6',
}



const Player = ({ player, toggleTaken, addToTeam }) => {
    const {
        Position,
        PositionRank,
        Key,
        Taken,
        Rank,
        Name,
        Team,
        Pos,
        Bye,
        ADP,
        vs_ADP
    } = player;

    const defaultStyle = {
        backgroundColor: colorPicker[Position],
    }
    
    const takenStyle = {
        fontSize: '11px',
        backgroundColor: 'darkgray'
    }

    const round = Math.ceil(ADP / 10);

    return (
        <div className="Player" style={Taken ? takenStyle : defaultStyle}>
            <span className="MarkTaken" onClick={(e) => toggleTaken(e)} value={Key}></span>
            <span>
            <div>
                {Name}
            </div>
            <div className="Stats" style={Taken ? {display: 'none'} : {}}>
                {Team + ' - wk ' + Bye + ' - rnd ' + round} 
            </div>
            </span>
            <span className="AddToTeam" style={Taken ? {display: 'none', justifyContent: "spaceEvenly"} : {}} onClick={(e) => addToTeam(e)} value={Key}></span>
        </div>
    );
}

export default Player;
