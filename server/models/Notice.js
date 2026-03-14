import mongoose from 'mongoose'

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema)
