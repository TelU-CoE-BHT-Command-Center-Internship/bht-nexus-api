import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'
import { activities } from './activity-schema'

export const activityLogs = pgTable('activity_logs', {
    ...baseSchema('activityLog'),

    activityId: text('activity_id').references(() => activities.id),
    userId: text('user_id').references(() => users.id),

    description: text('description').notNull(),
    loggedAt: timestamp('logged_at').notNull(),

    ...timestamps
})
