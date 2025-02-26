import { getCars, deleteCar } from "../api/carapi";
import { CarResponse } from "../types";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, Snackbar, Stack } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type CarlistProps = {
  logOut: () => void;
};

function Carlist({ logOut }: CarlistProps) {
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
        <IconButton
          aria-label="delete"
          size="small"
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
          <DeleteIcon />
        </IconButton>
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
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={2}
        >
          <AddCar />
          <Button variant="outlined" color="primary" onClick={logOut}>
            Log out
          </Button>
        </Stack>

        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          hideFooterPagination
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
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
