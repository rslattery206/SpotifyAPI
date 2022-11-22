import { useEffect } from 'react';
import { useState } from 'react';
import { Buffer } from 'buffer';
import axios from 'axios';
import './App.css';
const safeJsonStringify = require("safe-json-stringify")
const queryString = require('query-string')
const darkSideOfTheMoon = '4LH4d3cOWNNsVw41Gqt2kv'
const token_url = 'https://accounts.spotify.com/api/token'
const client_id = 'f820c80b31f2494bbaaebf7317c588b5'
const client_secret = 'eb338e5aa5aa43c9a7aac93bd7c638fc'
const redirect_uri = 'http://localhost:3000/'


const authorize_url = 'https://accounts.spotify.com/authorize?' + 
queryString.stringify({
  response_type: 'token',
  client_id: client_id,
  redirect_uri: redirect_uri,
})

function getAccessToken() {
  const location = window.location.href
  const query = location.slice(location.indexOf("#"))
  if (query.length > 0) {
    console.log("query was found")
    let params = queryString.parse(query)
    return params.access_token
  }
  return null
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
  const [error, setError] = useState(null);
  const [items, setItems] = useState();

  useEffect(() => {
    
  })

  return (
    <div style={{color: 'blueviolet'}}>
      Hello<br/>
      <a href = {authorize_url}> Authorize Spotify </a>
      <br/>
      <button onClick={() => console.log(getAccessToken())}> Get Access Token </button>
      <button onClick={() => (getAlbumTracks(darkSideOfTheMoon, getAccessToken()))}> Get Album Tracks </button>
    </div>
  );
}

export default App;