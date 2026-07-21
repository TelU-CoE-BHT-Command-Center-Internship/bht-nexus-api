import { index, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { partners } from './partner-schema'
import { documents } from './document-schema'

export const partnerDocuments = pgTable(
    'partner_documents',
    {
        ...baseSchema('partnerDocument'),

        partnerId: text('partner_id').references(() => partners.id),
        documentId: text('document_id').references(() => documents.id),

        ...timestamps
    },
    table => [
        uniqueIndex('idx_partner_documents_unique').on(
            table.partnerId,
            table.documentId
        ),
        index('idx_partner_documents_document_id').on(table.documentId)
    ]
)
