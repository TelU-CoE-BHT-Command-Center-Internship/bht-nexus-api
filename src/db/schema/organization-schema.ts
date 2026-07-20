import { pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { statusEnum, referenceDataTypeEnum } from '../../configs/enum'

export const organizations = pgTable('organizations', {
    ...baseSchema('organization'),

    name: varchar('name', { length: 150 }).notNull(),
    vision: text('vision'),
    mission: text('mission'),
    history: text('history'),
    contactEmail: varchar('contact_email', { length: 255 }),
    contactPhone: varchar('contact_phone', { length: 30 }),
    address: text('address'),

    ...timestamps
})

export const divisions = pgTable('divisions', {
    ...baseSchema('division'),

    organizationId: text('organization_id').references(() => organizations.id),

    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    status: statusEnum('status').notNull().default('active'),

    ...timestamps
})

export const referenceData = pgTable(
    'reference_data',
    {
        ...baseSchema('reference_data'),

        type: referenceDataTypeEnum('type').notNull(),
        name: varchar('name', { length: 100 }).notNull(),
        description: text('description'),
        status: statusEnum('status').notNull().default('active'),

        ...timestamps
    },
    table => [
        uniqueIndex('reference_data_type_name_unique').on(
            table.type,
            table.name
        )
    ]
)
