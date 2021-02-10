describe('GamesController', () => {
  const Server = require(`${__dirname}/../../../server`)
  const Parser = require(`${__dirname}/../../../server/models/parser`)

  describe('index', () => {
    it('Should returns 21 games', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games'
        }).then(response => {
          expect(response.statusCode).toEqual(200)
          expect(Object.keys(response.result).length).toEqual(21)
          done()
        })
      }).not.toThrowError()
    })
  })

  describe('show', () => {
    it('Should returns 1 game', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games/1'
        }).then(response => {
          expect(response.statusCode).toEqual(200)
          expect(response.result).toEqual({
            "hostname": "Code Miner Server",
            "version": "ioq3 1.36 linux-x86_64 Apr 12 2009",
            "total_kills": 0,
            "players": [
              "Isgalamido"
            ],
            "kills": {
              "Isgalamido": 0
            }
          })
          done()
        })
      }).not.toThrowError()
    })

    it('Should returns error', done => {
      expect(() => {
        Server.inject({
          method: 'GET',
          url: '/api/v1/games/100'
        }).then(response => {
          expect(response.statusCode).toEqual(404)
          expect(response.result).toEqual({ error: 'Game 100 not found' })
          done()
        })
      }).not.toThrowError()
    })
  })

})