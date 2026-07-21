import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import {
    approvalEntityTypeEnum,
    approvalStepStatusEnum
} from '../../constant/enum'
import { users } from './user-schema'

export const approvals = pgTable(
    'approvals',
    {
        ...baseSchema('approval'),

        approverId: text('approver_id').references(() => users.id),

        entityType: approvalEntityTypeEnum('entity_type').notNull(),
        entityId: text('entity_id').notNull(),
        step: varchar('step', { length: 50 }).notNull(),
        status: approvalStepStatusEnum('status').notNull().default('pending'),
        notes: text('notes'),

        ...timestamps
    },
    table => [
        index('idx_approvals_entity').on(table.entityType, table.entityId),
        index('idx_approvals_approver_id').on(table.approverId),
        index('idx_approvals_status').on(table.status)
    ]
)
