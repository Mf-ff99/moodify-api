const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const jwt = require('jsonwebtoken')


describe(`Login authentication`, () => {
    let db
    const {
        testUsers,
        testCategories,
        testMoods
    } = helpers.makeMoodsFixtures()

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://postgres@localhost/moodify-test-db',
        })
        app.set('db', db)
      })
      after('disconnect from db', () => db.destroy())

      before('cleanup', () => helpers.cleanTables(db))
    
      afterEach('cleanup', () => helpers.cleanTables(db))

      beforeEach(`insert moods`, () => {
        helpers.seedCategoriesTable(db, testCategories)
        helpers.seedMoodsTables(db, testUsers, testMoods)
        helpers.seedUsers(db, testUsers)
      })

      it(`Logs in user when User is registered`, () => {
          const testUser = testUsers[0]
        const userValidCreds = {
            user_name: testUser.user_name,
            password: testUser.password,
        }
        const expectedToken = jwt.sign(
            { user_id: testUser.id }, // payload
            process.env.JWT_SECRET,
            {
                subject: testUser.user_name,
                algorithm: 'HS256',
            }
        )
          return supertest(app)
          .post('/api/auth/login')
          .send(userValidCreds)
          .expect(200, {
            authToken: expectedToken,
        })

})
})