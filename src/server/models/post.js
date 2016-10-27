import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  created_at: Date,
  updated_at: Date,
  text: String,
  attachments: [String],
  shared_ids: [Schema.Types.ObjectId],
  comments: [{
    author_id: Schema.Types.ObjectId,
    text: String,
    created_at: Date
  }]
})

export function getPostModel() {
  return mongoose.model('Post', postSchema);
}
