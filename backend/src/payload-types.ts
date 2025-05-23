/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    categories: Category;
    'post-categories': PostCategory;
    posts: Post;
    users: User;
    media: Media;
    plans: Plan;
    access: Access;
    pages: Page;
    views: View;
    feedback: Feedback;
    comments: Comment;
    saved: Saved;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    'post-categories': PostCategoriesSelect<false> | PostCategoriesSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    plans: PlansSelect<false> | PlansSelect<true>;
    access: AccessSelect<false> | AccessSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    views: ViewsSelect<false> | ViewsSelect<true>;
    feedback: FeedbackSelect<false> | FeedbackSelect<true>;
    comments: CommentsSelect<false> | CommentsSelect<true>;
    saved: SavedSelect<false> | SavedSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    administration: Administration;
    authentication: Authentication;
    banner: Banner;
  };
  globalsSelect: {
    administration: AdministrationSelect<false> | AdministrationSelect<true>;
    authentication: AuthenticationSelect<false> | AuthenticationSelect<true>;
    banner: BannerSelect<false> | BannerSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  cover: string | Media;
  free_content?: boolean | null;
  panda_folder_id: string;
  title: string;
  description: string;
  included_plans?: (string | Plan)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  is_public?: boolean | null;
  title: string;
  categories?: (string | Category)[] | null;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "plans".
 */
export interface Plan {
  id: string;
  status?: ('draft' | 'published') | null;
  recomended?: boolean | null;
  show_at_home?: boolean | null;
  title: string;
  description: string;
  price: number;
  features: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "post-categories".
 */
export interface PostCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string;
  show_at_home?: boolean | null;
  status?: ('draft' | 'published') | null;
  categories: (string | PostCategory)[];
  cover: string | Media;
  title: string;
  slug: string;
  description: string;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  avatar?: (string | null) | Media;
  name: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "access".
 */
export interface Access {
  id: string;
  email: string;
  allowed_categories?: (string | Category)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  status?: ('draft' | 'published') | null;
  order?: number | null;
  show_at_menu?: boolean | null;
  shortcode?: string | null;
  title: string;
  slug: string;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "views".
 */
export interface View {
  id: string;
  video_id: string;
  views: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feedback".
 */
export interface Feedback {
  id: string;
  video_id: string;
  user_id: string;
  type: 'positive' | 'negative';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments".
 */
export interface Comment {
  id: string;
  video_id: string;
  user_id: string;
  comment: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "saved".
 */
export interface Saved {
  id: string;
  video_id: string;
  user_id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'categories';
        value: string | Category;
      } | null)
    | ({
        relationTo: 'post-categories';
        value: string | PostCategory;
      } | null)
    | ({
        relationTo: 'posts';
        value: string | Post;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'plans';
        value: string | Plan;
      } | null)
    | ({
        relationTo: 'access';
        value: string | Access;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'views';
        value: string | View;
      } | null)
    | ({
        relationTo: 'feedback';
        value: string | Feedback;
      } | null)
    | ({
        relationTo: 'comments';
        value: string | Comment;
      } | null)
    | ({
        relationTo: 'saved';
        value: string | Saved;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  cover?: T;
  free_content?: T;
  panda_folder_id?: T;
  title?: T;
  description?: T;
  included_plans?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "post-categories_select".
 */
export interface PostCategoriesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  description?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  show_at_home?: T;
  status?: T;
  categories?: T;
  cover?: T;
  title?: T;
  slug?: T;
  description?: T;
  content?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  avatar?: T;
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  is_public?: T;
  title?: T;
  categories?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "plans_select".
 */
export interface PlansSelect<T extends boolean = true> {
  status?: T;
  recomended?: T;
  show_at_home?: T;
  title?: T;
  description?: T;
  price?: T;
  features?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "access_select".
 */
export interface AccessSelect<T extends boolean = true> {
  email?: T;
  allowed_categories?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  status?: T;
  order?: T;
  show_at_menu?: T;
  shortcode?: T;
  title?: T;
  slug?: T;
  content?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "views_select".
 */
export interface ViewsSelect<T extends boolean = true> {
  video_id?: T;
  views?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "feedback_select".
 */
export interface FeedbackSelect<T extends boolean = true> {
  video_id?: T;
  user_id?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "comments_select".
 */
export interface CommentsSelect<T extends boolean = true> {
  video_id?: T;
  user_id?: T;
  comment?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "saved_select".
 */
export interface SavedSelect<T extends boolean = true> {
  video_id?: T;
  user_id?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "administration".
 */
export interface Administration {
  id: string;
  maintenance_mode?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "authentication".
 */
export interface Authentication {
  id: string;
  auth_private_mode?: boolean | null;
  auth_allowed_user_emails?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "banner".
 */
export interface Banner {
  id: string;
  active?: boolean | null;
  title?: string | null;
  text?: string | null;
  url?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "administration_select".
 */
export interface AdministrationSelect<T extends boolean = true> {
  maintenance_mode?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "authentication_select".
 */
export interface AuthenticationSelect<T extends boolean = true> {
  auth_private_mode?: T;
  auth_allowed_user_emails?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "banner_select".
 */
export interface BannerSelect<T extends boolean = true> {
  active?: T;
  title?: T;
  text?: T;
  url?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}