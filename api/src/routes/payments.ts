import express from 'express'
import axios from 'axios'
import { Plan } from '@/types'

export const paymentsRouter = express.Router()

paymentsRouter.get('/payments/plans', async (req, res) => {
  const plans = await axios
    .get('https://api.pagar.me/core/v5/plans', {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            `${
              process.env.NODE_ENV === 'development'
                ? process.env.PAGAR_ME_API_PRIVATE_TEST_KEY
                : process.env.PAGAR_ME_API_PRIVATE_KEY
            }:`
          ).toString('base64'),
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err.response.data))

  res.status(200).json(plans)
})

paymentsRouter.post('/payments/subscribe', async (req, res) => {
  /*   const { plan_id, user } = req.body */

  const paymentLink = await axios
    .post(
      'https://api.pagar.me/core/v5/paymentlinks',
      {
        is_building: false,
        type: 'subscription',
        customer_settings: {
          customer: {
            name: 'Alan Silva',
            email: 'alanwvsilva@gmail.com',
          },
        },
        payment_settings: {
          credit_card_settings: {
            operation_type: 'auth_and_capture',
          },
          accepted_payment_methods: ['credit_card'],
        },
        cart_settings: {
          recurrences: [
            {
              plan_id: 'plan_wz5ZvENUwUGP3VXB',
            },
          ],
        },
      },
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${
                process.env.NODE_ENV === 'development'
                  ? process.env.PAGAR_ME_API_PRIVATE_TEST_KEY
                  : process.env.PAGAR_ME_API_PRIVATE_KEY
              }:`
            ).toString('base64'),
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data))

  console.log(paymentLink)

  res.status(200).json(paymentLink.url)
})

/* paymentsRouter.post('/payments/test', async (req, res) => {
  const paymentLink = await axios({
    method: 'post',
    url: 'https://api.pagar.me/core/v5/plans',
    data: {
      name: 'Teste',
      interval: 'month',
      interval_count: 1,
      pricing_scheme: {
        scheme_type: 'Unit',
        price: 10000,
      },
      quantity: 1,
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${
            process.env.NODE_ENV === 'development'
              ? process.env.PAGAR_ME_API_PRIVATE_TEST_KEY
              : process.env.PAGAR_ME_API_PRIVATE_KEY
          }:`
        ).toString('base64'),
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data))

  res.status(200).json(paymentLink)
}) */
