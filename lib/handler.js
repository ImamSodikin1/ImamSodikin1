
// Fungsi untuk menangani berbagai method HTTP secara otomatis
export default function handler(methods) {
  return async (req, res) => {
    const { method } = req;

    if (methods[method]) {
      try {
        await methods[method](req, res);
      } catch (error) {
        res.status(500).json({ status: false, message: "Internal server error", error: error.message });
      }
    } else {
      res.status(405).json({ status: false, message: `Method ${method} not allowed` });
    }
  };
}
