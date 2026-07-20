import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'

export const menteeInternshipProfiles = pgTable('mentee_internship_profiles', {
    ...baseSchema('mentee_internship_profile'),

    userId: text('user_id').references(() => users.id),

    ...timestamps
})
