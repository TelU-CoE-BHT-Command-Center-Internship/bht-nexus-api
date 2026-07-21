import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { activities } from './activity-schema'
import { referenceData } from './organization-schema'

export const activityTags = pgTable(
    'activity_tags',
    {
        ...baseSchema('activityTag'),

        activityId: text('activity_id').references(() => activities.id),
        referenceDataId: text('reference_data_id').references(
            () => referenceData.id
        ),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_activity_tags_unique').on(
            table.activityId,
            table.referenceDataId
        ),
        index('idx_activity_tags_reference_data_id').on(table.referenceDataId)
    ]
)
