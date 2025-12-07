import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull().default('')
});

export const faviconSubmissions = pgTable('favicon_submissions', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    websiteUrl: text('website_url').notNull(),
    email: text('email').notNull(),
    createdAt: text('created_at').notNull().default(new Date().toISOString()),
    lovesCount: integer('loves_count').notNull().default(0),
    clicksCount: integer('clicks_count').notNull().default(0),
    faviconImage: text('favicon_image'), // Stores the base64 encoded image
});