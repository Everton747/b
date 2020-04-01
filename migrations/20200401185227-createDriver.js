module.exports = {
  async up(db, client) {
    await db.createCollection('drivers');
  },

  async down(db, client) {
    await db.dropCollection('drivers');
  }
};
