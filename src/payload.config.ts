import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig, CustomComponent } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { pt } from "payload/i18n/pt";

import Logo from "./components/admin/Logo";
import Icon from "./components/admin/Icon";

import { Categories } from "./collections/Categories";
import { PostCategories } from "./collections/PostCategories";
import { Posts } from "./collections/Posts";
import { Videos } from "./collections/Videos";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Plans } from "./collections/Plans";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const {
  PAYLOAD_SECRET,
  DATABASE_URI,
  S3_BUCKET,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_REGION,
  S3_ENDPOINT,
} = process.env;

export default buildConfig({
  globals: [
    {
      slug: "administration",
      label: "Administração",
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "maintenance_mode",
          label: "Modo de manutenção",
          type: "checkbox",
        },
        /*  */
        {
          name: "auth_private_mode",
          label:
            "Modo de autenticação privada (autenticação exclusiva para usuarios autorizados)",
          type: "checkbox",
        },
        {
          name: "auth_allowed_user_emails",
          label:
            "Usuários autorizados no modo de autenticação privada (e-mails separados por vírgula (,) - Exemplo: email1@email.com, email2@email.com...)",
          type: "textarea",
        },
      ],
    },
    {
      slug: "banner",
      label: "Banner",
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "banner_active",
          label: "Mostrar banner",
          type: "checkbox",
        },
        {
          name: "banner_title",
          label: "Título do banner",
          type: "text",
        },
        {
          name: "banner_text",
          label: "Texto do banner",
          type: "text",
        },
        {
          name: "banner_url",
          label: "URL do banner",
          type: "text",
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
  },
  collections: [Categories, PostCategories, Posts, Videos, Users, Media, Plans],
  i18n: {
    supportedLanguages: { pt },
  },
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    idType: "uuid",
    pool: {
      connectionString: DATABASE_URI || "",
    },
  }),
  sharp,
  upload: {
    defParamCharset: "utf-8",
    safeFileNames: true,
  },
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: "media",
        },
      },
      bucket: S3_BUCKET!,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: S3_ACCESS_KEY_ID!,
          secretAccessKey: S3_SECRET_ACCESS_KEY!,
        },
        region: S3_REGION!,
        endpoint: S3_ENDPOINT!,
      },
    }),
  ],
});
