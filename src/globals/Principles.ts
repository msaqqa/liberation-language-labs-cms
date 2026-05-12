import { GlobalConfig } from 'payload'

export const Principles: GlobalConfig = {
  slug: 'principles-page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'banner',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'statement',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'commitment',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'strive',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'list',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
  ],
}
