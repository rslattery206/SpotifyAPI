import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
const safeJsonStringify = require("safe-json-stringify")
const queryString = require('query-string')
const darkSideOfTheMoon = '4LH4d3cOWNNsVw41Gqt2kv'
const ratm = '4Io5vWtmV1rFj4yirKb4y4'
const redirect_uri = 'http://localhost:3000/'
// f820c80b31f2494bbaaebf7317c588b5

function checkForQueries() {
  const location = window.location.href
  const queries = location.slice(location.indexOf("#"))
  return queries
}

function getAccessToken(id) {
  const authorize_url = 'https://accounts.spotify.com/authorize?' + 
  queryString.stringify({
    response_type: 'token',
    client_id: id,
    redirect_uri: redirect_uri,
  })
  window.location.href = authorize_url // Takes user to spotify service page
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
  const [authorized, setAuthorized] = useState(false)

  const handleClientIdInput = event => {
    setClient_id(event.target.value);
  }

  useEffect(() => {
    let params = queryString.parse(checkForQueries())
    if (params.access_token != undefined) {
      localStorage.setItem('token', params.access_token)
      setAuthorized(true)
      window.history.pushState("", "", redirect_uri)
    }
  });


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
      <button onClick={() => (getAlbumTracks(ratm, localStorage.getItem('token')))}> Get Album Tracks </button>
      <p>{message}</p>
    </div>
  );
}

export default App;