import { index, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { statusEnum, referenceDataTypeEnum } from '../../constant/enum'

export const organizations = pgTable(
    'organizations',
    {
        ...baseSchema('organization'),

        name: varchar('name', { length: 150 }).notNull(),
        vision: text('vision'),
        mission: text('mission'),
        history: text('history'),
        contactEmail: varchar('contact_email', { length: 255 }),
        contactPhone: varchar('contact_phone', { length: 30 }),
        address: text('address'),

        ...timestamps
    },
    table => [
        index('idx_organizations_active')
            .on(table.id)
            .where(sql`${table.deleted_at} IS NULL`)
    ]
)

export const divisions = pgTable(
    'divisions',
    {
        ...baseSchema('division'),

        organizationId: text('organization_id').references(
            () => organizations.id
        ),

        name: varchar('name', { length: 100 }).notNull(),
        description: text('description'),
        status: statusEnum('status').notNull().default('active'),

        ...timestamps
    },
    table => [
        index('idx_divisions_organization_id').on(table.organizationId),
        index('idx_divisions_status').on(table.status),
        uniqueIndex('idx_divisions_org_name').on(
            table.organizationId,
            table.name
        )
    ]
)

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
        uniqueIndex('idx_reference_data_type_name').on(table.type, table.name),
        index('idx_reference_data_type_status').on(table.type, table.status)
    ]
)
