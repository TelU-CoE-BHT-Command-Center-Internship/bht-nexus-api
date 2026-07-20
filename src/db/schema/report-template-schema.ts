import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'

export const reportTemplates = pgTable('report_templates', {
    ...baseSchema('reportTemplate'),

    createdBy: text('created_by').references(() => users.id),

    name: varchar('name', { length: 150 }).notNull(),
    structure: text('structure').notNull(),

    ...timestamps
})
