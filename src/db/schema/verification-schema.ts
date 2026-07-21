import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'

export const verifications = pgTable(
    'verifications',
    {
        ...baseSchema('verifications'),

        identifier: text('identifier').notNull(),
        value: text('value').notNull(),
        expires_at: timestamp('expires_at').notNull(),

        ...timestamps
    },
    table => [
        index('idx_verifications_identifier').on(table.identifier),
        index('verifications_is_deleted_idx').on(table.is_deleted)
    ]
)
