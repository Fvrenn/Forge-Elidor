import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Documents uniques : une seule instance, pas de création ni de suppression
const SINGLETONS = [{type: 'pageAccueil', title: "Page d'accueil"}]
const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type))

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
