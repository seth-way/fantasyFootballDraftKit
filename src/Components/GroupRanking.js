import React from 'react';
import Player from './Player';
import './GroupRanking.css'

const GroupRanking = ({ players, group, toggleTaken, addToTeam }) => {
    return (
        <div className="Ranking">
            <div className="RankingHeader">
                {group}
            </div>
            <div className="Rankings">
                {players.length ?
                    players.map((player) => 
                        <Player player={player} toggleTaken={toggleTaken} addToTeam={addToTeam} />
                    ) :
                ''}
            </div>
        </div>
    );
};

export default GroupRanking;
