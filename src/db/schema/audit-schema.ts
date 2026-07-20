import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { auditActionEnum } from '../../configs/enum'
import { users } from './role-schema'

export const auditLogs = pgTable(
    'audit_logs',
    {
        ...baseSchema('audit_log'),

        actorId: text('actor_id').references(() => users.id),

        entityType: varchar('entity_type', { length: 50 }).notNull(),
        entityId: text('entity_id').notNull(),
        action: auditActionEnum('action').notNull(),
        fieldChanged: varchar('field_changed', { length: 100 }),
        oldValue: text('old_value'),
        newValue: text('new_value'),

        createdAt: timestamp('created_at', {
            withTimezone: true,
            mode: 'date'
        })
            .defaultNow()
            .notNull()
    },
    table => [
        index('audit_logs_entity_idx').on(table.entityType, table.entityId),
        index('audit_logs_created_at_idx').on(table.createdAt)
    ]
)
