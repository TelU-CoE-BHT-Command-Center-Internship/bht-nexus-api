import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { reports } from './report-schema'
import { documents } from './document-schema'

export const reportDocuments = pgTable(
    'report_documents',
    {
        ...baseSchema('reportDocument'),

        reportId: text('report_id').references(() => reports.id),
        documentId: text('document_id').references(() => documents.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_report_documents_unique').on(
            table.reportId,
            table.documentId
        ),
        index('idx_report_documents_document_id').on(table.documentId)
    ]
)
