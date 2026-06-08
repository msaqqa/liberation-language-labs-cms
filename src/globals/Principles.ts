import { GlobalConfig } from 'payload'

export const Principles: GlobalConfig = {
  slug: 'principles-page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'banner',
      type: 'group',
      admin: { description: 'Top banner of the Principles page.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Page banner heading.' },
        },
      ],
    },
    {
      name: 'statement',
      type: 'group',
      admin: { description: 'Opening statement of principles.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Section heading.' },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: { description: 'The statement body. Short paragraphs read best.' },
        },
      ],
    },
    {
      name: 'commitment',
      type: 'group',
      admin: { description: 'Your commitment to clients.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Section heading.' },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: { description: 'The commitment body.' },
        },
      ],
    },
    {
      name: 'strive',
      type: 'group',
      admin: { description: '“What we strive for” — an optional heading, bullet list, and closing text.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: { description: 'Optional section heading.' },
        },
        {
          name: 'list',
          type: 'array',
          admin: { description: 'Each row is one bullet point.' },
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
              admin: { description: 'A single bullet. Keep it to one line.' },
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          admin: { description: 'Optional closing paragraph below the list.' },
        },
      ],
    },
  ],
}
