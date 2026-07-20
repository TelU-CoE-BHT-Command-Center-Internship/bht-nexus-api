import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'

export { users } from './user-schema'

export const roles = pgTable('roles', {
    ...baseSchema('role'),

    name: varchar('name', { length: 100 }).notNull().unique(),

    ...timestamps
})
