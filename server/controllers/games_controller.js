class GamesController {

  /**
   * GET /api/v1/games
   * Returns all the parsed games found on parse
   * @param  {Parse} parse The Parse Object
   */
  index (parse) {
    return (request, reply) => {
      reply(parse.toObject())
    }
  }

  /**
   * GET /api/v1/games/{id}
   * Returns the game that have the specified ID
   * @param  {Parse} parse The Parse Object
   */
  show (parse) {
    return (request, reply) => {
      const game = parse.toObject()[`game_${request.params.id}`]
      if (!!game) {
        reply(game)
      } else {
        reply({ error: `Game ${request.params.id} not found` }).code(404)
      }
    }
  }
}

const gamesController = new GamesController()
module.exports = gamesController