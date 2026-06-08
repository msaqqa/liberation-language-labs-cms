import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
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
              admin: {
                description:
                  'The first thing visitors see. Keep it short, warm, and affirming.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'Main headline overlaid on the hero image. Aim for 3–7 words.',
                  },
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description:
                      'Wide hero image, ≥1920×1080, under ~400 KB. Keep the subject toward the left — the headline overlays the right side.',
                  },
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
              admin: {
                description: 'Introduces the practice and its approach.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Section heading, e.g. “About the Labs”.' },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: { description: 'Optional short line shown above or below the title.' },
                },
                {
                  name: 'description',
                  type: 'richText',
                  required: true,
                  admin: {
                    description:
                      'Two to three short paragraphs. Plain, affirming language reads best here.',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Portrait/lifestyle image, roughly square or 4:3, under ~300 KB.',
                  },
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
              admin: {
                description: 'Highlights the speech-therapy focus areas.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Section heading.' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { description: 'Optional 1–2 sentence intro under the heading.' },
                },
                {
                  name: 'items',
                  type: 'array',
                  admin: {
                    description: 'Each row is one focus area. 3–6 rows works best visually.',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                      admin: { description: 'Short label, 1–4 words.' },
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      required: true,
                      admin: { description: 'One or two sentences describing this focus area.' },
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
              admin: {
                description: 'Grouped lists of services offered.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Section heading.' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { description: 'Optional intro under the heading.' },
                },
                {
                  name: 'servicesLists',
                  type: 'array',
                  admin: {
                    description: 'Each row is a service group (a column of related services).',
                  },
                  fields: [
                    {
                      name: 'listTitle',
                      type: 'text',
                      required: true,
                      admin: { description: 'Heading for this group of services.' },
                    },
                    {
                      name: 'listItems',
                      type: 'array',
                      admin: { description: 'Individual services listed under this group.' },
                      fields: [
                        {
                          name: 'item',
                          type: 'text',
                          required: true,
                          admin: { description: 'One service. Keep it to a short phrase.' },
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
              admin: {
                description: 'Pricing and payment details.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Section heading.' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { description: 'Optional intro under the heading.' },
                },
                {
                  name: 'paymentInfo',
                  type: 'richText',
                  admin: {
                    description:
                      'Payment/insurance details. Use a bullet list for sliding-scale or accepted plans.',
                  },
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
              admin: {
                description:
                  'Contact details shown in the home page contact block. Leave a field blank to hide its card.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { description: 'Section heading, e.g. “Get in touch”.' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { description: 'Optional intro under the heading.' },
                },
                {
                  name: 'phone',
                  type: 'text',
                  admin: { description: 'Display format, e.g. (555) 123-4567.' },
                },
                {
                  name: 'fax',
                  type: 'text',
                  admin: { description: 'Optional. Leave blank to hide the Fax card.' },
                },
                {
                  name: 'email',
                  type: 'text',
                  admin: { description: 'Public contact email, e.g. hello@liberationlabs.com.' },
                },
                {
                  name: 'address',
                  type: 'text',
                  admin: { description: 'Single-line mailing address.' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
