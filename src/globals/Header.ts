import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: 'Layout',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Header logo. Transparent PNG/SVG, roughly 200×60, under ~50 KB.',
      },
    },
    {
      name: 'hotline',
      type: 'group',
      admin: { description: 'Phone call-to-action shown in the header.' },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: { description: 'Number as displayed, e.g. (555) 123-4567.' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'Click target — use a tel: link, e.g. tel:+15551234567.' },
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      admin: {
        description:
          'Main navigation links, in order. Use #section for home-page anchors (e.g. #contact) or a path like /blog.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Link text shown in the menu.' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'Destination: /path, #section, or full URL.' },
        },
      ],
    },
  ],
}
