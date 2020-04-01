require('dotenv').config();

const config = {
  mongodb: {
    url: "mongodb://localhost:27017",

    databaseName: process.env.DB_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog"
};

module.exports = config;
