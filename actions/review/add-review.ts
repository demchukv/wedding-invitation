'use server'

import * as z from 'zod'
import { db } from '@/lib/db'
import {ReviewSchema} from '@/schemas'

import { currentUser } from '@/lib/auth'

export const addReview = async (values: z.infer<typeof ReviewSchema>) => {
    const user = await currentUser()

    if (user) {
        values.userId = user.id
    }

    const validateFields = ReviewSchema.safeParse(values)
    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }

    const {userId, name, message, rating} = validateFields.data

    await db.review.create({
        data: {
            userId,
            name,
            message,
            rating,
        }
    })

    return {success: "Review sent!"}
}