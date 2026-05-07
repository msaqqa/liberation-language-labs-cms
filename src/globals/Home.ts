import { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home-page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "about",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "subtitle",
          type: "text",
        },
        {
          name: "description",
          type: "richText",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "speechTherapy",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "items",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "services",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "servicesLists",
          type: "array",
          fields: [
            {
              name: "listTitle",
              type: "text",
              required: true,
            },
            {
              name: "listItems",
              type: "array",
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "pricing",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "paymentInfo",
          type: "richText",
        },
      ],
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "fax",
          type: "text",
        },
        {
          name: "email",
          type: "text",
        },
        {
          name: "address",
          type: "text",
        },
      ],
    },
  ],
};
