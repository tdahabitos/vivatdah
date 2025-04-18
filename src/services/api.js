export const apiFetcher = async (url, simplified = true) => {
  try {
    const req = await fetch(`/api${url}`)
    const data = await req.json()

    if (simplified) return data.docs ? data.docs : data

    return data
  } catch (err) {
    console.log(err)
  }
}
