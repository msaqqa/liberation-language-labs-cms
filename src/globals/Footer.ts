import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
        description: 'Footer logo. A light/white version reads best on the dark footer.',
      },
    },
    {
      name: 'navLinks',
      type: 'array',
      admin: { description: 'Footer navigation links, in order.' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Link text.' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'Destination: /path, #section, or full URL.' },
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      admin: {
        description: 'Copyright line, e.g. “© 2026 Liberation Language Labs”.',
      },
    },
    {
      name: 'designerText',
      type: 'text',
      admin: { description: 'Optional credit text, e.g. “Designed by …”.' },
    },
    {
      name: 'designerLink',
      type: 'text',
      admin: { description: 'Optional URL the credit text links to.' },
    },
  ],
}
