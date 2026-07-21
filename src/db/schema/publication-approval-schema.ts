import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { publications } from './content-schema'
import { approvals } from './approval-schema'

export const publicationApprovals = pgTable(
    'publication_approvals',
    {
        ...baseSchema('publicationApproval'),

        publicationId: text('publication_id').references(() => publications.id),
        approvalId: text('approval_id').references(() => approvals.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_publication_approvals_unique').on(
            table.publicationId,
            table.approvalId
        ),
        index('idx_publication_approvals_approval_id').on(table.approvalId)
    ]
)
