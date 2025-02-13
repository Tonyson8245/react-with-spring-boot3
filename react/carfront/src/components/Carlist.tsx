import { getCars } from "../api/carapi";
import { CarResponse } from "../types";

import { useQuery } from "@tanstack/react-query";

function Carlist() {
  const { data, error, isSuccess } = useQuery<CarResponse[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  if (!isSuccess) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error when fetching cars...</div>;
  } else {
    return (
      <table>
        <tbody>
          {data.map((car: CarResponse) => (
            <tr key={car._links.self.href}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.registrationNumber}</td>
              <td>{car.modelYear}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Carlist;
