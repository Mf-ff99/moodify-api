const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')


describe(`Login authentication`, () => {
    let db
    const {
      testMoods,
      testUsers,
      testCategories,
  } = helpers.makeMoodsFixtures()
    const testUser = testUsers[0]
    
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://postgres@localhost/moodify-test-db',
        })
        app.set('db', db)
      })
      after('disconnect from db', () => db.destroy())
      
      before(`insert moods`, () => {
        helpers.seedUsers(db, testUsers)
        
      })
      afterEach('cleanup', () => helpers.cleanTables(db))
      
      it(`Logs in user when User is registered`, () => {
        const userValidCreds = {
          user_name: testUser.user_name,
          password: testUser.password,
        }
        const expectedToken = jwt.sign(
            { user_id: testUser.id}, // payload
            process.env.JWT_SECRET,
            {
                subject: testUser.user_name,
                algorithm: 'HS256',
            },
        )
        console.log(userValidCreds)
          return supertest(app)
            .post('/api/auth/login')
            .send(userValidCreds)
            .expect(200, {
              authToken: expectedToken,
            })

})
})