import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid, GridColumns, GridSelectionModel } from "@mui/x-data-grid";
import Link from "next/link";
import axios from "axios";
import AdminLayout from "components/AdminLayout";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import withAdminAuth from "utils/withAdminAuth";
import { adminRequestConfig } from "..";
import { Barang } from "utils/types";

const columns: GridColumns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 200,
    renderCell: (params) => (
      <Link href={`/admin/barang/${params.row.id}`}>
        {params.row.id.toString()}
      </Link>
    ),
  },
  {
    field: "lot",
    minWidth: 200,
  },
  {
    field: "namaBarang",
    headerName: "Nama",
    minWidth: 200,
  },
  {
    field: "foto",
    headerName: "Foto",
    renderCell: (params) => (
      <img
        src={params.row.foto[0]}
        alt={params.row.id}
        style={{ objectFit: "cover", width: "100%" }}
      />
    ),
  },
  {
    field: "tahunPembuatan",
    headerName: "Tahun",
    minWidth: 50,
  },
  {
    field: "asalDaerah",
    headerName: "Asal Daerah",
    minWidth: 200,
  },
  {
    field: "descId",
    headerName: "Desc ID",
    minWidth: 200,
  },
  {
    field: "descEn",
    headerName: "Desc EN",
    minWidth: 200,
  },
  {
    field: "minPrice",
    headerName: "Open Bid",
    valueGetter: (params) =>
      (params.row.priceRange[0] as number).toLocaleString(),
  },
  {
    field: "hargaAwal",
    headerName: "Normal Price",
    valueGetter: (params) =>
      ((params.row.hargaAwal as number) ?? 0).toLocaleString(),
  },
  // {
  //   field: "maxPrice",
  //   headerName: "Max Price",
  //   valueGetter: (params) =>
  //     (params.row.priceRange[1] as number).toLocaleString(),
  // },
  {
    field: "size",
    headerName: "Size (cm)",
    minWidth: 160,
    valueGetter: (params) =>
      `${(params.row.size[0] as number).toLocaleString()} x ${(
        params.row.size[1] as number
      ).toLocaleString()}`,
  },
  {
    field: "tipe",
    headerName: "Tipe",
  },
  {
    field: "isAvailable",
    headerName: "Available",
    valueGetter: (params) => (params.row.isAvailable ? "V" : "-"),
  },
  {
    field: "dyeType",
    headerName: "Dye Type",
  },
  {
    field: "eventID",
    headerName: "Event ID",
  },
];

function AdminBarangList() {
  const router = useRouter();
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | undefined>();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data } = await axios.get<Barang[]>(
        "https://narauction.et.r.appspot.com/barang"
      );
      console.log(data);

      setRows([...data]);
      setIsLoading(false);
    };

    fetch();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map((id) =>
          axios.delete(
            `https://narauction.et.r.appspot.com/barang/${id}`,
            adminRequestConfig()
          )
        )
      );
      router.reload();
    } catch {
      setAlertMessage("Delete failed");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertMessage(undefined);
  };

  return (
    <AdminLayout>
      <Snackbar
        open={alertMessage !== undefined}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ width: "100%", padding: "0 64px" }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Box>
            <h1>Barang</h1>
            <p>Barang list</p>
          </Box>
          <Link passHref href="/admin/barang/create">
            <Button variant="contained">Create</Button>
          </Link>
        </Box>
        {selected.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            style={{ marginBottom: "16px" }}
            onClick={handleDelete}
          >
            Delete {selected.length} Data
          </Button>
        )}
        <DataGrid
          autoPageSize
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(e) => setSelected(e)}
          onRowClick={(e) => console.log(e.id)}
          loading={isLoading}
        />
      </Box>
    </AdminLayout>
  );
}

export default withAdminAuth(AdminBarangList);
