import { pgTable, text } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { activities } from './activity-schema'
import { referenceData } from './organization-schema'

export const activityTags = pgTable('activity_tags', {
    ...baseSchema('activityTag'),

    activityId: text('activity_id').references(() => activities.id),
    referenceDataId: text('reference_data_id').references(
        () => referenceData.id
    ),

    ...timestamps
})
