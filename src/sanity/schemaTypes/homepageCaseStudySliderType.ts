import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageCaseStudySliderType = defineType({
  name: "homepageCaseStudySlider",
  title: "Homepage Case Study Slider",
  type: "document",
  initialValue: {
    title: "Homepage Case Study Slider",
    sectionEnabled: true,
    slides: [
      {
        company: "Sample Enterprise",
        eyebrow: "Featured client story",
        title: "Modernized operations with AI workflow automation",
        description:
          "Replace this starter content with your real homepage case study slide details.",
        ctaText: "Read case study",
        ctaHref: "/case-studies",
        stats: [{ value: "35%", label: "Efficiency gain" }],
      },
    ],
  },
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Homepage Case Study Slider",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionEnabled",
      title: "Section Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      validation: (Rule) => Rule.min(1).warning("Add at least one slide for homepage showcase."),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "company",
              title: "Company Name",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "eyebrow",
              title: "Eyebrow",
              type: "string",
              validation: (Rule) => Rule.required().max(180),
            }),
            defineField({
              name: "title",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(260),
            }),
            defineField({
              name: "ctaText",
              title: "CTA Text",
              type: "string",
              initialValue: "Read case study",
              validation: (Rule) => Rule.required().max(36),
            }),
            defineField({
              name: "ctaHref",
              title: "CTA Link",
              type: "string",
              description: 'Use relative URL like "/case-studies/slug" or full URL.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Right Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "badgeImage",
              title: "Badge Image (Optional)",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
            }),
            defineField({
              name: "stats",
              title: "Stats",
              type: "array",
              validation: (Rule) => Rule.min(1).max(3),
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "string",
                      validation: (Rule) => Rule.required().max(20),
                    }),
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required().max(80),
                    }),
                  ],
                  preview: {
                    select: {
                      title: "value",
                      subtitle: "label",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "company",
              subtitle: "title",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      enabled: "sectionEnabled",
    },
    prepare({ title, enabled }) {
      return {
        title: title || "Homepage Case Study Slider",
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
