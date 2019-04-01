import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import db from './db';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    data: {}
  }

  async componentDidMount() {
    try {
      const apiUrl = 'https://cors-anywhere.herokuapp.com/https://shielded-hamlet-17516.herokuapp.com/api/whoami';
      const res = await fetch(apiUrl);
      const data = await res.json();
      await db.collection('users').doc(data.ipaddress).set({
        ...data
      });

      this.setState({
        loading: false,
        data
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading } = this.state;
    if(loading) {
      return (
        <main className="app container">
          <Spinner name="ball-pulse-sync" color="white"/>
        </main>
      )
    }

    return (
      <>
        <main className="app container">
          <h1 className="center">Happy April Fool's Day</h1>
        </main>
        <p className="footer">Made with ❤ by cy</p>
      </>
    );
  }
}

export default App;
