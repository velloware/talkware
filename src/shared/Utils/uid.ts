import { randomUUID as UUIDs4 } from 'node:crypto';

export const uidCreate = (): string => UUIDs4();
