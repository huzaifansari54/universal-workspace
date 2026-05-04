export enum ResourceType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  DOCUMENT = 'DOCUMENT',
}

export enum ModuleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING_AUTH = 'PENDING_AUTH',
}

export enum ActionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  INACTIVE = 'INACTIVE',
}

export interface User {
  id: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  planId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  storagePath: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  name: string;
  status: ModuleStatus;
  config?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Capability {
  id: string;
  moduleId: string;
  name: string;
  inputTypes: ResourceType[];
  parametersSchema: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Action {
  id: string;
  capabilityId: string;
  userId: string;
  status: ActionStatus;
  executionLog?: any;
  inputResourceIds: string[];
  outputResourceIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
