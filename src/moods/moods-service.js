const xss = require('xss')
const Treeize = require('treeize')

const MoodsService = {
  getAllMoods(db, id) {
    return db
    .select('moodify_moods.user_id', 'moodify_moods.hours_slept', 'moodify_moods.id', 'moodify_moods.note', 'moodify_moods.current_mood', 'moodify_moods.date_added', 'moodify_moods.category_id')
    .from('moodify_moods')
    .join('moodify_users', {
        'moodify_users.id': 'moodify_moods.user_id',
    })
    .join('moodify_categories', {
      'moodify_moods.category_id': 'moodify_categories.id'
    })
    .where('moodify_moods.user_id', id)
  },
  getById(db, id) {
    return this.getAllMoods(db)
      .where('mood.id', id)
      .first()
  },
  insertMood(db, newMood) {
      return db
      .insert(newMood)
      .into('moodify_moods')
  },

  serializeMoods(moods) {
    return moods.map(this.serializeMood)
  },

  serializeMood(mood) {
    const moodTree = new Treeize()
    const moodData = moodTree.grow([ mood ]).getData()[0]

    return {
      id: moodData.id,
      note: xss(moodData.note),
      current_mood: moodData.current_mood,
      hours_slept: moodData.hours_slept,
      category_id: moodData.category_id,
      date_added: moodData.date_added,
      user_id: moodData.user_id
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = MoodsService
