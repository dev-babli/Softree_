/**
 * Sanity Schema Configuration
 * 
 * This file exports schemas for use with Sanity Studio.
 * The Studio itself is managed separately via the CLI at:
 * studio-softree-technology/ (created with npm create sanity@latest)
 * 
 * @see https://www.sanity.io/docs/configuration
 */

import { schemaTypes } from './sanity/schemas'

export const schema = {
  types: schemaTypes,
}
