// test/exampletest.js
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Test', () => {
  before(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const user = new User({
      name: 'Mounika',
      email: 'mounika@example.com',
      password: 'securepassword'
    });

    const savedUser = await user.save();

    expect(savedUser._id).to.exist;
    expect(savedUser.name).to.equal('Mounika');
    expect(savedUser.email).to.equal('mounika@example.com');
  });

  it('should fetch users', async () => {
    const users = await User.find({});
    expect(users).to.be.an('array');
    expect(users.length).to.be.greaterThan(0);
  });

  it('should update a user', async () => {
    const user = await User.findOne({ email: 'mounika@example.com' });
    user.name = 'Updated Mounika';
    const updatedUser = await user.save();

    expect(updatedUser.name).to.equal('Updated Mounika');
  });

  it('should delete a user', async () => {
    const deleted = await User.deleteOne({ email: 'mounika@example.com' });
    expect(deleted.deletedCount).to.equal(1);
  });
});
