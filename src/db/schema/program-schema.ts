import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { visibilityLevelEnum } from '../../configs/enum'
import { divisions } from './organization-schema'

export const programs = pgTable('programs', {
    ...baseSchema('program'),

    divisionId: text('division_id').references(() => divisions.id),

    name: varchar('name', { length: 150 }).notNull(),
    description: text('description'),
    visibility: visibilityLevelEnum('visibility').notNull().default('internal'),

    ...timestamps
})
