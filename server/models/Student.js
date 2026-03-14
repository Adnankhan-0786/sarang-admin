import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
  {
    admissionNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String },
    fatherName: { type: String },
    mobile: { type: String },
    address: { type: String },
    session: { type: String },
    totalFees: { type: Number, default: 0 },
    paidFees: { type: Number, default: 0 },
    dueFees: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Student || mongoose.model('Student', StudentSchema)
