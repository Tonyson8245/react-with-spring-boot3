import { getCars } from "../api/carapi";
import { CarResponse } from "../types";

import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Carlist() {
  const { data, error, isSuccess } = useQuery<CarResponse[]>({
    queryKey: ["cars"],
    queryFn: getCars,
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
  ];

  if (!isSuccess) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error when fetching cars...</div>;
  } else {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._links.self.href}
      />
    );
  }
}

export default Carlist;
