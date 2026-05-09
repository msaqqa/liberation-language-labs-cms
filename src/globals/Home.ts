import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Hero Section
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // About Section
        {
          label: 'About Section',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'richText',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        // Speech Therapy Section
        {
          label: 'Speech Therapy Section',
          fields: [
            {
              name: 'speechTherapy',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Services Section
        {
          label: 'Services Section',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'servicesLists',
                  type: 'array',
                  fields: [
                    {
                      name: 'listTitle',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'listItems',
                      type: 'array',
                      fields: [
                        {
                          name: 'item',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Pricing Section
        {
          label: 'Pricing Section',
          fields: [
            {
              name: 'pricing',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'paymentInfo',
                  type: 'richText',
                },
              ],
            },
          ],
        },
        // Contact Section
        {
          label: 'Contact Section',
          fields: [
            {
              name: 'contactInfo',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'fax',
                  type: 'text',
                },
                {
                  name: 'email',
                  type: 'text',
                },
                {
                  name: 'address',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
