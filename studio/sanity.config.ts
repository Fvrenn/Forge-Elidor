import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {defineLocations, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'

// Documents uniques : une seule instance, pas de création ni de suppression
const SINGLETONS = [{type: 'pageAccueil', title: "Page d'accueil"}]
const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type))

// Adresse du site affiché dans l'aperçu (Presentation)
const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:8000'

export default defineConfig({
  name: 'default',
  title: 'forge-elidor-studio',

  projectId: 'uugz05vu',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            ...SINGLETONS.map(({type, title}) =>
              S.listItem()
                .title(title)
                .id(type)
                .child(S.document().schemaType(type).documentId(type)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId()!)),
          ]),
    }),
    presentationTool({
      title: 'Aperçu du site',
      previewUrl: {
        origin: PREVIEW_URL,
        preview: '/fr',
        previewMode: {enable: '/api/draft-mode/enable', disable: '/api/draft-mode/disable'},
      },
      // Pages du site où chaque document apparaît (bouton « Ouvrir dans l'aperçu »)
      resolve: {
        locations: {
          pageAccueil: defineLocations({
            locations: [{title: "Page d'accueil", href: '/fr'}],
          }),
          actualite: defineLocations({
            select: {title: 'titre'},
            resolve: (doc) => ({
              locations: [
                {title: "Page d'accueil", href: '/fr'},
                {title: doc?.title || 'Actualité', href: '/fr/actualite'},
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
