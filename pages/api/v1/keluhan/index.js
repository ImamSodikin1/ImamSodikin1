// pages/api/v1/menu/index.js
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
import dbConnect from "@/lib/dbConnect";
import Keluhan from "@/models/Keluhan";
import handler from "@/lib/handler";
import Model from "@/utils/Model";
await dbConnect();

const socket = require("socket.io-client");
const socketClient = socket(`${process.env.API_URL}`);

const keluhanModel = new Model(Keluhan);

const methods = {
  async GET(req, res) {
    try {
      const penduduks = await keluhanModel.findAll({});
      sendSuccessResponse(res, "successfull", penduduks, 200, true);
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },

  async POST(req, res) {
    try {
      const { 
          judul, 
          jenis, 
          content, 
          tanggalKejadian, 
          kategori, 
          file, 
          anonim 
      } = req.body;

      const newKeluhan = await keluhanModel.insertOne({
        judul,
        jenis,
        content,
        tanggalKejadian,
        kategori,
        file,
        anonim,
      });

      socketClient.emit("refreshKeluhan", newKeluhan);
      sendSuccessResponse(
        res,
        "successfull create keluhan",
        newKeluhan,
        200,
        true
      );
    } catch (error) {
      console.log('error', error)
      sendErrorResponse(res, "Error create keluhan", error, 400);
    }
  },

  async PUT(req, res) {
    try {
      const {
        _id,
        judul,
        jenis,
        content,
        tanggalKejadian,
        kategori,
        file,
        anonim,
      } = req.body;

      const updateKeluhan = await keluhanModel.findOneAndUpdate(
        {   _id    },
        {
            $set: {
              judul,
              jenis,
              content,
              tanggalKejadian,
              kategori,
              file,
              anonim,
            }
        }
      );

      socketClient.emit("refreshKeluhan", updateKeluhan);
      sendSuccessResponse(
        res,
        "successsfull update keluhan",
        updateKeluhan,
        200,
        true
      );
    } catch (error) {
      sendErrorResponse(res, "Error fetching menus", error, 400);
    }
  },

  async DELETE(req, res) {
    try {
      const { _id } = req.query;
      await keluhanModel.deletOne({ _id });

      socketClient.emit("refreshKeluhan");
      sendSuccessResponse(res, "successfull delete keluhan", null, 200, true);
    } catch (error) {
      sendErrorResponse(res, "error delete keluhan", error, 400);
    }
  },
};

export default handler(methods);
