import { index, pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { reports } from './report-schema'

export const reportSnapshots = pgTable(
    'report_snapshots',
    {
        ...baseSchema('reportSnapshot'),

        reportId: text('report_id').references(() => reports.id),

        frozenData: text('frozen_data').notNull(),

        ...timestamps
    },
    table => [index('idx_report_snapshots_report_id').on(table.reportId)]
)
