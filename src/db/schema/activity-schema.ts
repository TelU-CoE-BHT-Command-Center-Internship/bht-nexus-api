import { boolean, date, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { activityStatusEnum, visibilityLevelEnum } from '../../configs/enum'
import { users } from './role-schema'
import { divisions } from './organization-schema'
import { programs } from './program-schema'

export const activities = pgTable('activities', {
    ...baseSchema('activity'),

    programId: text('program_id').references(() => programs.id),
    divisionId: text('division_id').references(() => divisions.id),
    createdBy: text('created_by').references(() => users.id),

    title: varchar('title', { length: 200 }).notNull(),
    type: varchar('type', { length: 100 }).notNull(),
    description: text('description'),
    activityDate: date('activity_date').notNull(),
    dueDate: date('due_date'),
    status: activityStatusEnum('status').notNull().default('draft'),
    visibility: visibilityLevelEnum('visibility').notNull().default('internal'),
    isLocked: boolean('is_locked').notNull().default(false),

    ...timestamps
})
