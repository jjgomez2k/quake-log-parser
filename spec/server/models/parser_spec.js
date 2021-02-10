describe('Parser', () => {
  const Parser = require(`${__dirname}/../../../server/models/parser`)

  beforeEach(() => {
    parser = new Parser()
    // Lines 5 and 13 of logHelper.log changed to force errors
    parser.readFile(`${__dirname}/../../helpers/logHelper.log`)
  })

  it('Should parse lines and retrieves games information', () => {
    parserGames = parser.toObject()
    expect(Object.keys(parserGames).length).toEqual(1)
    expect(parserGames['game_1']).toEqual({
      hostname: 'Code Miner Server',
      version: 'ioq3 1.36 linux-x86_64 Apr 12 2009',
      total_kills: 4,
      players: [
        'Dono da Bola',
        'Isgalamido',
        'Zeh'
      ],
      kills: {
        'Dono da Bola': 0,
        'Isgalamido': 1,
        'Zeh': 0
      } 
    })
  })

})