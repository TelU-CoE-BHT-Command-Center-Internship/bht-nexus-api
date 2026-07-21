import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { participantRoleEnum } from '../../constant/enum'
import { users } from './user-schema'
import { activities } from './activity-schema'

export const activityParticipants = pgTable(
    'activity_participants',
    {
        ...baseSchema('activityParticipant'),

        activityId: text('activity_id').references(() => activities.id),
        userId: text('user_id').references(() => users.id),

        role: participantRoleEnum('role').notNull(),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_activity_participants_unique').on(
            table.activityId,
            table.userId,
            table.role
        ),
        index('idx_activity_participants_user_id').on(table.userId)
    ]
)
