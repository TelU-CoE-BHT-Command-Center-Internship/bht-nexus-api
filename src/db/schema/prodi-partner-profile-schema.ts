import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'
import { partners } from './partner-schema'

export const prodiPartnerProfiles = pgTable(
    'prodi_partner_profiles',
    {
        ...baseSchema('prodi_partner_profile'),

        userId: text('user_id').references(() => users.id),
        partnerId: text('partner_id').references(() => partners.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_prodi_partner_profiles_user_id').on(table.userId),
        index('idx_prodi_partner_profiles_partner_id').on(table.partnerId)
    ]
)
