'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Community extends Model {
  communities () {
    return this.hasMany("App/Models/Place", "_id", "community_id")
  }
}

module.exports = Community
