export interface User {
  id: string;
  name: string;
  role: 'admin' | 'mechanic' | 'cashier' | 'courier';
  avatar?: string;
}

// Enums from domain_spec.json
export enum ServiceOrderStatus {
  AGUARDANDO = 'AGUARDANDO',
  EM_SERVICO = 'EM_SERVICO',
  FINALIZADO = 'FINALIZADO',
  ENTREGUE = 'ENTREGUE'
}

export enum ProductStatus {
  EM_CONFERENCIA = 'EM_CONFERENCIA',
  APROVADO = 'APROVADO'
}

export enum PaymentMethod {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO',
  MISTO = 'MISTO'
}

export enum CourierStatus {
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  COLETADO = 'COLETADO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO'
}

// Entities from domain_spec.json (with UI extensions)
export interface ServiceOrder {
  id: string;
  storeId: string;
  status: ServiceOrderStatus;
  customerName: string;
  plate: string;
  assignedTo?: string;
  totalEstimated: number;
  updatedAt: string;
  // UI Extensions
  vehicle: string;
  serviceDescription: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Product {
  id: string;
  storeId: string;
  labelId: string; // Acts as internal ID/SKU
  name: string;
  condition: 'Novo' | 'Usado';
  size: string;
  costPrice: number;
  suggestedPrice: number;
  status: ProductStatus;
  // UI Extensions
  stock: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  storeId: string;
  type: 'RECEITA' | 'DESPESA';
  amount: number;
  method: PaymentMethod;
  createdAt: string;
  referenceId?: string;
  // UI Extensions
  description: string;
}

export interface CourierOrder {
  id: string;
  storeId: string;
  fromStoreId: string;
  toStoreId: string;
  status: CourierStatus;
  otp?: string;
  createdAt: string;
  // UI Extensions
  description: string;
  driverName?: string;
  estimatedArrival?: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ElementType;
}

export enum RoutePath {
  LOGIN = '/login',
  KANBAN = '/app/kanban',
  PDV = '/app/pdv',
  ESTOQUE = '/app/estoque',
  CAIXA = '/app/caixa',
  COURIER = '/app/courier',
  DASHBOARD = '/app/dashboard',
  ADMIN = '/app/admin',
}
