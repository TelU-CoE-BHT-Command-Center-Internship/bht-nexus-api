import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { contentStatusEnum, visibilityLevelEnum } from '../../constant/enum'
import { users } from './user-schema'
import { divisions } from './organization-schema'
import { roles } from './role-schema'

export const newsAnnouncements = pgTable(
    'news_announcements',
    {
        ...baseSchema('news_announcement'),

        divisionId: text('division_id').references(() => divisions.id),
        createdBy: text('created_by').references(() => users.id),

        title: varchar('title', { length: 200 }).notNull(),
        body: text('body').notNull(),
        status: contentStatusEnum('status').notNull().default('draft'),
        visibility: visibilityLevelEnum('visibility')
            .notNull()
            .default('internal'),
        publishedAt: timestamp('published_at'),

        ...timestamps
    },
    table => [
        index('idx_news_announcements_division_id').on(table.divisionId),
        index('idx_news_announcements_created_by').on(table.createdBy),
        index('idx_news_announcements_status').on(table.status),
        index('idx_news_announcements_published')
            .on(table.status)
            .where(sql`${table.status} = 'published'`)
    ]
)

export const announcementTargets = pgTable(
    'announcement_targets',
    {
        ...baseSchema('announcement_target'),

        newsAnnouncementId: text('news_announcement_id').references(
            () => newsAnnouncements.id
        ),
        targetRoleId: text('target_role_id').references(() => roles.id),
        targetDivisionId: text('target_division_id').references(
            () => divisions.id
        ),

        ...timestamps
    },
    table => [
        index('idx_announcement_targets_news_id').on(table.newsAnnouncementId),
        index('idx_announcement_targets_role_id').on(table.targetRoleId),
        index('idx_announcement_targets_division_id').on(table.targetDivisionId)
    ]
)

export const publications = pgTable(
    'publications',
    {
        ...baseSchema('publication'),

        submittedBy: text('submitted_by').references(() => users.id),

        title: varchar('title', { length: 200 }).notNull(),
        body: text('body').notNull(),
        status: contentStatusEnum('status').notNull().default('draft'),

        ...timestamps
    },
    table => [
        index('idx_publications_submitted_by').on(table.submittedBy),
        index('idx_publications_status').on(table.status)
    ]
)
