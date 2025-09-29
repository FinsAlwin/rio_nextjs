import bcrypt from "bcryptjs";

export class Admin {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || "admin";
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Hash password before saving
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  // Verify password
  async verifyPassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Convert to JSON (exclude password)
  toJSON() {
    const { password, ...adminWithoutPassword } = this;
    return adminWithoutPassword;
  }

  // Static method to create admin
  static async create(data) {
    const admin = new Admin(data);
    await admin.hashPassword();
    return admin;
  }

  // Static method to find admin by username
  static async findByUsername(db, username) {
    const collection = db.collection("admins");
    return await collection.findOne({ username });
  }

  // Static method to find admin by email
  static async findByEmail(db, email) {
    const collection = db.collection("admins");
    return await collection.findOne({ email });
  }

  // Static method to save admin
  async save(db) {
    const collection = db.collection("admins");
    const result = await collection.insertOne(this);
    return result;
  }

  // Static method to update admin
  static async updateById(db, id, updateData) {
    const collection = db.collection("admins");
    updateData.updatedAt = new Date();
    return await collection.updateOne({ _id: id }, { $set: updateData });
  }

  // Static method to get all admins
  static async findAll(db) {
    const collection = db.collection("admins");
    return await collection.find({}).toArray();
  }

  // Static method to delete admin
  static async deleteById(db, id) {
    const collection = db.collection("admins");
    return await collection.deleteOne({ _id: id });
  }
}
