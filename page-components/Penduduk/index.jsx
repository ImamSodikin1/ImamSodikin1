import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import api from "@/utils/api";
import DataTable from "@/components/DataTable";
import Spacer from "@/components/Spacer";
import Modal from "@/components/Modal";
import Input from "@/components/Input/Index";
import ModalLoadingCircular from "@/components/Modal/ModalLoadingCIrcular";
import Swal from "sweetalert2";
import io from "socket.io-client";
import Select from "@/components/Select";

export function Penduduk() {
  const [modalAddPenduduk, setModalAddPenduduk] = useState(false);
  const [modalEditPenduduk, setModalEditPenduduk] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [dataPenduduk, setDataPenduduk] = useState([]);
  const [statusPernikahan, setStatusPernikahan] = useState();
  const [kepalaKeluarga, setKepalaKeluarga] = useState();
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJeniKelamin] = useState("");
  const [status, setStatus] = useState('')
  const { theme } = useTheme();

  const nameRef = useRef();
  const umurRef = useRef();
  const alamatRef = useRef();
  const pekerjaanRef = useRef();
  const kewarganegaraanRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`api/socket`);
      } catch (err) {
        console.log("error connect socker", err);
      }
    };

    fetchDataPenduduk();

    fetchData();

    const socket = io();
    socket.on("UPDATEPENDUDUK", () => {
      fetchDataPenduduk();
    });

    return () => {
      socket.off("UPDATEPENDUDUK");
    };
  }, []);

  const columns = [
    {
      name: "_id",
      label: "No",
      options: {
        filter: true,
        width: "10em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center" }, // Sel berada di tengah
        // }),
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "nama",
      label: "Nama",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        setCellHeaderProps: () => ({
          style: { textAlign: "center", fontWeight: "bold" },
        }),
      },
    },

    {
      name: "umur",
      label: "Umur",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        // setCellHeaderProps: () => ({
        //   style: { textAlign: "center", fontWeight: "bold" },
        // }),
      },
    },
    {
      name: "jenisKelamin",
      label: "Jenis Kelamin",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        // setCellHeaderProps: () => ({
        //   style: { textAlign: "center", fontWeight: "bold" },
        // }),
      },
    },
    {
      name: "alamat",
      label: "Alamat",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        setCellHeaderProps: () => ({
          style: { textAlign: "center", fontWeight: "bold" },
        }),
      },
    },
    {
      name: "statusPernikahan",
      label: "Status Pernikahan",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        // setCellHeaderProps: () => ({
        //   style: { textAlign: "center", fontWeight: "bold" },
        // }),
      },
    },
    {
      name: "tanggalLahir",
      label: "Tanggal Lahir",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        customBodyRender: (value) => {
          // Pastikan value adalah string tanggal
          if (!value) return "-";
          const date = new Date(value);
          return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        },
      },
    },

    {
      name: "kewarganegaraan",
      label: "Kewarganegaraan",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        // setCellHeaderProps: () => ({
        //   style: { textAlign: "center", fontWeight: "bold" },
        // }),
      },
    },

    {
      name: "kepalaKeluarga",
      label: "Kepala Kelaurga",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        customBodyRender: (value) => {
          return value === false ? "Tidak" : "Ya";
        },
      },
    },
    {
      name: "pekerjaan",
      label: "Pekerjaan",
      options: {
        filter: true,
        width: "15em", // Lebar kolom lebih besar
        // setCellProps: () => ({
        //   style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        // }),
        // setCellHeaderProps: () => ({
        //   style: { textAlign: "center", fontWeight: "bold" },
        // }),
      },
    },
    {
      name: "ACTION",
      options: {
        setCellProps: () => ({
          style: { textAlign: "center", fontWeight: "medium" }, // Sel berada di tengah
        }),
        filter: false,
        sort: false,
        download: false,
        setCellHeaderProps: () => ({
          style: { textAlign: "center", fontWeight: "bold" },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div className="flex justify-center gap-3">
              <button
                className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1.5 uppercase font-semibold rounded-full"
                onClick={() => {
                  handleDeletePenduduk(tableMeta.rowData);
                }}>
                Delete
              </button>
              <button
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white uppercase font-semibold px-6 py-1.5 rounded-full"
                onClick={() => {
                  setSelectedValues(tableMeta.rowData);
                  setModalEditPenduduk(true);
                }}>
                Edit
              </button>
            </div>
          );
        },
      },
    },
  ];

  const handleCreatePenduduk = async () => {
    try {
      setModalAddPenduduk(false);
      setModalLoading(true);

      const payload = {
          nama: nameRef.current?.value,
          umur: umurRef.current?.value,
          jenisKelamin: jenisKelamin,
          alamat: alamatRef.current?.value,
          statusPernikahan: statusPernikahan,
          kepalaKeluarga,
          tanggalLahir,
          pekerjaan: pekerjaanRef.current?.value,
          kewarganegaraan: kewarganegaraanRef.current?.value,
      };

      console.log(payload.nama)

      for (const [key, value] of Object.entries(payload)) {
        if (!value) {
          setModalAddPenduduk(true);
          return Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `${key} tidak boleh kosong!`,
            color: theme === "dark" ? "#fff" : "#000",
            background: theme === "dark" ? "#2d3748" : "#fff",
          });
        }
      }

      const response = await api.post(`v1/penduduk`, payload);

      const { status, message } = response.data;
      Swal.fire(
        status ? "Success" : "Warning",
        message,
        status ? "success" : "warning"
      );
    } catch (error) {
      Swal.fire("Error", "Failed to create penduduk", "error");
    } finally {
      setModalLoading(false);
      setJeniKelamin();
      setStatusPernikahan();
      setKepalaKeluarga();
      setTanggalLahir();
    }
  };

  const handleDeletePenduduk = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ? ${data[1]}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    if (result.isConfirmed) {
      setModalLoading(true);
      try {
        const response = await api.delete(`v1/penduduk?_id=${data[0]}`);
        const { status, message } = response.data

        Swal.fire(
          status ? 'Success' : 'Warning',
          message,
          status ? 'success' : 'warning'
        )
      } catch (error) {
        Swal.fire("Error", "Failed to delete penduduk", "error");
      } finally {
        setModalLoading(false);
      }
    }
  };

  const handleEditPenduduk = async () => {
    try {
      setModalEditPenduduk(false);
      setModalLoading(true);

      const payload = {
        _id: selectedValues[0],
        nama: selectedValues[1],
        umur: selectedValues[2],
        jenisKelamin: selectedValues[3],
        alamat: selectedValues[4],
        statusPernikahan: selectedValues[5],
        kepalaKeluarga: selectedValues[8],
        tanggalLahir: selectedValues[6],
        pekerjaan: selectedValues[9],
        kewarganegaraan: selectedValues[7],
      };

      const response = await api.put(`v1/penduduk`, payload, {
        withCredentials: true,
      });
      const { status, message } = response.data;

      Swal.fire(
        status ? "Success" : "warning",
        message,
        status ? "success" : "warning"
      );
    } catch (error) {
      Swal.fire("Error", "Failed to edit penduduk", "error");
    } finally {
      setModalLoading(false);
    }
  };

  const fetchDataPenduduk = async () => {
    try {
      setModalLoading(true);
      const response = await api.get(`v1/penduduk`, { withCredentials: true });
      const { status, data } = response.data;
      if (status) return setDataPenduduk(data);
    } catch (err) {
      console.log("error fetch data penduduk", err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleRowSelection = (selectedRows) => {
    console.log("Selected rows:", selectedRows);
  };

  const handleChange = (index, value) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleChangeSelect = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div>
      <Spacer size={1} axis={"vertical"} />
      <DataTable
        pageSize={8}
        button={'Tambah Data'}
        onClick={() => setModalAddPenduduk(true)}
        title={"Data Penduduk"}
        columns={columns}
        data={dataPenduduk}
        onRowSelected={handleRowSelection}
      />

      <Modal
        show={modalAddPenduduk}
        onClose={() => setModalAddPenduduk(false)}
        title={"Tambah Penduduk"}
        button={"Create"}
        onClick={handleCreatePenduduk}
        content={
          <div className="flex flex-col justify-start sm:h-44 md:h-44 lg:h-64 overflow-y-auto p-4">
            <Input 
              label={"Nama"} 
              ref={nameRef} 
              placeholder={"Masukan Nama"} 
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input 
              label={"Umur"} 
              ref={umurRef} 
              placeholder={"Masukan Umur"} 
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Alamat"}
              ref={alamatRef}
              placeholder={"Masukan Alamat"}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              id="statusPernikahan"
              label="Status Pernikahan"
              name="statusPernikahan"
              value={statusPernikahan}
              onChange={handleChangeSelect(setStatusPernikahan)}
              options={[
                { label: "Menikah", value: "menikah" },
                { label: "Belum Menikah", value: "belum" },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />

            <Select
              id="jenisKelamin"
              label="Jenis Kelamin"
              name="jenisKelamin"
              plcaeholder={"Jenis Kelamin"}
              value={jenisKelamin}
              onChange={handleChangeSelect(setJeniKelamin)}
              options={[
                { label: "Pria", value: "pria" },
                { label: "Wanita", value: "wanita" },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              label="Kepala Keluarga"
              plcaeholder={"Kepala Keluarga"}
              value={kepalaKeluarga}
              onChange={handleChangeSelect(setKepalaKeluarga)}
              options={[
                { label: "No", value: false },
                { label: "Yes", value: true },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              label="Status Hidup"
              plcaeholder={"Status Hidup"}
              value={status}
              onChange={handleChangeSelect(setStatus)}
              options={[
                { label: "Hidup", value: 'hidup' },
                { label: "Meninggal", value: 'meninggal' },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />

            <Input
              label={"Tanggal Lahir"}
              type={"date"}
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              placeholder={"Masukan Tanggal Lahir"}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Pekerjaan"}
              ref={pekerjaanRef}
              placeholder={"Masukan Pekerjaan"}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Kewarganegaraan"}
              ref={kewarganegaraanRef}
              placeholder={"Masukan Kewarganegaraan"}
            />
          </div>
        }
      />

      <Modal
        show={modalEditPenduduk}
        onClose={() => setModalEditPenduduk(false)}
        title={"Edit Penduduk"}
        button={"Edit"}
        onClick={handleEditPenduduk}
        content={
          <div className="flex flex-col justify-start sm:h-44 md:h-44 lg:h-64 overflow-y-auto p-4">
            <Input
              label={"Nama"}
              value={selectedValues[1]}
              onChange={(e) => handleChange(1, e.target.value)}
              placeholder={selectedValues[1]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Umur"}
              value={selectedValues[2]}
              onChange={(e) => handleChange(2, e.target.value)}
              placeholder={selectedValues[2]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Alamat"}
              value={selectedValues[4]}
              onChange={(e) => handleChange(4, e.target.value)}
              placeholder={selectedValues[4]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              id="statusPernikahan"
              label="Status Pernikahan"
              name="statusPernikahan"
              value={selectedValues[5]}
              onChange={(e) => handleChange(5, e.target.value)}
              options={[
                { label: "Menikah", value: "menikah" },
                { label: "Belum Menikah", value: "belum" },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />

            <Select
              id="jenisKelamin"
              label="Jenis Kelamin"
              name="jenisKelamin"
              plcaeholder={selectedValues[3]}
              value={selectedValues[3]}
              onChange={(e) => handleChange(3, e.target.value)}
              options={[
                { label: "Pria", value: "pria" },
                { label: "Wanita", value: "wanita" },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              id="exampleSelect"
              label="Kepala Keluarga"
              name="exampleSelect"
              plcaeholder={selectedValues[8]}
              value={selectedValues[8]}
              onChange={(e) => handleChange(8, e.target.value)}
              options={[
                { label: "No", value: false },
                { label: "Yes", value: true },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Select
              id="status"
              label="Status Hidup"
              name="statusHidup"
              plcaeholder={selectedValues[8]}
              value={selectedValues[8]}
              onChange={(e) => handleChange(8, e.target.value)}
              options={[
                { label: "Hidup", value: 'hidup' },
                { label: "Meninggal", value: 'meninggal' },
              ]}
            />
            <Spacer size={0.3} axis={"vertical"} />

            <Input
              label={"Tanggal Lahir"}
              type={"date"}
              value={selectedValues[6]}
              onChange={(e) => handleChange(6, e.target.value)}
              placeholder={selectedValues[6]}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Pekerjaan"}
              value={selectedValues[9]}
              placeholder={selectedValues[9]}
              onChange={(e) => handleChange(9, e.target.value)}
            />
            <Spacer size={0.3} axis={"vertical"} />
            <Input
              label={"Kewarganegaraan"}
              value={selectedValues[7]}
              placeholder={selectedValues[7]}
              onChange={(e) => handleChange(7, e.target.value)}
            />
          </div>
        }
      />

      <ModalLoadingCircular show={modalLoading} />
    </div>
  );
}
