import { nanoid } from 'nanoid'
import { text } from 'drizzle-orm/pg-core'

export const baseSchema = (prefix: string) => ({
    id: text('id')
        .primaryKey()
        .$defaultFn(() => nanoid(21)),
    publicId: text('public_id')
        .notNull()
        .unique()
        .$defaultFn(() => `${prefix}_${nanoid(12)}`)
})
