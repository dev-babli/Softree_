import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { calloutBlockType, ctaButtonBlockType, statHighlightBlockType } from './blockObjectTypes'
import { storyBlockContentType } from './storyBlockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { caseStudyType } from './caseStudyType'
import { homepageCaseStudySliderType } from './homepageCaseStudySliderType'
import { globalSettingsType } from './globalSettingsType'
import { aiContextType } from './aiContextType'
import { marketingPageType } from './marketingPageType'
import { pageBuilderBlockTypes } from './pageBuilderBlocks'
import { careersPageType } from './careersPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    calloutBlockType,
    ctaButtonBlockType,
    statHighlightBlockType,
    blockContentType,
    storyBlockContentType,
    ...pageBuilderBlockTypes,
    categoryType,
    postType,
    authorType,
    caseStudyType,
    homepageCaseStudySliderType,
    globalSettingsType,
    aiContextType,
    marketingPageType,
    careersPageType,
  ],
}
