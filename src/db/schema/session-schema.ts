import {
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex
} from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'

export const sessions = pgTable(
    'sessions',
    {
        ...baseSchema('sessions'),

        userId: text('user_id')
            .references(() => users.id)
            .notNull(),
        token: text('token').notNull().unique(),
        expires_at: timestamp('expires_at').notNull(),
        user_agent: text('user_agent'),
        ip_address: text('ip_address'),

        ...timestamps
    },
    table => [
        index('idx_sessions_user_id').on(table.userId),
        uniqueIndex('idx_sessions_token').on(table.token)
    ]
)
