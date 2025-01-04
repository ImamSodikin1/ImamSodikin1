import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Cards from "@/components/Card/Cards";
import Input from "@/components/Input/Index";
import Spacer from "@/components/Spacer";
import RadioButton from "@/components/RadioButton";
import KeluhanForm from "@/components/Input/InputForm";
import MultiSelect from "@/components/Select/MultiSelect";
import FileUpload from "@/components/FileUpload";
import CheckboxWithLabel from "@/components/Checkbox";
import ModalLoadingCircular from "@/components/Modal/ModalLoadingCIrcular";
import Swal from "sweetalert2";
import api from "@/utils/api";

export function Keluhan() {
  const [modalLoading, setModalLoading] = useState(false);
  const [isAnonim, setAnonim] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [jenis, setJenis] = useState("");
  const [judul, setJudul] = useState('')
  const [laporan, setLaporan] = useState('')
  const [tanggalKejadian, setTanggalKejadian] = useState('')

  useEffect(() => {
    const fectData = async () => {
      await fetch(`/api/socket`);
    };

    fectData();

    const socket = io();
    socket.on("REFRESHKELUHAN", () => {});

    return () => {
      socket.off("REFRESHKELUHAN");
    };
  }, []);

  const handlerCreate = async () => {
    try {
      setModalLoading(true);
      const payload = {
        jenis: jenis,
        judul,
        content: laporan,
        tanggalKejadian,
        kategori: kategori,
        file: uploadFile,
        anonim: isAnonim,
      };

      const response = await api.post(`v1/keluhan`, payload, {
        withCredentials: true,
      });

      const { status, message } = response.data;

      Swal.fire(
        status ? "Success" : "Warning",
        message,
        status ? "success" : "warning"
      );
    } catch (error) {
      Swal.fire("Error", "Failed to create keluhan", "error");
    } finally {
      setModalLoading(false);
      setJenis("");
      setKategori([]);
      setUploadFile(null);
      setJudul('')
      setTanggalKejadian('')
      setKategori('')
    }
  };

  const handleAnonimChange = (event) => {
    setAnonim(event.target.checked);
  };

  const handleSelect = (setter) => (e) => {
    setter(e);
  };
  const handleMultiSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setKategori(selectedValues);
  };

  const handleUploadFile = (files) => {
    const fileNames = files.map((file) => file.name); // Ubah objek file menjadi array nama file
    setUploadFile(fileNames);
  };

  const handleChange = (setter) =>  (e) => {
    setter(e.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Spacer size={2} axis={"vertical"} />
      <Cards
        className={"w-2/3"}
        classNameChildren={"w-1/2"}
        children={
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="flex justify-center font-semibold p-3 rounded-sm bg-red-500 text-white w-full text-xl uppercase">
              <h1>Sampaikan Aspirasi Anda</h1>
            </div>
            <Spacer size={2} axis={"vertical"} />
            <RadioButton
              name="jenis"
              value={jenis}
              options={[
                { label: "Pengaduan", value: "Pengaduan" },
                { label: "Aspirasi", value: "Aspirasi" },
                {
                  label: "Permintaan Informasi",
                  value: "Permintaan Informasi",
                },
              ]}
              onChange={handleSelect(setJenis)}
            />
            <Spacer size={0.5} axis={"vertical"} />

            <Input
              id={"judl"}
              name={"judul"}
              placeholder={"Ketik Judul Laporan Anda*"}
              onChange={handleChange(setJudul)}
              type={"text"}
            />

            <KeluhanForm
              id={"isiLaporan"}
              name={"isiLaporan"}
              onChange={handleChange(setLaporan)}
              placeholder={"Ketik Isi Laporan Anda*"}
              type={"text"}
              rows={15}
            />
            <Input
              id={"kejadian"}
              name={"kejadian"}
              onChange={handleChange(setTanggalKejadian)}
              placeholder={"Tanggal Kejadian"}
              type={"date"}
            />
            <Spacer size={0.1} axis={"vertical"} />
            <MultiSelect
              label={"Kategori"}
              options={[
                { label: "Pengaduan", value: "option1" },
                { label: "Aspirasi", value: "option2" },
                { label: "Permintaan Informasi", value: "option3" },
              ]}
              placeholder={"Pilih Kategori"}
              onChange={handleMultiSelect}
            />
            <Spacer size={1} axis={"vertical"} />
            <FileUpload onUpload={handleUploadFile} />
            <Spacer size={2} axis={"vertical"} />
            <div className="flex justify-end items-center space-x-3 w-full">
              <CheckboxWithLabel
                id={"sayaSetuju"}
                label={"Anonim"}
                onChange={handleAnonimChange}
              />
              <button
                onClick={() => {
                  handlerCreate();
                }}
                className="uppercase font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 px-6 py-2">
                lapor !
              </button>
            </div>
            <Spacer size={1} axis={"vertical"} />
          </div>
        }
      />

      <ModalLoadingCircular show={modalLoading} />
    </div>
  );
}
