'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }
  // post method
  async create(data) {
    try {
      const newRecord = await this.model.create(data);
      return newRecord;
    } catch (e) {
      console.error('we have a ModelInterface create error', e);
      return e;
    }
  }

  async read(id = null) {
    try {
      if (id) {
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      } else {
        const records = await this.model.findAll();
        return records;
      }
    } catch (e) {
      console.error('we have a ModelInterface create error', e);
      return e;
    }
  }


}

module.exports = Collection;
