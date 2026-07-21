import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'
import { activities } from './activity-schema'

export const activityLogs = pgTable(
    'activity_logs',
    {
        ...baseSchema('activityLog'),

        activityId: text('activity_id')
            .references(() => activities.id)
            .notNull(),
        userId: text('user_id').references(() => users.id),

        description: text('description').notNull(),
        loggedAt: timestamp('logged_at').notNull(),

        ...timestamps
    },
    table => [
        index('idx_activity_logs_activity_id').on(table.activityId),
        index('idx_activity_logs_user_id').on(table.userId),
        index('idx_activity_logs_logged_at').on(table.loggedAt)
    ]
)
