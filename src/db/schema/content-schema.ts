import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { contentStatusEnum, visibilityLevelEnum } from '../../configs/enum'
import { users } from './role-schema'
import { divisions } from './organization-schema'
import { roles } from './role-schema'

export const newsAnnouncements = pgTable('news_announcements', {
    ...baseSchema('news_announcement'),

    divisionId: text('division_id').references(() => divisions.id),
    createdBy: text('created_by').references(() => users.id),

    title: varchar('title', { length: 200 }).notNull(),
    body: text('body').notNull(),
    status: contentStatusEnum('status').notNull().default('draft'),
    visibility: visibilityLevelEnum('visibility').notNull().default('internal'),
    publishedAt: timestamp('published_at'),

    ...timestamps
})

export const announcementTargets = pgTable('announcement_targets', {
    ...baseSchema('announcement_target'),

    newsAnnouncementId: text('news_announcement_id').references(
        () => newsAnnouncements.id
    ),
    targetRoleId: text('target_role_id').references(() => roles.id),
    targetDivisionId: text('target_division_id').references(() => divisions.id),

    ...timestamps
})

export const publications = pgTable('publications', {
    ...baseSchema('publication'),

    submittedBy: text('submitted_by').references(() => users.id),

    title: varchar('title', { length: 200 }).notNull(),
    body: text('body').notNull(),
    status: contentStatusEnum('status').notNull().default('draft'),

    ...timestamps
})
