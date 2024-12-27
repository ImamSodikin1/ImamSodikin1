import mongoose from "mongoose";

const PendudukSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
    },
    umur: {
      type: String,
    },
    jenisKelamin: {
      type: String,
    },
    alamat: {
      type: String,
    },
    statusPernikahan: {
      type: String,
    },
    kepalaKeluarga: {
      type: Boolean,
      default: false,
    },
    tanggalLahir: {
      type: Date,
    },
    pekerjaan: {
      type: String,
    },
    kewarganegaraan: {
      type: String,
      default: "Indonesia",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Penduduk ||
  mongoose.model("Penduduk", PendudukSchema);
