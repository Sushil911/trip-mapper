import { integer } from "drizzle-orm/gel-core";
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { number } from "zod";

export const roleEnum = pgEnum("role",[
  "tourist",
  "guide"
])

export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: roleEnum("role").default("tourist").notNull(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const locations = pgTable("locations", {
  id: text('id').primaryKey(),
  locations: text('locations').notNull(),
  description: text('description').notNull(),
  rating: text('rating').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  again:boolean('again').$defaultFn(() => true).notNull(),
});