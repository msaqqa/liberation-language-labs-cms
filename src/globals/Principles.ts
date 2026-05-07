import { GlobalConfig } from 'payload'

export const Principles: GlobalConfig = {
  slug: 'principles-page',
  access: {
    read: () => true,
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
        {
          name: 'striveToList',
          type: 'array',
          fields: [
            {
              name: 'item',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      type: 'group',
      fields: [
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
        {
          name: 'quote',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'textarea',
            },
            {
              name: 'author',
              type: 'text',
            },
            {
              name: 'bookTitle',
              type: 'text',
            },
            {
              name: 'bookLink',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
