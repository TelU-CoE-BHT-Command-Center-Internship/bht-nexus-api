import { date, index, pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'
import { divisions } from './organization-schema'

export const divisionHeadProfiles = pgTable(
    'division_head_profiles',
    {
        ...baseSchema('division_head_profile'),

        userId: text('user_id')
            .references(() => users.id)
            .unique(),
        divisionId: text('division_id')
            .references(() => divisions.id)
            .notNull(),

        appointmentStart: date('appointment_start').notNull(),
        appointmentEnd: date('appointment_end'),

        ...timestamps
    },
    table => [
        index('idx_division_head_division_appointment').on(
            table.divisionId,
            table.appointmentEnd
        )
    ]
)
