import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { auditActionEnum } from '../../constant/enum'
import { users } from './user-schema'

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
        index('idx_audit_logs_entity').on(table.entityType, table.entityId),
        index('idx_audit_logs_created_at').on(table.createdAt),
        index('idx_audit_logs_actor').on(table.actorId),
        index('idx_audit_logs_action').on(table.action)
    ]
)
