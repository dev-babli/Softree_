import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageCaseStudySliderType = defineType({
  name: "homepageCaseStudySlider",
  title: "Homepage Case Study Slider",
  type: "document",
  initialValue: {
    title: "Homepage Case Study Slider",
    sectionEnabled: true,
    slides: [],
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
      description:
        "Each slide references a published case study. Text, image, and stats are pulled from the case study unless you add manual overrides below.",
      validation: (Rule) =>
        Rule.custom((slides) => {
          if (!slides?.length) return true
          const invalid = slides.some(
            (slide: { caseStudy?: unknown; title?: string; company?: string }) =>
              !slide?.caseStudy && !slide?.title && !slide?.company,
          )
          return invalid
            ? "Each slide needs either a case study reference or legacy manual title/company fields."
            : true
        }).warning(),
      of: [
        defineArrayMember({
          type: "object",
          name: "homepageSlide",
          fields: [
            defineField({
              name: "caseStudy",
              title: "Case study",
              type: "reference",
              to: [{ type: "caseStudy" }],
              description:
                "Preferred source — text, image, and stats auto-populate from the referenced case study. Legacy manual-only slides still work when this is empty.",
            }),
            defineField({
              name: "company",
              title: "Company name override",
              type: "string",
              description: "Defaults to the referenced case study client name.",
            }),
            defineField({
              name: "eyebrow",
              title: "Eyebrow override",
              type: "string",
              description: "Defaults to hero eyebrow on the case study.",
            }),
            defineField({
              name: "title",
              title: "Heading override",
              type: "string",
              description: "Defaults to hero headline or header title on the case study.",
            }),
            defineField({
              name: "description",
              title: "Description override",
              type: "text",
              rows: 3,
              description: "Defaults to the case study excerpt.",
            }),
            defineField({
              name: "ctaText",
              title: "CTA Text override",
              type: "string",
              initialValue: "Read case study",
            }),
            defineField({
              name: "ctaHref",
              title: "CTA Link override",
              type: "string",
              description: 'Defaults to "/case-studies/{slug}".',
            }),
            defineField({
              name: "image",
              title: "Image override",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
              description: "Defaults to the case study cover image.",
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
              title: "Stats override",
              type: "array",
              description: "Defaults to hero highlights or key metrics on the case study.",
              validation: (Rule) => Rule.max(3),
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
              client: "caseStudy.client",
              headline: "caseStudy.heroHeadline",
              media: "caseStudy.mainImage",
              overrideTitle: "title",
            },
            prepare({ client, headline, media, overrideTitle }) {
              return {
                title: overrideTitle || headline || client || "Homepage slide",
                subtitle: client || "Case study slide",
                media,
              };
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
