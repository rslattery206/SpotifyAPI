import { useEffect } from 'react';
import { useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import './App.css';
const safeJsonStringify = require("safe-json-stringify")
const queryString = require('query-string')
const darkSideOfTheMoon = '4LH4d3cOWNNsVw41Gqt2kv'
const redirect_uri = 'http://localhost:3000/'
// f820c80b31f2494bbaaebf7317c588b5





function parseAccessToken() {
  const location = window.location.href
  const query = location.slice(location.indexOf("#"))
  if (query.length > 0) {
    let params = queryString.parse(query)
    return params.access_token
  }
  return null
}

function getAccessToken(id) {
  const authorize_url = 'https://accounts.spotify.com/authorize?' + 
  queryString.stringify({
    response_type: 'token',
    client_id: id,
    redirect_uri: redirect_uri,
  })
  window.location = authorize_url
}

async function getAlbumTracks(id, token) {
  let url = `https://api.spotify.com/v1/albums/${id}/tracks`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    withCredentials: true,
    credentials: 'same-origin',
    crossdomain: true,
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data
  })
}


function App() {
  const [client_id, setClient_id] = useState('');
  const [message, setMessage] = useState('');

  const handleClientIdInput = event => {
    setClient_id(event.target.value);
    console.log("changed to " + event.target.value);
  }


  return (
    <div style={{color: 'blueviolet'}}>
      <h1>Welcome to the Spotify API Caller</h1><br/>
      <p>Enter Client ID and Authorize Spotify before calling APIs:</p>
      <input 
        type="text"
        id="client_id"
        onChange={handleClientIdInput} 
        value={client_id}/>
      <button onClick={() => getAccessToken(client_id)}> Authorize Spotify </button>
      <br/>
      <button onClick={() => setMessage(parseAccessToken())}> Get Access Token </button>
      <button onClick={() => (getAlbumTracks(darkSideOfTheMoon, parseAccessToken()))}> Get Album Tracks </button>
      <p>{message}</p>
    </div>
  );
}

export default App;