import {
  CourierStatus,
  ProductStatus,
  ServiceOrderStatus,
  type CourierOrder,
  type Product,
  type ServiceOrder,
  type Transaction,
} from "../types";
import { db } from "./mockDb";

type ListOpts = { storeId?: string };

// PRODUCTS
export const listProducts = (opts: ListOpts = {}): Product[] => {
  const all: Product[] = db.listProducts();
  return opts.storeId ? all.filter((p: Product) => p.storeId === opts.storeId) : all;
};

export const createProduct = (input: Omit<Product, "id">): Product => {
  return db.addProduct(input);
};

export const approveProduct = (id: string): Product | null => {
  return db.updateProduct(id, { status: ProductStatus.APROVADO });
};

export const updateProductStock = (id: string, stock: number): Product | null => {
  return db.updateProduct(id, { stock });
};

// SERVICE ORDERS (KANBAN)
export const listServiceOrders = (opts: ListOpts = {}): ServiceOrder[] => {
  const all: ServiceOrder[] = db.listServiceOrders();
  return opts.storeId ? all.filter((s: ServiceOrder) => s.storeId === opts.storeId) : all;
};

export const moveServiceOrder = (id: string, status: ServiceOrderStatus): ServiceOrder | null => {
  return db.updateServiceOrderStatus(id, status);
};

// TRANSACTIONS (CAIXA)
export const listTransactions = (opts: ListOpts = {}): Transaction[] => {
  const all: Transaction[] = db.listTransactions();
  return opts.storeId ? all.filter((t: Transaction) => t.storeId === opts.storeId) : all;
};

export const createTransaction = (
  input: Omit<Transaction, "id" | "createdAt">
): Transaction => {
  return db.addTransaction(input);
};

// COURIER
export const listCourierOrders = (opts: ListOpts = {}): CourierOrder[] => {
  const all: CourierOrder[] = db.listCourierOrders();
  return opts.storeId ? all.filter((c: CourierOrder) => c.storeId === opts.storeId) : all;
};

export const setCourierStatus = (id: string, status: CourierStatus): CourierOrder | null => {
  return db.updateCourierStatus(id, status);
};