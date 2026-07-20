import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'

export const documents = pgTable('documents', {
    ...baseSchema('document'),

    uploadedBy: text('uploaded_by').references(() => users.id),

    relatedType: varchar('related_type', { length: 50 }).notNull(),
    relatedId: text('related_id').notNull(),
    fileName: varchar('file_name', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 50 }).notNull(),
    fileSize: integer('file_size').notNull(),
    fileUrl: text('file_url').notNull(),

    ...timestamps
})
