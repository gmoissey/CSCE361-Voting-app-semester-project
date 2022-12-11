import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Welcom to Voting Protal</h1>
        <p>Here you can make your online vote!</p>
        {
          sessionStorage.getItem('authenticated') === 'true' ?
            <a href="/votingmenu">View Current Elections!</a>
            :
            null
        }
      </div>
    );
  }
}
