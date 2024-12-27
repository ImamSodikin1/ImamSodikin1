// pages/api/v1/menu/index.js
import dbConnect from "@/lib/dbConnect";
import handler from "@/lib/handler";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
await dbConnect();

const methods = {
  async POST(req, res) {
    // const { name } = req.body
    console.log(req.body)
    try {
      sendSuccessResponse(res, `has been added`, null, 200, true);
    } catch (err) {
      sendErrorResponse(res, "Error fetching penduduk", err, 400);
    }
  }
}

export default handler(methods)