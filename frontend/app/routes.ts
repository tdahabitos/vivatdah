import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  layout('./layouts/website/index.tsx', [
    index('./routes/home/index.tsx'),
    route(':slug', './routes/page/index.tsx'),
    route('/payments', './routes/payments/index.tsx'),
    route('/payments/success', './routes/payments/success/index.tsx'),
  ]),

  ...prefix('auth', [
    layout('./layouts/auth/index.tsx', [
      route('/login', './routes/auth/login.tsx'),
      route('/register', './routes/auth/register.tsx'),
      route('/password-reset', './routes/auth/password-reset.tsx'),
      route('/new-password', './routes/auth/new-password.tsx'),
    ]),
  ]),

  ...prefix('dashboard', [
    layout('./layouts/dashboard/index.tsx', [
      route('/', './routes/dashboard/overview/index.tsx'),
      route('/trending', './routes/dashboard/trending/index.tsx'),
      route('/saved', './routes/dashboard/saved/index.tsx'),
      route('/category/:id', './routes/dashboard/category/index.tsx'),
      route('/free-content', './routes/dashboard/free-content/index.tsx'),
      route('/video/:id', './routes/dashboard/video/index.tsx'),
      route('/search', './routes/dashboard/search/index.tsx'),
      route('/account', './routes/dashboard/account/index.tsx'),
      route('/password-reset', './routes/dashboard/password-reset/index.tsx'),
    ]),
  ]),

  route('*', './routes/not-found/index.tsx'),
] satisfies RouteConfig
