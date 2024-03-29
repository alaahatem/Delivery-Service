// order.interface.ts
import { OrderStatus } from "./enums";
export interface Order {
  id: string;
  pickup: Address;
  dropoff: Address;
  packages: Package[];
  status: OrderStatus;
  totalPrice: number;
}

export interface Address {
  address: string;
  city: string;
  country: string;
  email: string;
  name: string;
  zipcode: string;
  phonenumber: string;
}

export interface Package {
  weight: number;
  height: number;
  width: number;
  length: number;
}
