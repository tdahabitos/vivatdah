import { payload } from '@/services/payload'
import data from './data.json'

export async function POST() {
  const filteredData = data.reduce((acc, item) => {
    const email = item.email
    const allowed_categories = item.categories?.split(',')

    if (email === '') return
    if (!allowed_categories.length > 0) return

    const existingItem = acc.find((accItem) => accItem.email === email)

    if (existingItem) {
      const categoriesToPush = []

      allowed_categories.map((category) => {
        if (existingItem.categories.includes(category)) return
        if (category === '') return

        categoriesToPush.push(category)
      })

      existingItem.categories.push(...categoriesToPush)
    } else {
      const categories = []

      allowed_categories.map((category) => {
        if (category === '') return

        categories.push(category)
      })

      acc.push({
        email,
        categories: categories,
      })
    }

    return acc
  }, [])

  const result = await Promise.all(
    filteredData.map(
      async (item) =>
        await payload
          .create({
            collection: 'access',
            data: {
              email: item.email,
              allowed_categories: item.categories,
            },
          })
          .catch((err) => console.log(err)),
    ),
  )

  return Response.json({
    result,
  })
}
