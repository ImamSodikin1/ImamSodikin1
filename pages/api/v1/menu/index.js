// pages/api/v1/menu/index.js
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/Menu";
import handler from "@/lib/handler";
import Model from "@/utils/Model";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
await dbConnect();

const menuModel = new Model(Menu);

const methods = {
  // Menangani request GET
  async GET(req, res) {
    try {
      const menus = await menuModel.findAll({});
      sendSuccessResponse(res, "Menus fetched successfully", menus, 200, true);
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },

  // Menangani request POST
  async POST(req, res) {
    try {
      const { title, icon, active, path, submenu } = req.body;
      const newMenu = await menuModel.insertOne({
        title,
        icon,
        active,
        path,
        submenu,
      });
      sendSuccessResponse(
        res,
        "Menus created successfully",
        newMenu,
        200,
        true
      );
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },

  // Menangani request PUT (optional)
  async PUT(req, res) {
    const { _id, title, icon, active, path, submenu } = req.body;
    try {
      const updatedMenu = await menuModel.findOneAndUpdate(
        { _id: id },
        { title, icon, active, path, submenu }
      );
      if (!updatedMenu) {
        return sendSuccessResponse(res, "Menu not found", null, 200, false);
      }
      sendSuccessResponse(
        res,
        "Menu updated successfully",
        updatedMenu,
        200,
        true
      );
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },

  // Menangani request DELETE (optional)
  async DELETE(req, res) {
    const { id } = req.query;
    try {
      const deletedMenu = await menuModel.deletOne({ _id: id });
      if (!deletedMenu) {
        return sendSuccessResponse(res, "Menu not found", null, 200, false);
      }
      sendSuccessResponse(res, "Menu deleted successfully", null, 200, true);
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },
};

// Menangani API Route
export default handler(methods);
