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
  // the parameters are initialized to a null value before the function is ran
  async read(id = null, options = null) {
    try {
      if (id) {
        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      } else if (options) {
        const records = await this.model.findAll(options);
        return records;
      } else {
        const records = await this.model.findAll();
        return records;
      }
    } catch (e) {
      console.error('we have a ModelInterface read error', e);
      return e;
    }
  }

  async update(data, id) {
    try {
      await this.model.update(data, { where: { id } });
      let updatedRecord = await this.model.findByPk(id);
      return updatedRecord;
    } catch (e) {
      console.error('we have a ModelInterface update error', e);
      return e;
    }
  }

  async delete(id) {
    try {
      const deletedRecord = await this.model.findByPk(id);
      await this.model.destroy({ where: { id } });
      // to get the result from the function
      return deletedRecord;

    } catch (e) {
      console.error('we have a ModelInterface delete error', e);
      return e;
    }
  }

}

module.exports = Collection;

