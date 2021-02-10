describe('Game', () => {
  const modelsPath = `${__dirname}/../../../server/models`
  const Game = require(`${modelsPath}/game`)
  const Player = require(`${modelsPath}/player`)

  const serverInfo = {
    hostname: 'Code Miner Server',
    version: 'ioq3 1.36 linux-x86_64 Apr 12 2009'
  }

  const lines = [
    "  0:00 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0",
    "  9:32 InitGame: \\sv_floodProtect\\1\\sv_maxPing\\0\\sv_minPing\\0\\sv_maxRate\\10000\\sv_minRate\\0\\sv_hostname\\Code Miner Server\\g_gametype\\0\\sv_privateClients\\2\\sv_maxclients\\16\\sv_allowDownload\\0\\dmflags\\0\\fraglimit\\20\\timelimit\\15\\g_maxGameClients\\0\\capturelimit\\8\\version\\ioq3 1.36 linux-x86_64 Apr 12 2009\\protocol\\68\\mapname\\q3dm17\\gamename\\baseq3\\g_needpass\\0",
    " 20:34 ClientConnect: 2",
    " 12:34 ClientConnect: 3",
  ]

  var game

  beforeEach(() => {
    game = new Game()
  })

  it('Should creates game and get informations about hostname and version of server', () => {
    const game1 = new Game(lines[0])
    const game2 = new Game(lines[1])
    const game3 = new Game()

    expect([game1.hostname, game1.version]).toEqual([serverInfo.hostname, serverInfo.version])
    expect([game2.hostname, game2.version]).toEqual([serverInfo.hostname, serverInfo.version])
    expect([game3.hostname, game3.version]).toEqual(['', ''])
  })

  it('Should be able to add kills to game', () => {
    expect(game.total_kills).toEqual(0)
    game.addKill()
    expect(game.total_kills).toEqual(1)
  })

  describe('Game Players', () => {
    var player1, player2

    beforeEach(() => {
      player1 = new Player(lines[2])
      player1.username = 'Paulo H. da Silva'
      player2 = new Player(lines[3])
      player2.username = 'Bárbara Lopes Milani'
    })

    it('Should be able to add new players to game', () => {
      expect(game.players.size).toEqual(0)
      game.newPlayer(player1)
      expect(game.players.size).toEqual(1)
      game.newPlayer(player2)
      expect(game.players.size).toEqual(2)
    })

    it('Should be able to find a player by it\'s ID', () => {
      game.newPlayer(player1)
      game.newPlayer(player2)
      expect(game.getPlayerById('2')).toEqual(player1)
      expect(game.getPlayerById('3')).toEqual(player2)
      expect(game.getPlayerById('4')).toEqual(null)
    })

    it('Should returns players kills list', () => {
      const emptyPlayersKills = { 'Paulo H. da Silva': 0, 'Bárbara Lopes Milani': 0 }
      const playersKills = { 'Paulo H. da Silva': 1, 'Bárbara Lopes Milani': 1 }
      game.newPlayer(player1)
      game.newPlayer(player2)
      expect(game.playersKills()).toEqual(emptyPlayersKills)
      player1.addKill()
      player2.addKill()
      expect(game.playersKills()).toEqual(playersKills)
    })

    it('Should returns players names list', () => {
      expect(game.playersNames().length).toEqual(0)
      game.newPlayer(player1)
      expect(game.playersNames().length).toEqual(1)
      expect(game.playersNames()).toEqual(['Paulo H. da Silva'])
      game.newPlayer(player2)
      expect(game.playersNames().length).toEqual(2)
      expect(game.playersNames()).toEqual(['Paulo H. da Silva', 'Bárbara Lopes Milani'])
    })
  })

})