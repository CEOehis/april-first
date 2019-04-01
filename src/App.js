import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import db from './db';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    data: {},
    fools: 0,
  }

  async componentDidMount() {
    const tracked = window.localStorage.getItem('april-first');
    try {
      const apiUrl = 'https://cors-anywhere.herokuapp.com/https://shielded-hamlet-17516.herokuapp.com/api/whoami';
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (!tracked) {
        window.localStorage.setItem('april-first', data);
        await db.collection('users').doc().set({
          ...data
        });
      }

      const userCollection = await db.collection('users').get()

      this.setState({
        loading: false,
        data,
        fools: userCollection.size
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, fools } = this.state;
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
          {fools ? <p className="count">{fools} April fools and counting</p> : ''}
        </main>
        <p className="footer">Made with <strike>sinister motives</strike> ❤ by <a href="https://blog.ekohordan.com" target="_blank" rel="noopener noreferrer">me</a></p>
      </>
    );
  }
}

export default App;
