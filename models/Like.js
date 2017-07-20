const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const votingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  beer_id: { type: Schema.Types.ObjectId, ref: 'Beer', required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Like = mongoose.model('Like', votingSchema);

module.exports = Like;
