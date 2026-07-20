import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { partnershipStatusEnum } from '../../configs/enum'
import { partners } from './partner-schema'
import { users } from './role-schema'

export const partnershipStatusHistories = pgTable(
    'partnership_status_histories',
    {
        ...baseSchema('partnershipStatusHistory'),

        partnerId: text('partner_id').references(() => partners.id),
        changedBy: text('changed_by').references(() => users.id),

        status: partnershipStatusEnum('status').notNull(),
        notes: text('notes'),

        ...timestamps
    }
)
