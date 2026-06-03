import { pgTable, pgEnum, serial, varchar } from 'drizzle-orm/pg-core';

export const userLevelEnum = pgEnum('user_level_enum', [
  'BASIC',
  'INTERMEDIATE',
  'ADVANCED',
  'GAMER',
  'PROFESSIONAL',
]);

export const permissionEnum = pgEnum('permission_enum', [
  'ADMIN',
  'USER',
  'CURATOR',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  level: userLevelEnum('level').default('BASIC'),
  permission: permissionEnum('permission').default('USER'),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;