import { date, index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'
import { referenceData } from './organization-schema'

export const researchMembersProfiles = pgTable(
    'research_members_profiles',
    {
        ...baseSchema('research_member_profile'),

        userId: text('user_id')
            .references(() => users.id)
            .unique(),
        researchFieldId: text('research_field_id').references(
            () => referenceData.id
        ),

        joinedDate: date('joined_date'),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_research_members_profiles_user_id').on(table.userId),
        index('idx_research_members_profiles_field_id').on(
            table.researchFieldId
        )
    ]
)
