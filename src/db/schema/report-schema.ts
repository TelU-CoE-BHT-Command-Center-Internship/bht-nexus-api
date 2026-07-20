import { boolean, date, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { contentStatusEnum, reportPeriodTypeEnum } from '../../configs/enum'
import { users } from './user-schema'
import { divisions } from './organization-schema'
import { reportTemplates } from './report-template-schema'

export const reports = pgTable('reports', {
    ...baseSchema('report'),

    templateId: text('template_id').references(() => reportTemplates.id),
    divisionId: text('division_id').references(() => divisions.id),
    createdBy: text('created_by').references(() => users.id),

    title: varchar('title', { length: 200 }).notNull(),
    periodType: reportPeriodTypeEnum('period_type').notNull(),
    periodStart: date('period_start').notNull(),
    periodEnd: date('period_end').notNull(),
    status: contentStatusEnum('status').notNull().default('draft'),
    isLocked: boolean('is_locked').notNull().default(false),

    ...timestamps
})
