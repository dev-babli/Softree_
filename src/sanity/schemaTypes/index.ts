import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { caseStudyType } from './caseStudyType'
import { homepageCaseStudySliderType } from "./homepageCaseStudySliderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    caseStudyType,
    homepageCaseStudySliderType,
  ],
}
