import axios from "axios";
import AdminLayout from "components/AdminLayout";
import Create, { Fields, InputField, SubmitMessage } from "components/Create";
import withAdminAuth from "utils/withAdminAuth";
import { adminRequestConfig } from "..";

const eventField: InputField[] = [
  {
    type: "datetime",
    name: "date",
    variant: "date",
    validator: (v) => (v ? undefined : "Wajib Diisi"),
  },
  {
    type: "array",
    name: "foto",
    label: "URL Foto",
    min: 1,
    max: 5,
    validator: (v) => {
      let isError = false;
      v.forEach((value) => {
        if (isError) return;

        isError = value.length === 0 || value === "";
      });
      return isError ? "Ada yang kosong" : undefined;
    },
  },
  {
    type: "text",
    name: "name",
    label: "Nama Event",
    validator: (v) => (v.length === 0 || v === "" ? "Wajib Diisi" : undefined),
  },
  {
    type: "text",
    name: "descId",
    label: "Deskripsi (Indonesia)",
    multiline: true,
    validator: (v) => (v.length === 0 || v === "" ? "Wajib Diisi" : undefined),
  },
  {
    type: "text",
    name: "descEn",
    label: "Deskripsi (English)",
    multiline: true,
    validator: (v) => (v.length === 0 || v === "" ? "Wajib Diisi" : undefined),
  },
  {
    type: "text",
    name: "openingId",
    label: "Opening Message (Indonesia)",
    multiline: true,
    validator: (v) => (v.length === 0 || v === "" ? "Wajib Diisi" : undefined),
  },
  {
    type: "text",
    name: "openingEn",
    label: "Opening Message (English)",
    multiline: true,
    validator: (v) => (v.length === 0 || v === "" ? "Wajib Diisi" : undefined),
  },
];

const AdminEvent = () => {
  const handleSubmit = async (fields: Fields) => {
    try {
      await axios.post(
        "https://narauction.et.r.appspot.com/event",
        fields,
        adminRequestConfig()
      );
      return {
        message: "Event berhasil ditambah",
        type: "success",
      } as SubmitMessage;
    } catch (e: any) {
      return { message: e.message, type: "error" } as SubmitMessage;
    }
  };

  return (
    <AdminLayout>
      <Create fields={eventField} onSubmit={handleSubmit}>
        <h1>Buat Event</h1>
      </Create>
    </AdminLayout>
  );
};

export default withAdminAuth(AdminEvent);
