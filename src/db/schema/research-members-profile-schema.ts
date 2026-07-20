import { date, pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './role-schema'
import { referenceData } from './organization-schema'

export const researchMembersProfiles = pgTable('research_members_profiles', {
    ...baseSchema('research_member_profile'),

    userId: text('user_id')
        .references(() => users.id)
        .unique(),
    researchFieldId: text('research_field_id').references(
        () => referenceData.id
    ),

    joinedDate: date('joined_date'),

    ...timestamps
})
