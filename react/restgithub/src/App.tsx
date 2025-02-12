import "./App.css";
import { useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [repodata, setRepodata] = useState<Repository[]>([]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "id", sortable: true, filter: true },
    { field: "full_name", sortable: true, filter: true },
    { field: "html_url", sortable: true, filter: true },
    {
      headerName: "Action",
      field: "full_name",
      cellRenderer: (params: ICellRendererParams) => {
        return <button onClick={() => alert(params.value)}>Press me</button>;
      },
    },
  ]);

  const handleClick = () => {
    axios
      .get<{ items: Repository[] }>(
        `https://api.github.com/search/repositories?q=${keyword}`
      )
      .then((response) => setRepodata(response.data.items))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={handleClick}>Fetch</button>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={repodata}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
}

export default App;
