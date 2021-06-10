import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  content: String,
  name: String,
  chatWith: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);
export default Message