import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { activities } from './activity-schema'
import { approvals } from './approval-schema'

export const activityApprovals = pgTable(
    'activity_approvals',
    {
        ...baseSchema('activityApproval'),

        activityId: text('activity_id').references(() => activities.id),
        approvalId: text('approval_id').references(() => approvals.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_activity_approvals_unique').on(
            table.activityId,
            table.approvalId
        ),
        index('idx_activity_approvals_approval_id').on(table.approvalId)
    ]
)
