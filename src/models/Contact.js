export class Contact {
  constructor(data) {
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.investment = data.investment;
    this.hearAboutUs = data.hearAboutUs;
    this.countryCode = data.countryCode || "in";
    this.dialingCode = data.dialingCode || "+91";
    this.gps_coordinates = data.gps_coordinates || "";
    this.agreeToTerms = data.agreeToTerms;
    this.status = data.status || "new"; // new, contacted, converted, closed
    this.notes = data.notes || "";
    this.source = data.source || "contact-form";
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Convert to JSON
  toJSON() {
    return {
      name: this.name,
      phone: this.phone,
      email: this.email,
      investment: this.investment,
      hearAboutUs: this.hearAboutUs,
      countryCode: this.countryCode,
      dialingCode: this.dialingCode,
      gps_coordinates: this.gps_coordinates,
      agreeToTerms: this.agreeToTerms,
      status: this.status,
      notes: this.notes,
      source: this.source,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Static method to create contact
  static async create(data) {
    const contact = new Contact(data);
    return contact;
  }

  // Static method to save contact to database
  async save(db) {
    const collection = db.collection("contacts");
    const result = await collection.insertOne(this.toJSON());
    return result;
  }

  // Static method to find contact by email
  static async findByEmail(db, email) {
    const collection = db.collection("contacts");
    return await collection.findOne({ email });
  }

  // Static method to find contact by phone
  static async findByPhone(db, phone) {
    const collection = db.collection("contacts");
    return await collection.findOne({ phone });
  }

  // Static method to get all contacts
  static async findAll(db, options = {}) {
    const collection = db.collection("contacts");
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;

    return await collection
      .find({})
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  // Static method to get contacts by status
  static async findByStatus(db, status, options = {}) {
    const collection = db.collection("contacts");
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;

    return await collection
      .find({ status })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  // Static method to count contacts
  static async count(db, filter = {}) {
    const collection = db.collection("contacts");
    return await collection.countDocuments(filter);
  }

  // Static method to update contact
  static async updateById(db, id, updateData) {
    const collection = db.collection("contacts");
    const { ObjectId } = require("mongodb");

    // Convert string ID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      throw new Error("Invalid ID format");
    }

    updateData.updatedAt = new Date();
    return await collection.updateOne({ _id: objectId }, { $set: updateData });
  }

  // Static method to delete contact
  static async deleteById(db, id) {
    const collection = db.collection("contacts");
    return await collection.deleteOne({ _id: id });
  }

  // Static method to get recent contacts
  static async getRecent(db, days = 7, limit = 10) {
    const collection = db.collection("contacts");
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);

    return await collection
      .find({ createdAt: { $gte: daysAgo } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }
}
