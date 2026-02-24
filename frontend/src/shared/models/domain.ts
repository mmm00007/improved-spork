export type ID = string;

export interface Exercise {
  id: ID;
  userId: ID;
  name: string;
  primaryMuscleGroup?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EquipmentVariant {
  id: ID;
  userId: ID;
  exerciseId: ID;
  name: string;
  loadUnit: 'kg' | 'lb';
  createdAt: string;
  updatedAt: string;
}

export interface SetLog {
  id: ID;
  userId: ID;
  exerciseId: ID;
  equipmentVariantId?: ID;
  sessionGroupId: ID;
  reps: number;
  load: number;
  rpe?: number;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionGroup {
  id: ID;
  userId: ID;
  startedAt: string;
  endedAt?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: ID;
  defaultWeightUnit: 'kg' | 'lb';
  locale: string;
  theme: 'light' | 'dark' | 'system';
  weekStartsOn: 0 | 1;
  updatedAt: string;
}
