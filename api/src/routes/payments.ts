import express from 'express'
import axios from 'axios'
import { Plan } from '@/types'

export const paymentsRouter = express.Router()

paymentsRouter.post('/payments', async (req, res) => {
  const { plan_id, user } = req.body

  const plan = (await axios
    .get(`${process.env.CMS_API_URL}/plans/${plan_id}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data)) as Plan

  const amount = (plan?.promoPrice || plan.price) * 100 // amount in cents

  const checkout = await axios({
    method: 'post',
    url: 'https://api.pagar.me/core/v5/orders',
    data: {
      items: [
        {
          amount: amount,
          description: plan.title,
          quantity: 1,
        },
      ],
      customer: {
        name: user?.full_name,
        email: user?.email,
      },
      payments: [
        {
          amount: amount,
          payment_method: 'checkout',
          checkout: {
            expires_in: 86400, // 1 day
            billing_address_editable: true,
            customer_editable: true,
            success_url: `https://vivatdah.com/payments/success`,
            accepted_payment_methods: ['credit_card', 'pix'],
            credit_card: {
              statement_descriptor: 'vivatdahcom',
            },
            pix: {
              expires_in: 86400, // 1 day
            },
          },
        },
      ],
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${process.env.PAGAR_ME_API_PRIVATE_KEY}:`).toString(
          'base64'
        ),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data))

  const url = checkout.checkouts[0].payment_url

  res.status(200).json(url)
})
