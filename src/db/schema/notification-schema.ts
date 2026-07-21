import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { notificationTypeEnum } from '../../constant/enum'
import { users } from './user-schema'

export const notificationSettings = pgTable('notification_settings', {
    ...baseSchema('notification_setting'),

    type: notificationTypeEnum('type').notNull().unique(),
    thresholdValue: integer('threshold_value').notNull(),
    thresholdUnit: varchar('threshold_unit', { length: 20 }).notNull(),

    ...timestamps
})

export const notifications = pgTable(
    'notifications',
    {
        ...baseSchema('notification'),

        recipientId: text('recipient_id').references(() => users.id),

        type: notificationTypeEnum('type').notNull(),
        relatedType: varchar('related_type', { length: 50 }),
        relatedId: text('related_id'),
        message: text('message').notNull(),
        isRead: boolean('is_read').notNull().default(false),
        sentAt: timestamp('sent_at'),

        ...timestamps
    },
    table => [
        index('idx_notifications_recipient_id').on(table.recipientId),
        index('idx_notifications_type').on(table.type),
        index('idx_notifications_is_read').on(table.isRead),
        index('idx_notifications_recipient_unread')
            .on(table.recipientId)
            .where(sql`${table.isRead} = false`),
        index('idx_notifications_related').on(
            table.relatedType,
            table.relatedId
        )
    ]
)
