import { index, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'
import { referenceData } from './organization-schema'

export const researchLeadProfiles = pgTable(
    'research_lead_profiles',
    {
        ...baseSchema('research_lead_profile'),

        userId: text('user_id')
            .references(() => users.id)
            .unique(),
        researchFieldId: text('research_field_id').references(
            () => referenceData.id
        ),

        positionTitle: varchar('position_title', { length: 100 }),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_research_lead_profiles_user_id').on(table.userId),
        index('idx_research_lead_profiles_field_id').on(table.researchFieldId)
    ]
)
