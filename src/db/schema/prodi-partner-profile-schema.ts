import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'

export const prodiPartnerProfiles = pgTable('prodi_partner_profiles', {
    ...baseSchema('prodi_partner_profile'),

    userId: text('user_id').references(() => users.id),

    ...timestamps
})
