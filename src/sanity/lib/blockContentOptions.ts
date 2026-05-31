/** Shared Portable Text insert menu — visual block picker for editors. */
export const blockContentInsertMenu = {
  insertMenu: {
    groups: [
      {
        name: 'writing',
        title: 'Writing',
        of: ['block'],
      },
      {
        name: 'highlights',
        title: 'Highlights',
        of: ['callout', 'statHighlight', 'ctaButton'],
      },
      {
        name: 'media',
        title: 'Media',
        of: ['image'],
      },
    ],
    views: [
      {
        name: 'grid',
        previewImageUrl: (schemaTypeName: string) =>
          `/studio/block-previews/${schemaTypeName}.svg`,
      },
      { name: 'list' },
    ],
  },
} as const

export const aiAssistExclude = { aiAssist: { exclude: true } } as const
