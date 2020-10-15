const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Mood endpoints', function() {
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

      describe('POST /api/moods', () => {
          beforeEach(`insert moods`, () => {
              helpers.seedCategoriesTable(db, testCategories)
              helpers.seedMoodsTables(db, testUsers, testMoods)
6            })

          it(`Posts a mood & responds with 201 when authorized user posts mood`, function() {
              const testUser = testUsers[0]
              const newMood = {
                  current_mood: 5,
                  note: 'test',
                  user_id: testUser.id,
                  hours_slept: 5,
                  category_id: 1,
                  date_added: '2020-09-04 11:37:30',
              }
              return supertest(app)
              .post('/api/moods')
              .set('Authorization', helpers.makeAuthHeader(testUser))
              .send(newMood)
              .expect(201)
          })
    })

    describe(`GET /api/moods`, () => {
        beforeEach(`insert users`, () => {
            helpers.seedUsers(db, testUsers)
          })
          
          it('Should return moods for user', () => {
            const testUser = testUsers[0]
            return supertest(app)
            .get('/api/moods')
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
          })
    })
})