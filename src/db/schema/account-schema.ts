import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'

export const accounts = pgTable(
    'accounts',
    {
        ...baseSchema('accounts'),

        userId: text('user_id')
            .references(() => users.id, { onDelete: 'cascade' })
            .notNull(),

        provider_id: text('provider_id').notNull(),
        access_token: text('access_token'),
        refresh_token: text('refresh_token'),
        id_token: text('id_token'),
        access_token_expires_at: timestamp('access_token_expires_at'),
        refresh_token_expires_at: timestamp('refresh_token_expires_at'),
        scope: text('scope'),
        password: text('password'),

        ...timestamps
    },
    table => [index('idx_accounts_user_id').on(table.userId)]
)
