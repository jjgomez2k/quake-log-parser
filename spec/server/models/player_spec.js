describe('Player', () => {

  const Player = require(`${__dirname}/../../../server/models/player`)

  const lines = [
    " 20:38 ClientConnect: 2",
    " 21:51 ClientConnect: 3",
    " 20:38 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\\hmodel\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\100\\w\\0\\l\\0\\tt\\0\\tl\\0",
    " 21:51 ClientUserinfoChanged: 3 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\\hmodel\\sarge/krusade\\g_redteam\\\\g_blueteam\\\\c1\\5\\c2\\5\\hc\\95\\w\\0\\l\\0\\tt\\0\\tl\\0",
    " 22:06 Kill: 2 3 7: Isgalamido killed Dono da Bola by MOD_ROCKET_SPLASH",
    " 22:07 Kill: 2 3 7: Isgalamido killed Dono da Bola by MOD_ROCKET_SPLASH",
    " 22:08 Kill: 2 3 7: Isgalamido killed Dono da Bola by MOD_ROCKET_SPLASH",
    " 22:09 Kill: 2 3 7: Isgalamido killed Dono da Bola by MOD_ROCKET_SPLASH"
  ]

  var player

  beforeEach(() => {
    player = new Player(lines[0])
  })

  it('Should creates player by parse ID on line', () => {
    const player1 = new Player(lines[0])
    const player2 = new Player(lines[1])
    expect(player1.id).toEqual('2')
    expect(player2.id).toEqual('3')
  })

  it('Should updates player information by parsing line', () => {
    expect(player.username).toEqual('')
    player.update(lines[2])
    expect(player.username).toEqual('Isgalamido')
  })

  it('Should be able to increase and decrease player kills', () => {
    expect(player.kills).toEqual(0)
    player.addKill()
    expect(player.kills).toEqual(1)
    player.removeKill()
    expect(player.kills).toEqual(0)
  })
})