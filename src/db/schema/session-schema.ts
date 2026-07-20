import { pgTable } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'

export const sessions = pgTable('sessions', {
    ...baseSchema('sessions'),

    ...timestamps
})
