import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'

export const facultyPartnerProfiles = pgTable('faculty_partner_profiles', {
    ...baseSchema('faculty_partner_profile'),

    userId: text('user_id').references(() => users.id),

    ...timestamps
})
