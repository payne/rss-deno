import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const feedsTable = sqliteTable("feeds", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    url: text().notNull(),
});

export const postsTable = sqliteTable("posts", {
    id: int().primaryKey({ autoIncrement: true }),
    feedId: int().notNull(),
    title: text().notNull(),
    content: text().notNull(),
});