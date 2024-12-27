class Model {
  constructor(model) {
    this.model = model;
  }

  async insertOne(data) {
    return this.model.insertMany(data);
  }

  async findOneAndUpdate(filter, data) {
    return this.model.findOneAndUpdate(filter, data, { new: true });
  }

  async findAll(filter) {
    return this.model.find(filter).sort({ createdAt: -1 }).limit(100);
  }

  async findOne(filter) {
    return this.model.find(filter).sort({ createdAt: -1 }).limit(1);
  }

  async deletOne(filter) {
    return this.model.findOneAndDelete(filter);
  }
}

export default Model;