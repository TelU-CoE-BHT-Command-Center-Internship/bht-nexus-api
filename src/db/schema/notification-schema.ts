import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { notificationTypeEnum } from '../../configs/enum'
import { users } from './role-schema'

export const notificationSettings = pgTable('notification_settings', {
    ...baseSchema('notification_setting'),

    type: notificationTypeEnum('type').notNull().unique(),
    thresholdValue: integer('threshold_value').notNull(),
    thresholdUnit: varchar('threshold_unit', { length: 20 }).notNull(),

    ...timestamps
})

export const notifications = pgTable('notifications', {
    ...baseSchema('notification'),

    recipientId: text('recipient_id').references(() => users.id),

    type: notificationTypeEnum('type').notNull(),
    relatedType: varchar('related_type', { length: 50 }),
    relatedId: text('related_id'),
    message: text('message').notNull(),
    isRead: boolean('is_read').notNull().default(false),
    sentAt: timestamp('sent_at'),

    ...timestamps
})
