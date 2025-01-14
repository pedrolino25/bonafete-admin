import {
  Database,
  House,
  LucideIcon,
  ShieldX,
  Tag,
  User,
  Users,
} from 'lucide-react'

export interface NavbarChildrenLink {
  title: string
  path: string
  alias: string
}

export interface NavbarLink {
  title: string
  icon: LucideIcon
  path: string
  alias: string
  childrens?: NavbarChildrenLink[]
}

export interface NavbarSection {
  title?: string
  links: NavbarLink[]
}

export const routes = [
  {
    title: 'navigation.management',
    links: [
      {
        title: 'navigation.spaces',
        icon: House,
        path: '/spaces/published',
        alias: 'spaces',
        childrens: [
          {
            title: 'navigation.spaces-published',
            path: '/spaces/published',
            alias: 'spaces',
          },
          {
            title: 'navigation.spaces-archived',
            path: '/spaces/archived',
            alias: 'spaces',
          },
        ],
      },
      {
        title: 'navigation.hosts',
        icon: User,
        path: '/hosts/active',
        alias: 'hosts',
        childrens: [
          {
            title: 'navigation.hosts-active',
            path: '/hosts/active',
            alias: 'hosts',
          },
          {
            title: 'navigation.hosts-archived',
            path: '/hosts/archived',
            alias: 'hosts',
          },
          {
            title: 'navigation.hosts-suspended',
            path: '/hosts/suspended',
            alias: 'hosts',
          },
        ],
      },
      {
        title: 'navigation.reservations',
        icon: Tag,
        path: '/reservations/confirmed',
        alias: 'reservations',
        childrens: [
          {
            title: 'navigation.reservations-confirmed',
            path: '/reservations/confirmed',
            alias: 'reservations',
          },
          {
            title: 'navigation.reservations-canceled',
            path: '/reservations/canceled',
            alias: 'reservations',
          },
          {
            title: 'navigation.reservations-pending',
            path: '/reservations/pending',
            alias: 'reservations',
          },
        ],
      },
    ],
  },
  {
    title: 'navigation.database',
    links: [
      {
        title: 'navigation.reference-data',
        icon: Database,
        path: '/reference-data/coutries',
        alias: 'reference-data',
        childrens: [
          {
            title: 'navigation.reference-data-coutries',
            path: '/reference-data/coutries',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-localities',
            path: '/reference-data/localities',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-postal-codes',
            path: '/reference-data/postal-codes',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-space-types',
            path: '/reference-data/space-types',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-event-types',
            path: '/reference-data/event-types',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-conveniences',
            path: '/reference-data/conveniences',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-services-categories',
            path: '/reference-data/services-categories',
            alias: 'reference-data',
          },
          {
            title: 'navigation.reference-data-services',
            path: '/reference-data/services',
            alias: 'reference-data',
          },
        ],
      },
    ],
  },

  {
    title: 'navigation.user-management',
    links: [
      {
        title: 'navigation.users',
        icon: Users,
        path: '/users/employes',
        alias: 'users',
        childrens: [
          {
            title: 'navigation.users-employes',
            path: '/users/employes',
            alias: 'users',
          },
        ],
      },
      {
        title: 'navigation.user-permissions',
        icon: ShieldX,
        path: '/users/permissions',
        alias: 'user-permissions',
      },
    ],
  },
] as NavbarSection[]
