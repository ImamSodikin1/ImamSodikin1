// pages/api/v1/menu/index.js
import dbConnect from "@/lib/dbConnect";
import Penduduk from "@/models/Penduduk";
import handler from "@/lib/handler";
import Model from "@/utils/Model";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/response";
await dbConnect();

const socket = require("socket.io-client");
const socketClient = socket(`${process.env.API_URL}`);

const pendudukModel = new Model(Penduduk);

const methods = {
  async GET(req, res) {
    try {
      const penduduks = await pendudukModel.findAll({});
      sendSuccessResponse(res, "successfull", penduduks, 200, true);
    } catch (err) {
      sendErrorResponse(res, "Error fetching penduduk", err, 400);
    }
  },

  async POST(req, res) {
    try {
      const {
        nama,
        umur,
        jenisKelamin,
        alamat,
        statusPernikahan,
        kepalaKeluarga,
        tanggalLahir,
        pekerjaan,
        kewarganegaraan,
      } = req.body;

      const penduduk = await pendudukModel.insertOne({
        nama,
        umur,
        jenisKelamin,
        alamat,
        statusPernikahan,
        kepalaKeluarga,
        tanggalLahir,
        pekerjaan,
        kewarganegaraan,
      });
      socketClient.emit("penduduk", penduduk);
      sendSuccessResponse(res, "successfull", penduduk, 200, true);
    } catch (err) {
      sendErrorResponse(res, "Error fetching penduduk", err, 400);
    }
  },

  async PUT(req, res) {
    try {
      const {
        _id,
        name,
        umur,
        jenisKelamin,
        alamat,
        statusPernikahan,
        kepalaKeluarga,
        tanggalLahir,
        pekerjaan,
        kewarganegaraan,
      } = req.body;

      const penduduk = await pendudukModel.findOneAndUpdate(
        { _id: _id },
        {
          name,
          umur,
          jenisKelamin,
          alamat,
          statusPernikahan,
          kepalaKeluarga,
          tanggalLahir,
          pekerjaan,
          kewarganegaraan,
        }
      );
      socketClient.emit("penduduk");
      sendSuccessResponse(res, "successfull", penduduk, 200, true);
    } catch (err) {
      sendErrorResponse(res, "Error fetching penduduk", err, 400);
    }
  },

  async DELETE(req, res) {
    try {
      const { _id } = req.query;
      await pendudukModel.deletOne({ _id: _id });
      socketClient.emit("penduduk");
      sendSuccessResponse(res, "successfull", null, 200, true);
    } catch (err) {
      sendErrorResponse(res, "Error fetching penduduk", err, 400);
    }
  },
};

export default handler(methods);
