import mongoose from "mongoose";

// Submenu schema
const SubmenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  path: {
    type: String,
  },
});

// Menu schema
const MenuSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(), // Generate UUID-like string
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  path: {
    type: String,
  },
  submenu: {
    type: [SubmenuSchema], // Array of Submenu
    default: [], // Optional, default to an empty array
  },
});

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
