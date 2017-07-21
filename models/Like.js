const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const likeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  beer_id: { type: Schema.Types.ObjectId, ref: 'Beer', required: true }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
