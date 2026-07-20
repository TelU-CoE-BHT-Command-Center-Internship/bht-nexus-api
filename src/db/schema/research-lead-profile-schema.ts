import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'
import { referenceData } from './organization-schema'

export const researchLeadProfiles = pgTable('research_lead_profiles', {
    ...baseSchema('research_lead_profile'),

    userId: text('user_id')
        .references(() => users.id)
        .unique(),
    researchFieldId: text('research_field_id').references(
        () => referenceData.id
    ),

    positionTitle: varchar('position_title', { length: 100 }),

    ...timestamps
})
