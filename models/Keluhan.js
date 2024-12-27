import mongoose from "mongoose";

const KeluhanSchema = new mongoose.Schema(
  {
    jenis: { type: String, required: true },
    judul: { type: String, required: true },
    content: { type: String, required: true },
    tanggalKejadian: { type: Date },
    kategori: { type: [String], required: true },
    file: {
      type: [
        {
          name: String, // Nama file
          url: String, // URL file
        },
      ],
      default: [], // Default array kosong
    },
    anonim: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Tambahkan createdAt dan updatedAt otomatis
  }
);

// Perbaiki ekspor model
export default mongoose.models.Keluhan ||
  mongoose.model("Keluhan", KeluhanSchema);
