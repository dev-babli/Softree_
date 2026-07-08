import { defineField, defineType } from "sanity";

export default defineType({
  name: "infoSection",
  title: "Info Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Image Left", value: "image-left" },
          { title: "Image Right", value: "image-right" },
          { title: "Image Top", value: "image-top" },
        ],
        layout: "radio",
      },
      initialValue: "image-left",
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Brand", value: "brand" },
        ],
        layout: "radio",
      },
      initialValue: "dark",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});
