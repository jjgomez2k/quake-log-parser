const fs = require('fs')
const Game = require('./game')
const Player = require('./player')

/**
 * Retrieves command from line
 * @example Line:  20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
 *          Command: Kill
 * @type {RegExp}
 */
const GET_LINE_COMMAND = /^.{0,7}([a-z A-Z][^:]*)/

class Parser {

  constructor () {
    this.games = new Map()
    this.currentGame = 0
  }

  /**
   * Adds new game to games collection
   * @param  {Game} game The new game
   * @return {[type]}      [description]
   */
  addGame(game) {
    this.currentGame++
    this.games.set(this.currentGame, game)
    return this
  }

  /**
   * Converts games map in Object to be used on routes return
   * @return {Object} The converted games
   * @example {
   *   game_1: {
   *     hostname: "Code Miner Server",
   *     version: "ioq3 1.36 linux-x86_64 Apr 12 2009",
   *     total_kills: 0,
   *     players: [ "Isgalamido" ],
   *     kills: { Isgalamido: 0 }
   *   }
   * }
   */
  toObject() {
    let ret = {}
    this.games.forEach((item, idx) => {
      ret[`game_${parseInt(idx)}`] = {
        hostname: item.hostname,
        version: item.version,
        total_kills: item.total_kills,
        players: item.playersNames(),
        kills: item.playersKills()
      }
    })
    return ret
  }

  /**
   * Reads the content of log file
   * @param  {string} logFile Log file full path
   * @return {void}
   */
  readFile (logFile) {
    let lines = fs.readFileSync(logFile).toString().split("\n")
    this.parseLines(lines)
  }

  /**
   * Loop through the array of lines and parse each one
   * @param  {array} lines The lines that will be parsed
   * @return {void}
   */
  parseLines (lines) {
    let command = ''
      , lastLine = lines.length
      , i
    ;

    for (i = 0; i < lastLine; i++) {
      command = lines[i].match(GET_LINE_COMMAND)
      if (!!command) {
        this.checkCommand(command[1], lines[i], i)
      } else {
        console.log(`Could not find command on line ${i}`)
      }
    }
  }

  /**
   * Checks if the found command found in the passed line
   * and execute a routine like create a new game, a new player
   * count kills or update a player information
   * @param  {string} command The command
   * @param  {string} line    The line that will be parsed
   * @param  {integer}    idx     The line number
   * @return {void}
   */
  checkCommand (command, line, idx) {
    switch (command) {
      case 'InitGame':
        Game.new(this, line)
        break
      case 'ClientConnect':
        Player.new(this, line)
        break
      case 'ClientUserinfoChanged':
        Player.update(this, line)
        break
      case 'Kill':
        Player.kill(this, line)
        break
      default:
        // console.log(`[INFO] Command ${command} ignored (line: ${idx})`)
        break
    }
  }

  /**
   * Returns the current game of parser in progress
   * @return {Game} The Game
   */
  getCurrentGame () {
    return this.games.get(this.currentGame)
  }
}

module.exports = Parser