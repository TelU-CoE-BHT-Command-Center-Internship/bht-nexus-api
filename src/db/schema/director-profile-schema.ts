import { date, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'

export const directorProfiles = pgTable('director_profiles', {
    ...baseSchema('director_profile'),

    userId: text('user_id')
        .references(() => users.id)
        .unique(),

    appointmentStart: date('appointment_start').notNull(),
    appointmentEnd: date('appointment_end'),
    decreeNumber: varchar('decree_number', { length: 100 }),

    ...timestamps
})
