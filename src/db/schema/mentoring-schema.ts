import { date, index, pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { mentoringStatusEnum } from '../../configs/enum'
import { users } from './role-schema'

export const mentoringRelationships = pgTable(
    'mentoring_relationships',
    {
        ...baseSchema('mentoring_relationship'),

        mentorId: text('mentor_id')
            .references(() => users.id)
            .notNull(),
        menteeId: text('mentee_id')
            .references(() => users.id)
            .notNull(),

        status: mentoringStatusEnum('status').notNull().default('active'),
        startDate: date('start_date').notNull(),
        endDate: date('end_date'),

        ...timestamps
    },
    table => [
        index('mentoring_relationships_mentee_status_idx').on(
            table.menteeId,
            table.status
        ),
        index('mentoring_relationships_mentor_status_idx').on(
            table.mentorId,
            table.status
        )
    ]
)
