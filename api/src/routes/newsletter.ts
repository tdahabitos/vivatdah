import express from "express";
import axios from "axios";

export const newsletterRouter = express.Router();

async function addContact(email: string) {
  if (!email) return false;

  return await axios
    .post(
      `${process.env.ACTIVE_CAMPAIGN_API_URL!}/api/3/contacts`,
      {
        contact: {
          email,
        },
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "Api-Token": process.env.ACTIVE_CAMPAIGN_API_KEY!,
        },
      }
    )
    .then((res) => res.data.contact.id)
    .catch(() => {});
}

async function addContactToList(contactId: string) {
  if (!contactId) return false;

  return await axios
    .post(
      `${process.env.ACTIVE_CAMPAIGN_API_URL!}/api/3/contactLists`,
      {
        contactList: {
          list: process.env.ACTIVE_CAMPAIGN_LIST_ID!,
          contact: contactId,
          status: 1,
        },
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "Api-Token": process.env.ACTIVE_CAMPAIGN_API_KEY!,
        },
      }
    )
    .then(() => true)
    .catch(() => false);
}

newsletterRouter.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(200).json(false);
    return;
  }

  const contactId = await addContact(email);
  const addedToList = await addContactToList(contactId);

  res.status(200).json(contactId && addedToList);
});
