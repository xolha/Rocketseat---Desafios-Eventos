import { integer, jsonb, text, timestamp, pgTable } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"

// tabela que armazena requisições feitas
export const webhooks = pgTable("webhooks", {
    id: text().primaryKey().$defaultFn(() => uuidv7()),
    method: text().notNull(),
    pathname: text().notNull(),
    ip: text().notNull(),
    statusCode: text().notNull(),
    contentType: text(),
    contentLength: integer(),
    QueryParams: jsonb().$type<Record<string, string>>(),
    headers: jsonb().$type<Record<string, string>>().notNull(),
    body: text(),
    createdAt: timestamp().notNull().defaultNow(),
})