# AngularJS Node Calculator App

Node.js api with angularJS front end to perform calculations.
Results should remain between sessions. Show the last 10 calculations descending from most recent to oldest.

Calculations are loged in a json file called 'calculations.json'. At any time it won't store more than 10 most recent calculations

Used socket.io with node to acheive concurrent updates of calculation history in case of multiple users


## Requirements

- [Node and npm](http://nodejs.org)

## Installation

1. Clone the repository: `git clone https://github.com/karthik-u94/SharedCalcDemo.git`
2. Install application: `npm install`
3. Start the server: `node server.js`
4. View in browser at `http://localhost:8080`

## Demo
User 1 performs a calculation
![User 1](https://imgur.com/3B4R8qs.png)

User 2's screen shows the updated calculation log
![User 2](https://imgur.com/itfqypw.png)

