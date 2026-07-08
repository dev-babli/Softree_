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
import { caseStudyComposerBlockTypes } from './caseStudyComposerBlocks'
import { careersPageType } from './careersPageType'
import { tagType } from './tagType'
import { serviceLineType } from './serviceLineType'
import { navigationType } from './navigationType'
import { footerType } from './footerType'
import { homepageType } from './homepageType'
import { redirectType } from './redirectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    calloutBlockType,
    ctaButtonBlockType,
    statHighlightBlockType,
    blockContentType,
    storyBlockContentType,
    ...pageBuilderBlockTypes,
    ...caseStudyComposerBlockTypes,
    categoryType,
    tagType,
    postType,
    authorType,
    caseStudyType,
    serviceLineType,
    homepageCaseStudySliderType,
    homepageType,
    globalSettingsType,
    navigationType,
    footerType,
    aiContextType,
    marketingPageType,
    careersPageType,
    redirectType,
  ],
}
