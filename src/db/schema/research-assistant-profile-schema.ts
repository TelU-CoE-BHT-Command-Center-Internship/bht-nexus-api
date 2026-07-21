import { pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { users } from './user-schema'

export const researchAssistantProfiles = pgTable(
    'research_assistant_profiles',
    {
        ...baseSchema('research_assistant_profile'),

        userId: text('user_id').references(() => users.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_research_assistant_profiles_user_id').on(table.userId)
    ]
)
