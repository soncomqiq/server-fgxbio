const app = require('../')

describe('# check begin', () => {
  it('should begin', () => {
    return request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res).to.equal('meet')
      })
  })
})
