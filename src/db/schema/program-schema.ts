import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { visibilityLevelEnum } from '../../constant/enum'
import { divisions } from './organization-schema'

export const programs = pgTable(
    'programs',
    {
        ...baseSchema('program'),

        divisionId: text('division_id').references(() => divisions.id),

        name: varchar('name', { length: 150 }).notNull(),
        description: text('description'),
        visibility: visibilityLevelEnum('visibility')
            .notNull()
            .default('internal'),

        ...timestamps
    },
    table => [
        index('idx_programs_division_id').on(table.divisionId),
        index('idx_programs_visibility').on(table.visibility)
    ]
)
