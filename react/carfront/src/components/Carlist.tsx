import { getCars, deleteCar } from "../api/carapi";
import { CarResponse } from "../types";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data, error, isSuccess } = useQuery<CarResponse[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    {
      field: "brand",
      headerName: "Brand",
      width: 200,
    },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    {
      field: "registerNumber",
      headerName: "Reg.nr",
      width: 150,
    },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />,
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`
              )
            ) {
              mutate(params.row._links.car.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (!isSuccess) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error when fetching cars...</div>;
  } else {
    return (
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          hideFooterPagination
          getRowId={(row) => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }
}

export default Carlist;
