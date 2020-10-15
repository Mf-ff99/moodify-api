const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`User's endpoint`, () => {
    let db
    const {
        testMoods,
        testUsers,
        testCategories,
    } = helpers.makeMoodsFixtures()

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: 'postgresql://postgres@localhost/moodify-test-db',
        })
        app.set('db', db)
      })

      after('disconnect from db', () => db.destroy())

      beforeEach('cleanup', () => helpers.cleanTables(db))
    
      afterEach('cleanup', () => helpers.cleanTables(db))

      describe(`User can register`, () => {
        beforeEach(`insert moods`, () => {
            helpers.seedCategoriesTable(db, testCategories)
            helpers.seedMoodsTables(db, testUsers, testMoods)
          })
          it(`Registers User to POST endpoint`, () => {
              const newUser = {
                  user_name: 'testUser',
                  password: 'Password1!'
              }
              
              return supertest(app)
              .post('/api/users')
              .send(newUser)
              .expect(201)
            })
      })
})