class Game {

  constructor (line = '') {
    this.players = new Map()
    this.total_kills = 0
    this.hostname = this.version = ''
    if (line.length > 0) {
      this.hostname = line.match(/sv_hostname\\([a-z A-Z 0-9][^\\]*)/)[1]
      this.version = line.match(/version\\(.*)\\protocol/)[1]
    }
  }

  /**
   * Creates a new Game and add it to the passer
   * @param  {Parser} parser The Parser
   * @param  {string} line   The line that will be parsed to create a new Game
   * @return {void}
   */
  static new (parser, line) {
    parser.addGame(new Game(line))
  }

  /**
   * Increment game number of kills
   * @return {void}
   */
  addKill () {
    this.total_kills++
  }

  /**
   * Finds a player by ID on game and return it
   * @param  {string} id The Player ID
   * @return {Player}    The Player
   */
  getPlayerById (id) {
    if (this.players.has(id)) {
      return this.players.get(id)
    }
    return null
  }

  /**
   * Adds the passed player to the game
   * @param  {Player} player The new game player
   * @return {void}
   */
  newPlayer (player) {
    this.players.set(player.id, player)
  }

  /**
   * Returns the players names of the game
   * @example ['Paulo H. da Silva']
   * @return {array} The players names
   */
  playersNames () {
    let result = []
    this.players.forEach(player => {
      result.push(player.username)
    })
    return result
  }

  /**
   * Returns the number of kills by each player
   * @example { 'Paulo H. da Silva': 1 }
   * @return {Object} The players kills
   */
  playersKills () {
    let result = {}
    this.players.forEach(player => {
      result[player.username] = player.calcScore()
    })
    return result
  }

}

module.exports = Game
