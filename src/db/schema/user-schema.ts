import { boolean, index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { userStatusEnum, visibilityLevelEnum } from '../../constant/enum'
import { divisions } from './organization-schema'
import { roles } from './role-schema'

export const users = pgTable(
    'users',
    {
        ...baseSchema('users'),

        roleId: text('role_id')
            .references(() => roles.id)
            .notNull(),
        divisionId: text('division_id').references(() => divisions.id),

        name: varchar('name', { length: 100 }).notNull(),
        email: varchar('email', { length: 255 }).notNull().unique(),
        email_verified: boolean('email_verified').notNull().default(false),
        phone_number: varchar('phone_number', { length: 20 }).unique(),
        avatar_url: text('avatar_url'),
        status: userStatusEnum('status').notNull().default('active'),
        profileVisibility: visibilityLevelEnum('profile_visibility')
            .notNull()
            .default('internal'),

        ...timestamps
    },
    table => [
        index('users_is_deleted_idx').on(table.is_deleted),
        index('users_email_status_idx').on(table.email, table.status),
        index('users_phone_status_idx').on(table.phone_number, table.status)
    ]
)
