// import type { TenantStatus, UserRole } from '../enums';
// import type { IAddress } from './IAddress';

import type { TenantStatus } from '../enums';
import type { IAddress } from './IAddress';

// export interface IUserBase {
//   email: string;
//   first_name: string;
//   last_name: string;
//   phone_number?: string;
//   avatar_url?: string;
//   role?: UserRole;
// }

// export interface IUser extends IUserBase {
//   id: string;
//   cpf: string;
//   status: string;
//   last_login_at: Date;
//   created_at: Date;
//   updated_at: Date;
// }

// export interface IUserFull extends IUser {
//   phone_number: string;
//   addresses: IAddress[];
//   is_active: boolean;
//   avatar_url: string;
//   company: string;
//   is_verified: boolean;
//   status: string;
// }

// // ----------------------------------------------------------------------

export type ITenantSocialLink = {
  provider_facebook: string;
  provider_instagram: string;
  provider_linkedin: string;
  provider_twitter: string;
};

// export type IUserProfileFollowers = {
//   follower: number;
//   following: number;
// };

// export type IUserProfileCover = {
//   name: string;
//   cover: string;
//   role?: string;
// };

// export type IUserProfileAbout = {
//   about: string;
//   email: string;
//   role?: string;
//   addresses?: IAddress[];
// };

// export type IUserProfile = IUserProfileFollowers &
//   IUserProfileAbout & {
//     id: string;
//     social_links: IUserSocialLink;
//   };

// export type IUserProfileFollower = {
//   id: string;
//   avatar_url: string;
//   name: string;
//   country: string;
//   isFollowed: boolean;
// };

// export type IUserProfileGallery = {
//   id: string;
//   title: string;
//   postAt: Date | string | number;
//   imageUrl: string;
// };

// export type IUserProfileFriend = {
//   id: string;
//   avatar_url: string;
//   name: string;
//   role: string;
// };

// export type IUserProfilePost = {
//   id: string;
//   author: {
//     id: string;
//     avatar_url: string;
//     name: string;
//   };
//   isLiked: boolean;
//   createdAt: Date | string | number;
//   media: string;
//   message: string;
//   personLikes: {
//     name: string;
//     avatar_url: string;
//   }[];
//   comments: {
//     id: string;
//     author: {
//       id: string;
//       avatar_url: string;
//       name: string;
//     };
//     createdAt: Date | string | number;
//     message: string;
//   }[];
// };

// // ----------------------------------------------------------------------

// export type IUserCard = {
//   id: string;
//   avatar_url?: string;
//   cover?: string;
//   first_name: string;
//   last_name: string;
//   role?: string;
//   social_links?: IUserSocialLink;
// };

// ----------------------------------------------------------------------

export type ITenantAccountGeneral = {
  about?: string;
  enable_google_calendar: boolean;
  enable_service_schedule: boolean;
  id: string;
  name: string;
  phone_number: string;
  slug: string;
  whatsapp: string;
  email?: string;
  logo_url?: string;
  cover_url?: string;
  status: TenantStatus;
  is_public: boolean;
  created_at: Date;
  social_links: ITenantSocialLink;
  // plan: PgsqlPlan;
  // updated_at: Date;
  // subscriptions: PgsqlTenantSubscription[];
  // notificationSettings: PgsqlTenantNotificationSetting[];
  // users: PgsqlUser[];
  // sessions: PgsqlSession[];
  // categories: PgsqlCategory[];
  // services: PgsqlService[];
  // products: PgsqlProduct[];
  // serviceSchedules: PgsqlServiceSchedule[];
  addresses?: IAddress[];
};

// export type IUserAccountBillingCreditCard = {
//   id: string;
//   cardNumber: string;
//   cardType: string;
// };

// export type IUserAccountBillingInvoice = {
//   id: string;
//   createdAt: Date | string | number;
//   price: number;
// };

// export type IUserAccountBillingAddress = {
//   id?: string;
//   zip_code: string;
//   street: string;
//   street_number: string;
//   city: string;
//   neighborhood: string;
//   state: string;
//   country: string;
//   phone_number?: string;
//   is_default: boolean;
// };

// export type IUserAccountChangePassword = {
//   oldPassword: string;
//   newPassword: string;
//   confirmNewPassword: string;
// };

// // ----------------------------------------------------------------------

// export type IUserAccountNotificationSettings = {
//   activityComments: boolean;
//   activityAnswers: boolean;
//   activityFollows: boolean;
//   applicationNews: boolean;
//   applicationProduct: boolean;
//   applicationBlog: boolean;
// };
