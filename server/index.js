const Hapi = require('hapi')
const server = new Hapi.Server()
const Parser = require('./models/parser')

// Initialize Parser Object
const parser = new Parser()

// Parse the games.log file
parser.readFile(`${__dirname}/../data/games.log`)

// Server connection setup
server.connection({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080
})

// Define server routes
require('./routes')(server, parser)

module.exports = server
