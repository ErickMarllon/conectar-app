import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatar_url: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatar_url: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatar_url: _mock.image.avatar(1),
    name: 'Caitlyn Kerluke',
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.cover(index),
  message: _mock.text.sentence(index),
  personLikes: [...Array(36)].map((__, personIndex) => ({
    name: _mock.name.fullName(personIndex),
    avatar_url: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatar_url: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatar_url: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatar_url: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPosts: randomNumberRange(999, 99999),
  role: _mock.role(index),
}));

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phone_number(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zip_code: '85807',
}));

export const _userAddresses = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  neighborhood: 'dasdsae',
  zip_code: '85807',
  street_number: '41256',
  is_default: true,
}));

export const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  role: 'UI Designer',
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  about:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  // country: _mock.address.country(1),
  addresses: Array(_userAddresses[1]),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  social_links: {
    provider_facebook: `https://www.facebook.com/caitlyn.kerluke`,
    provider_instagram: `https://www.instagram.com/caitlyn.kerluke`,
    provider_linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    provider_twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatar_url: _mock.image.avatar(index),
  first_name: _mock.name.firstName(index),
  last_name: _mock.name.lastName(index),
  email: _mock.email(index),
  phone_number: _mock.phone_number(index),
  address: {
    id: _mock.id(index),
    zip_code: '85807',
    street: 'Jack Locks',
    street_number: '908',
    complement: undefined,
    city: 'Rancho Cordova',
    state: 'Virginia',
    country: _mock.address.country(index),
    is_default: true,
  },
  company: _mock.company(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));
