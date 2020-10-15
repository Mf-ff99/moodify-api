const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            user_name: 'dunder',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            user_name: 'test-user-2',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            user_name: 'test-user-3',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 4,
            user_name: 'test-user-4',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ]
}

function makeMoodsArray(users) {
    return [
        {
            id: 1,
            current_mood: 6,
            note: 'today sucked',
            category_id: 2,
            hours_slept: 5,
            user_id: users[2].id,
            date_added: '2020-09-04 11:37:30',
        }, {
            id: 2,
            current_mood: 6,
            note: 'today sucked',
            category_id: 2,
            hours_slept: 5,
            user_id: users[1].id,
            date_added: '2020-09-04 11:37:30',
        }, {
            id: 3,
            current_mood: 6,
            note: 'today sucked',
            category_id: 2,
            hours_slept: 5,
            user_id: users[0].id,
            date_added: '2020-09-04 11:37:30',
        }, {
            id: 4,
            current_mood: 6,
            note: 'today sucked',
            category_id: 2,
            hours_slept: 5,
            user_id: users[2].id,
            date_added: '2020-09-04 11:37:30',
        },
    ]
}

function makeCategories() {
    return [
        {
            id: 1,
            category: 'Work'
        },
        {
            id: 2,
            category: 'Play'
        },
    ]
}

function makeMoodsFixtures() {
    const testUsers = makeUsersArray()
    const testCategories = makeCategories()
    const testMoods = makeMoodsArray(testUsers)
    return { testUsers, testMoods, testCategories }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(`
        TRUNCATE moodify_moods`)
        .then(() => trx.raw(`TRUNCATE moodify_categories CASCADE`))
        .then(() => trx.raw(`TRUNCATE moodify_users CASCADE`))
        .then(() =>
            Promise.all([
                trx.raw(`ALTER SEQUENCE moodify_moods_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE moodify_users_id_seq minvalue 0 START WITH 1`),
                trx.raw(`ALTER SEQUENCE moodify_categories_id_seq minvalue 0 START WITH 1`),
                trx.raw(`SELECT setval('moodify_moods_id_seq', 0)`),
                trx.raw(`SELECT setval('moodify_users_id_seq', 0)`),
                trx.raw(`SELECT setval('moodify_categories_id_seq', 0)`),
               
            ])
        )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('moodify_users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('moodify_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function seedCategoriesTable(db, categories = []){
    return db.transaction(async trx => {
        await trx.into('moodify_categories').insert(categories)

        await trx.raw(
            `SELECT setval('moodify_categories_id_seq', ?)`,
            [categories[categories.length - 1].id],
        )
    })
}

function seedMoodsTables(db, users, moods = []) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('moodify_moods').insert(moods)

        await trx.raw(
            `SELECT setval('moodify_moods_id_seq', ?)`,
            [moods[moods.length - 1].id],
        )
    })
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.user_name,
        algorithm: 'HS256',
    })
    // console.log(token)
    return `Bearer ${token}`
}

module.exports = {
    seedMoodsTables,
    seedCategoriesTable,
    seedUsers,
    makeAuthHeader,
    makeMoodsFixtures,
    cleanTables,
    makeAuthHeader,
}