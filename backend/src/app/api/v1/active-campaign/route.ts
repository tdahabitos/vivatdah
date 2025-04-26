import cors from '@/utils/cors'

export async function OPTIONS() {
  return new Response(null, cors(204))
}

const fixedOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY!,
  },
}

async function addContact(email: string) {
  if (!email) return false

  const url = `${process.env.ACTIVE_CAMPAIGN_API_URL!}/api/3/contacts`
  const options = {
    ...fixedOptions,
    body: JSON.stringify({
      contact: {
        email,
      },
    }),
  }

  return fetch(url, options)
    .then((res) => res.json().then((data) => data.contact.id))
    .catch(() => false)
}

async function addContactToList(contactId: string) {
  if (!contactId) return false

  const url = `${process.env.ACTIVE_CAMPAIGN_API_URL!}/api/3/contactLists`
  const options = {
    ...fixedOptions,
    body: JSON.stringify({
      contactList: {
        list: process.env.ACTIVE_CAMPAIGN_LIST_ID!,
        contact: contactId,
        status: 1,
      },
    }),
  }

  return fetch(url, options)
    .then(() => true)
    .catch(() => false)
}

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) return Response.json(false)

  const contactId = await addContact(email)
  const addedToList = await addContactToList(contactId)

  return Response.json(contactId && addedToList, cors(200))
}
