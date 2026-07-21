import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { activities } from './activity-schema'
import { documents } from './document-schema'

export const activityDocuments = pgTable(
    'activity_documents',
    {
        ...baseSchema('activityDocument'),

        activityId: text('activity_id').references(() => activities.id),
        documentId: text('document_id').references(() => documents.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_activity_documents_unique').on(
            table.activityId,
            table.documentId
        ),
        index('idx_activity_documents_document_id').on(table.documentId)
    ]
)
