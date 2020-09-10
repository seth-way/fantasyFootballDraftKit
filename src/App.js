import React, { Component } from 'react';
import GroupRanking from './Components/GroupRanking';
import MyTeam from './Components/MyTeam';
import logo from './logo.svg';
import './App.css';
import rankings from './rankings.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranks: {},
      myTeam: {
        QB: {},
        RB: {},
        WR: {},
        TE: {},
        FLEX: {},
        BENCH: {},
      }
    }

    this.toggleTaken = this.toggleTaken.bind(this);
    this.addToTeam = this.addToTeam.bind(this);
    this.removeFromTeam = this.removeFromTeam.bind(this);
  }

  componentDidMount() {
    const { positonRanks } = this.state;
    const ranks = {};
    
    rankings.forEach((player, idx) => {
      let temp = new Object(player);
      let position = player.Pos.slice(0,2);
      let PositionRank = parseInt(player.Pos.slice(2));

      temp.Position = position;
      temp.PositionRank = PositionRank;
      temp.Key = (player.Name + player.Pos).split(' ').join('');
      temp.Taken = false;

      ranks[temp.Key] = temp;
    });
    this.setState({ranks: ranks, updated: true});
  }

  toggleTaken({ target }) {
    const { ranks } = this.state;
    const key = target.getAttribute('value');
    ranks[key].Taken = !ranks[key].Taken;
    this.setState({ranks});
  }

  addToTeam({ target }) {
    const { ranks, myTeam } = this.state;
    const key = target.getAttribute('value');
    if (!ranks[key].Taken) {
      ranks[key].Taken = true;
      const player = ranks[key];
      const POS = ranks[key].Position;
      switch(POS) {
      case 'QB':
        if (Object.keys(myTeam.QB).length > 0) {
          myTeam.BENCH[key] = player;
        } else {
          myTeam.QB[key] = player;
        }
        break;
      case 'RB':
        if (Object.keys(myTeam.RB).length > 1) {
          if (Object.keys(myTeam.FLEX).length > 0) {
            myTeam.BENCH[key] = player;
          } else {
            myTeam.FLEX[key] = player;
          }
        } else {
          myTeam.RB[key] = player;
        }
        break;
      case 'WR':
        if (Object.keys(myTeam.WR).length > 1) {
          if (Object.keys(myTeam.FLEX).length > 0) {
            myTeam.BENCH[key] = player;
          } else {
            myTeam.FLEX[key] = player;
          }
        } else {
          myTeam.WR[key] = player;
        }
        break;
      case 'TE':
        if (Object.keys(myTeam.TE).length > 0) {
          if (Object.keys(myTeam.FLEX).length > 0) {
            myTeam.BENCH[key] = player;
          } else {
            myTeam.FLEX[key] = player;
          }
        } else {
          myTeam.TE[key] = player;
        }
        break;
      default: 
        console.log(POS)
      }
      this.setState({ranks: ranks, myTeam: myTeam});
    }
  }

  removeFromTeam({ target }) {
    const key = target.getAttribute('value');
    const { myTeam, ranks } = this.state;
    ranks[key].Taken = false;
    ['QB', 'RB', 'WR', 'TE', 'FLEX', 'BENCH'].forEach((slot) => {
      if (myTeam[slot][key]) {
        delete myTeam[slot][key];
      }
    })
    this.setState({ myTeam, ranks });
  }

  render() {
    const { ranks, myTeam } = this.state;
    const rankingsByPosition = {
      QB: [],
      RB: [],
      WR: [],
      TE: [],
    };

    Object.keys(ranks).forEach((key) => {
      let POS = ranks[key].Position;
      if (POS === 'QB' || POS ==='RB' || POS ==='WR' || POS === 'TE') {
        rankingsByPosition[POS].push(ranks[key]);
      }
    });
      
    return (
      <div className="App">
        <header className="App-header">
          <span>
          <img src={logo} className="App-logo" alt="logo" />
          </span>
          <span>
          <p>
            Fantasy Football 2020
          </p>
          </span>
        </header>
        <div className="PositionGroups">
          <GroupRanking
            group={'Overall'}
            players={Object.keys(ranks).map((key) => (ranks[key]))}
            toggleTaken={this.toggleTaken}
            addToTeam={this.addToTeam}
          />
          {Object.keys(rankingsByPosition).map((position) =>
            <GroupRanking group={position}
              players={rankingsByPosition[position]}
              toggleTaken={this.toggleTaken}
              addToTeam={this.addToTeam}
            />
          )}
        <MyTeam myTeam={myTeam} removeFromTeam={this.removeFromTeam} />
        </div>

      </div>
    );
  }
}

export default App;
