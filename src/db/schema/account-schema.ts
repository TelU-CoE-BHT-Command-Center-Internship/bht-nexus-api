import { pgTable } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'

export const accounts = pgTable('accounts', {
    ...baseSchema('accounts'),

    ...timestamps
})
