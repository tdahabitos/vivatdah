export const apiFetcher = async (url, simplified = true) => {
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/${url}`)
    const data = await req.json()

    if (simplified) return data.docs ? data.docs : data

    return data
  } catch (err) {
    console.log(err)
  }
}
