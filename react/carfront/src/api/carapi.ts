import { CarResponse, Car, CarEntry } from "../types";
import axios, { AxiosRequestConfig } from "axios";

const getAxsiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");

  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getAxsiosConfig()
  );
  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<void> => {
  const response = await axios.delete(link, getAxsiosConfig());

  return response.data;
};

export const addCar = async (car: Car): Promise<void> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getAxsiosConfig()
  );
  return response.data;
};

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(
    carEntry.url,
    carEntry.car,
    getAxsiosConfig()
  );
  return response.data;
};
