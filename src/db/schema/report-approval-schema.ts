import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { reports } from './report-schema'
import { approvals } from './approval-schema'

export const reportApprovals = pgTable(
    'report_approvals',
    {
        ...baseSchema('reportApproval'),

        reportId: text('report_id').references(() => reports.id),
        approvalId: text('approval_id').references(() => approvals.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_report_approvals_unique').on(
            table.reportId,
            table.approvalId
        ),
        index('idx_report_approvals_approval_id').on(table.approvalId)
    ]
)
