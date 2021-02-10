const gamesController = require('./controllers/games_controller')

// Routes definition
const Router = (server, parser) => {
  [
    // List all parsed games
    [ 'GET', '/games', gamesController.index(parser) ],
    // Returns a specific parsed game
    [ 'GET', '/games/{id}', gamesController.show(parser) ]
  ].forEach(item => {
    
    // Define route server
    server.route({
      method: item[0],
      path: `/api/v1${item[1]}`,
      handler: item[2]
    })

    console.log(`Route /api/v1${item[1]} registered`)
  })
}

module.exports = Router