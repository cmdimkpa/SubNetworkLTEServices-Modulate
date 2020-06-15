// modulate IP packets to MAC packets every interval

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3201

let modulationInterval = 3000;
let events = 0;

const modulatePackets = async () => {
    events++;
    await axios.get(`https://sub-network-lte.herokuapp.com/SubNetworkLTE/PhysicalUplinkControlChannel/Modulation`).then(response => {
      console.log(`${response.data} (${events})`)
    }).catch(err => {
      console.log(err)
    })
}

app.listen(PORT, () => {
    console.log(`@modulator service: now running on port ${PORT}`);
    let modulator = setInterval(modulatePackets, modulationInterval);
});
