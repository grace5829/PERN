const Sequelize = require('sequelize')
const db = require('../db')


const Birds = db.define('Birds', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    family: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    habitat: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        defaultValue:
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/202984001/1800'
    },
    description: {
        type: Sequelize.TEXT('long')
    },
})

module.exports = Birds