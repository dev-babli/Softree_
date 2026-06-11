export type ReactBitsCategory = 'Animations' | 'Backgrounds' | 'Components' | 'TextAnimations'

export type ReactBitsCatalogEntry = {
  id: string
  name: string
  category: ReactBitsCategory
  description: string
  docsUrl: string
  importPath: string
  defaultProps?: Record<string, unknown>
}
