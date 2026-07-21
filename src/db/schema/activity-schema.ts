import {
    boolean,
    date,
    index,
    pgTable,
    text,
    varchar
} from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import {
    approvalStatusEnum,
    executionStatusEnum,
    visibilityLevelEnum
} from '../../constant/enum'
import { users } from './user-schema'
import { divisions } from './organization-schema'
import { programs } from './program-schema'

export const activities = pgTable(
    'activities',
    {
        ...baseSchema('activity'),

        programId: text('program_id').references(() => programs.id),
        divisionId: text('division_id').references(() => divisions.id),
        createdBy: text('created_by').references(() => users.id),

        title: varchar('title', { length: 200 }).notNull(),
        type: varchar('type', { length: 100 }).notNull(),
        description: text('description'),
        activityDate: date('activity_date').notNull(),
        dueDate: date('due_date'),
        approvalStatus: approvalStatusEnum('approval_status')
            .notNull()
            .default('draft'),
        executionStatus: executionStatusEnum('execution_status')
            .notNull()
            .default('not_started'),
        visibility: visibilityLevelEnum('visibility')
            .notNull()
            .default('internal'),
        isLocked: boolean('is_locked').notNull().default(false),
        isLate: boolean('is_late').notNull().default(false),

        ...timestamps
    },
    table => [
        index('idx_activities_program_id').on(table.programId),
        index('idx_activities_division_id').on(table.divisionId),
        index('idx_activities_created_by').on(table.createdBy),
        index('idx_activities_approval_status').on(table.approvalStatus),
        index('idx_activities_due_date_late').on(table.dueDate, table.isLate),
        index('idx_activities_visibility').on(table.visibility)
    ]
)
