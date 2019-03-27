import React, { Component } from 'react';
import './App.css';
var getUserMedia = require('getusermedia')

class App extends Component {

  componentDidMount () {
    getUserMedia({ video: true, audio: true }, function (err, stream) {
      if (err) return console.error(err)
    console.log("User media stream >>" , stream)
      var Peer = require('simple-peer')
      var peer = new Peer({
        initiator: window.location.hash === '#init',
        trickle: false,
        stream: stream
      })
    
      peer.on('signal', function (data) {
        console.log("SIGNALS -------------> ",data)
        document.getElementById('yourId').value = JSON.stringify(data)
      })
    
      document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
      })
    
      document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
      })
    
      peer.on('data', function (data) {
        console.log("PEER DATA ----->", data)
        document.getElementById('messages').textContent += data + '\n'
      })
    
      peer.on('stream', function (stream) {
        var video = document.createElement('video')
        document.body.appendChild(video)

        console.log("STEAMINGG: -----> ", stream)
        video.srcObject = stream
        video.play()
      })
    })
    
  }
  render() {
    return (
      <div className="App">
      <label>Your ID:</label><br/>
    <textarea id="yourId"></textarea><br/>
    <label>Other ID:</label><br/>
    <textarea id="otherId"></textarea>
    <button id="connect">connect</button><br/>

    <label>Enter Message:</label><br/>
    <textarea id="yourMessage"></textarea>
    <button id="send">send</button>
    <pre id="messages"></pre>
      </div>
    );
  }
}

export default App;
