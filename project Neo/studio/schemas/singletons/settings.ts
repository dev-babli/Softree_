import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "reference",
              to: [{ type: "page" }, { type: "post" }, { type: "project" }],
            }),
            defineField({
              name: "externalLink",
              title: "External Link",
              type: "url",
            }),
            defineField({
              name: "openInNewTab",
              title: "Open in New Tab",
              type: "boolean",
              initialValue: false,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({
          name: "email",
          title: "Email",
          type: "email",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "text",
        }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "titleTemplate",
          title: "Title Template",
          type: "string",
          initialValue: "%s | Project Neo",
        }),
        defineField({
          name: "descriptionTemplate",
          title: "Description Template",
          type: "text",
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
