import {
  mdiBadgeAccountAlertOutline,
  mdiFileWordBox,
  mdiFolderPlus,
  mdiFormatListBulletedSquare,
  mdiMapMarker,
  mdiMonitor,
  mdiTrainCarContainer,
} from '@mdi/js'

import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    icon: mdiBadgeAccountAlertOutline,
    label: 'Category',
    menu: [
      {
        label: 'Create',
        icon: mdiFolderPlus,
        href: '/category/create',
      },
      {
        label: 'List',
        icon: mdiFormatListBulletedSquare,
        href: '/category/list',
      },
    ],
  },

  {
    icon: mdiTrainCarContainer,
    label: 'Product',
    menu: [
      {
        label: 'Create',
        icon: mdiFolderPlus,
        href: '/product/create',
      },
      {
        label: 'List',
        icon: mdiFormatListBulletedSquare,
        href: '/product/list',
      },
    ],
  },
  {
    icon: mdiMapMarker,
    label: 'Order',
    menu: [
      {
        label: 'List',
        icon: mdiFormatListBulletedSquare,
        href: '/order/list',
      },
    ],
  },
  {
    icon: mdiFileWordBox,
    label: 'Create Account',
    menu: [
      {
        label: 'Warehouse',
        icon: mdiFolderPlus,
        href: '/create-account/user',
      },
      {
        label: 'Admin',
        icon: mdiFolderPlus,
        href: '/create-account/admin',
      },
    ],
  },
]

export default menuAside
