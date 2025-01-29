import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { pt } from "payload/i18n/pt";

import { Categories } from "./collections/Categories";
import { Posts } from "./collections/Posts";
import { Videos } from "./collections/Videos";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import Logo from "./components/admin/Logo";
import Icon from "./components/admin/Icon";

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
      access: {
        read: () => true,
      },
      fields: [
        {
          name: "maintenance_mode",
          label: "Modo de manutenção",
          type: "checkbox",
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
        Logo,
        Icon,
      },
    },
  },
  collections: [Categories, Posts, Videos, Users, Media],
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
