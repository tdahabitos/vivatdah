import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig, type CustomComponent } from 'payload'
import { fileURLToPath } from 'node:url'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { pt } from 'payload/i18n/pt'
import path from 'node:path'
import sharp from 'sharp'

import Logo from './components/admin/Logo'
import Icon from './components/admin/Icon'

import { Categories } from './collections/Categories'
import { PostCategories } from './collections/PostCategories'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Plans } from './collections/Plans'
import { Access } from './collections/Access'
import { Pages } from './collections/Pages'
import { Views } from './collections/metadata/Views'
import { Feedback } from './collections/metadata/Feedback'
import { Comments } from './collections/metadata/Comments'
import { Saved } from './collections/metadata/Saved'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  routes: {
    admin: '/',
  },
  globals: [
    {
      slug: 'administration',
      label: 'Administração',
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'maintenance_mode',
          label: 'Ativar modo de manutenção',
          type: 'checkbox',
        },
      ],
    },
    {
      slug: 'authentication',
      label: 'Controle de autenticação',
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'auth_private_mode',
          label:
            'Ativar modo de autenticação privada (exclusiva para usuários autorizados abaixo)',
          type: 'checkbox',
        },
        {
          name: 'auth_allowed_user_emails',
          label:
            'Usuários autorizados (e-mails separados por vírgula [,] - Exemplo: email1@email.com, email2@email.com...)',
          type: 'textarea',
        },
      ],
    },
    {
      slug: 'banner',
      label: 'Banner promocional',
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'active',
          label: 'Mostrar banner',
          type: 'checkbox',
        },
        {
          name: 'title',
          label: 'Título do banner',
          type: 'text',
        },
        {
          name: 'text',
          label: 'Texto do banner',
          type: 'text',
        },
        {
          name: 'url',
          label: 'URL do banner',
          type: 'text',
        },
      ],
    },
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: Logo as unknown as CustomComponent,
        Icon: Icon as unknown as CustomComponent,
      },
    },
    meta: {
      title: 'VivaTDAH',
      description: 'Entenda seu ritmo e aprenda de forma leve',
      titleSuffix: '- Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.ico',
        },
      ],
    },
  },
  collections: [
    Categories,
    PostCategories,
    Posts,
    Users,
    Media,
    Plans,
    Access,
    Pages,
    Views,
    Feedback,
    Comments,
    Saved,
  ],
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'no-replay@vivatdah.com',
    defaultFromName: 'VivaTDAH',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString:
        process.env.NODE_ENV === 'development'
          ? process.env.DEVELOPMENT_DATABASE_URI!
          : process.env.DATABASE_URI!,
    },
  }),
  sharp,
  upload: {
    defParamCharset: 'utf-8',
    safeFileNames: true,
  },
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
        endpoint: process.env.S3_ENDPOINT!,
      },
    }),
  ],
  //TODO: Add email provider
})
