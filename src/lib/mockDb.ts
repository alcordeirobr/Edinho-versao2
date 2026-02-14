import {
  CourierStatus,
  PaymentMethod,
  ProductStatus,
  ServiceOrderStatus,
  type CourierOrder,
  type Product,
  type ServiceOrder,
  type Transaction,
  type User,
} from "../types";

const nowISO = (): string => new Date().toISOString();

// Fallback para ambientes onde crypto.randomUUID pode não existir
const uid = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const DEFAULT_STORE_ID = "1";

export type MockDB = {
  users: User[];
  serviceOrders: ServiceOrder[];
  products: Product[];
  transactions: Transaction[];
  courierOrders: CourierOrder[];
};

export const mockDb: MockDB = {
  users: [
    { id: "u1", name: "Edinho Admin", role: "admin" },
    { id: "u2", name: "Carlos Mecânico", role: "mechanic" },
    { id: "u3", name: "Ana Caixa", role: "cashier" },
    { id: "u4", name: "Roberto Motoboy", role: "courier" },
  ],

  serviceOrders: [
    {
      id: "OS-1001",
      storeId: DEFAULT_STORE_ID,
      status: ServiceOrderStatus.AGUARDANDO,
      customerName: "João Silva",
      plate: "MKT1A23",
      assignedTo: "Carlos",
      totalEstimated: 320,
      updatedAt: nowISO(),
      vehicle: "Gol 1.6",
      serviceDescription: "Troca de pneus + balanceamento",
      priority: "medium",
    },
    {
      id: "OS-1002",
      storeId: DEFAULT_STORE_ID,
      status: ServiceOrderStatus.EM_SERVICO,
      customerName: "Maria Souza",
      plate: "ABC2D34",
      assignedTo: "Rafael",
      totalEstimated: 180,
      updatedAt: nowISO(),
      vehicle: "Onix 1.0",
      serviceDescription: "Alinhamento",
      priority: "low",
    },
    {
      id: "OS-1003",
      storeId: DEFAULT_STORE_ID,
      status: ServiceOrderStatus.FINALIZADO,
      customerName: "Bruno Lima",
      plate: "QWE9Z87",
      assignedTo: "Carlos",
      totalEstimated: 540,
      updatedAt: nowISO(),
      vehicle: "HB20",
      serviceDescription: "2 pneus + alinhamento + balanceamento",
      priority: "high",
    },
  ],

  products: [
    {
      id: uid(),
      storeId: DEFAULT_STORE_ID,
      labelId: "P-0001",
      name: "Pneu 175/70 R13",
      condition: "Usado",
      size: "175/70 R13",
      costPrice: 120,
      suggestedPrice: 220,
      status: ProductStatus.APROVADO,
      stock: 6,
      category: "Pneus",
    },
    {
      id: uid(),
      storeId: DEFAULT_STORE_ID,
      labelId: "P-0002",
      name: "Pneu 185/65 R15",
      condition: "Novo",
      size: "185/65 R15",
      costPrice: 220,
      suggestedPrice: 390,
      status: ProductStatus.EM_CONFERENCIA,
      stock: 3,
      category: "Pneus",
    },
    {
      id: uid(),
      storeId: DEFAULT_STORE_ID,
      labelId: "P-0100",
      name: "Válvula de Pneu",
      condition: "Novo",
      size: "Universal",
      costPrice: 2,
      suggestedPrice: 8,
      status: ProductStatus.APROVADO,
      stock: 120,
      category: "Peças",
    },
  ],

  transactions: [
    {
      id: uid(),
      storeId: DEFAULT_STORE_ID,
      type: "RECEITA",
      amount: 320,
      method: PaymentMethod.PIX,
      createdAt: nowISO(),
      referenceId: "OS-1001",
      description: "Venda OS-1001",
    },
    {
      id: uid(),
      storeId: DEFAULT_STORE_ID,
      type: "DESPESA",
      amount: 150,
      method: PaymentMethod.DINHEIRO,
      createdAt: nowISO(),
      description: "Compra de insumos",
    },
  ],

  courierOrders: [
    {
      id: "1",
      storeId: DEFAULT_STORE_ID,
      fromStoreId: "1",
      toStoreId: "2",
      status: CourierStatus.ACEITO,
      otp: "4590",
      createdAt: "14:00",
      description: "Transferência de Pneus (4x)",
      driverName: "Roberto",
      estimatedArrival: "14:30",
    },
    {
      id: "2",
      storeId: DEFAULT_STORE_ID,
      fromStoreId: "1",
      toStoreId: "3",
      status: CourierStatus.PENDENTE,
      createdAt: "14:15",
      description: "Peças de Reposição",
      estimatedArrival: "15:00",
    },
    {
      id: "3",
      storeId: DEFAULT_STORE_ID,
      fromStoreId: "1",
      toStoreId: "2",
      status: CourierStatus.ENTREGUE,
      createdAt: "10:00",
      description: "Documentos Fiscais",
      driverName: "Carlos",
      estimatedArrival: "10:45",
    },
  ],
};

// DB “em memória” (fonte única de verdade pro mockApi)
export const db = {
  // Users
  listUsers(): User[] {
    return mockDb.users;
  },

  // Products
  listProducts(): Product[] {
    return mockDb.products;
  },

  addProduct(input: Omit<Product, "id">): Product {
    const created: Product = { ...input, id: uid() };
    mockDb.products.unshift(created);
    return created;
  },

  updateProduct(id: string, patch: Partial<Product>): Product | null {
    const idx = mockDb.products.findIndex((p: Product) => p.id === id);
    if (idx === -1) return null;
    mockDb.products[idx] = { ...mockDb.products[idx], ...patch };
    return mockDb.products[idx];
  },

  deleteProduct(id: string): boolean {
    const before = mockDb.products.length;
    mockDb.products = mockDb.products.filter((p: Product) => p.id !== id);
    return mockDb.products.length !== before;
  },

  // Service Orders
  listServiceOrders(): ServiceOrder[] {
    return mockDb.serviceOrders;
  },

  updateServiceOrderStatus(id: string, status: ServiceOrderStatus): ServiceOrder | null {
    const so = mockDb.serviceOrders.find((s: ServiceOrder) => s.id === id);
    if (!so) return null;
    so.status = status;
    so.updatedAt = nowISO();
    return so;
  },

  // Transactions
  listTransactions(): Transaction[] {
    return mockDb.transactions;
  },

  addTransaction(input: Omit<Transaction, "id" | "createdAt">): Transaction {
    const created: Transaction = { ...input, id: uid(), createdAt: nowISO() };
    mockDb.transactions.unshift(created);
    return created;
  },

  // Courier
  listCourierOrders(): CourierOrder[] {
    return mockDb.courierOrders;
  },

  updateCourierStatus(id: string, status: CourierStatus): CourierOrder | null {
    const co = mockDb.courierOrders.find((c: CourierOrder) => c.id === id);
    if (!co) return null;
    co.status = status;
    return co;
  },
};