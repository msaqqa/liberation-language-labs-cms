import { revalidatePath } from 'next/cache'
import { CollectionConfig } from 'payload'

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title) {
          data.slug = generateSlug(data.title)
        }
        return data
      },
    ],
    afterChange: [
      async () => {
        revalidatePath('/', 'layout')
      },
    ],
    afterDelete: [
      async () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  access: {
    read: async () => true,
    create: async ({ req: { user } }) => !!user,
    update: async ({ req: { user } }) => !!user,
    delete: async ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Short description of the blog',
      },
    },
    {
      name: 'details',
      type: 'richText',
      required: true,
      label: 'Details',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      defaultValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: 'Published',
    },
  ],
}
