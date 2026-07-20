import { date, pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { partnershipStatusEnum } from '../../configs/enum'

export const partners = pgTable('partners', {
    ...baseSchema('partner'),

    name: varchar('name', { length: 150 }).notNull(),
    type: varchar('type', { length: 100 }),
    contactName: varchar('contact_name', { length: 100 }),
    contactEmail: varchar('contact_email', { length: 255 }),
    contactPhone: varchar('contact_phone', { length: 30 }),
    currentStatus: partnershipStatusEnum('current_status')
        .notNull()
        .default('draft'),
    endDate: date('end_date'),

    ...timestamps
})
