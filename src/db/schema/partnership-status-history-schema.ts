import { index, pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { partnershipStatusEnum } from '../../constant/enum'
import { partners } from './partner-schema'
import { users } from './user-schema'

export const partnershipStatusHistories = pgTable(
    'partnership_status_histories',
    {
        ...baseSchema('partnershipStatusHistory'),

        partnerId: text('partner_id').references(() => partners.id),
        changedBy: text('changed_by').references(() => users.id),

        status: partnershipStatusEnum('status').notNull(),
        notes: text('notes'),

        ...timestamps
    },
    table => [
        index('idx_partnership_histories_partner_id').on(table.partnerId),
        index('idx_partnership_histories_created_at').on(table.created_at)
    ]
)
