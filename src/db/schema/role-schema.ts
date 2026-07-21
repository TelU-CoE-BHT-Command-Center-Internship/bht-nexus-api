import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { baseSchema } from '../helper/base-schema'
import { timestamps } from '../helper/timestamp'
import { roleTypesEnum } from '../../constant/enum'

export const roles = pgTable('roles', {
    ...baseSchema('role'),

    name: varchar('name', { length: 100 }).notNull().unique(),
    description: text('description'),
    type: roleTypesEnum('type').notNull().default('coe_member'),

    ...timestamps
})
