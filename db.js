const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: true,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    //Default options for all defined models
    define: {
        freezeTableName: true //LH: do not pluralise table names for queries (was making 'comment' become 'comments)
    }
});

module.exports = {
    connect: function (syncSchema) {
      var db = this;

      db.defineSchema();

      //Establish connection to DB using sequelize
      sequelize.authenticate()
      .then(() => { console.log('Database connection has been established successfully.'); })
      .catch(err => { console.error('ERROR: Unable to connect to the database:', err); });

      if(syncSchema) {
        sequelize.sync({
          logging: console.log,
          alter: false, // will alter the table if feasible
          force: false // will drop the table if it already exists
        }).then(() => {
          // Tables created
          
        });
      }
    },
    models: [],
    defineSchema: function() {
      var db = this;

      //Models

      // Model: bounty
      db.models.bounty = sequelize.define('bounty', {
        name: {
          type: Sequelize.STRING
        },
        maxValue: {
          type: Sequelize.DECIMAL(10,2),
          validate: {
            isDecimal: true
          }
        },
        note: {
          type: Sequelize.STRING
        },
        imageId: {
          type: Sequelize.STRING
        }
      });

      // Model: organisation
      db.models.organisation = sequelize.define('organisation', {
        name: {
          type: Sequelize.STRING
        }
      });

      // Model: user
      db.models.user = sequelize.define('user', {
        username: {
          type: Sequelize.STRING
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        dob: {
          type: Sequelize.DATEONLY
        }
      });

      //Associations

      // Associaton: Each organisation has many bounties
      db.models.organisation.hasMany(db.models.bounty, {as: 'bounties'})
    }
};