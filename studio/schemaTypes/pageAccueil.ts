import { defineArrayMember, defineField, defineType } from 'sanity'

// Document unique : un seul "Page d'accueil" existe (voir sanity.config.ts).
// Chaque groupe correspond à une section de la home, dans l'ordre d'affichage.
// Un champ laissé vide reprend le texte par défaut du site.
export const pageAccueil = defineType({
  name: 'pageAccueil',
  title: "Page d'accueil",
  type: 'document',
  groups: [
    { name: 'hero', title: 'Bandeau principal', default: true },
    { name: 'categories', title: 'Catégories' },
    { name: 'aPropos', title: 'À propos' },
    { name: 'banniere', title: 'Grande bannière' },
    { name: 'actualites', title: 'Actualités' },
  ],
  fields: [
    // --- Bandeau principal ---
    defineField({
      name: 'hero',
      title: 'Bandeau principal',
      type: 'object',
      group: 'hero',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'surtitre', title: 'Surtitre', type: 'string', description: 'Ex. : Forge Elidor' }),
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 4 }),
        defineField({ name: 'boutonTexte', title: 'Texte du bouton', type: 'string' }),
        defineField({
          name: 'boutonLien',
          title: 'Lien du bouton',
          type: 'string',
          description: 'Page du site, ex. : /galerie, /atelier, /actualite',
        }),
        defineField({
          name: 'photos',
          title: 'Photos du carrousel',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'legende',
                  title: 'Description de la photo',
                  type: 'string',
                  description: 'Pour le référencement et les malvoyants.',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // --- Catégories ---
    defineField({
      name: 'categories',
      title: 'Section catégories',
      type: 'object',
      group: 'categories',
      options: { collapsible: false },
      description: 'Les catégories elles-mêmes se gèrent dans « Catégorie ».',
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
        defineField({ name: 'boutonTexte', title: 'Texte du bouton', type: 'string' }),
      ],
    }),

    // --- À propos ---
    defineField({
      name: 'aPropos',
      title: 'Section à propos',
      type: 'object',
      group: 'aPropos',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'accroche', title: 'Accroche', type: 'text', rows: 2 }),
        defineField({
          name: 'texte',
          title: 'Texte',
          type: 'text',
          rows: 12,
          description: 'Les retours à la ligne sont conservés sur le site.',
        }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // --- Grande bannière ---
    defineField({
      name: 'banniere',
      title: 'Grande bannière',
      type: 'object',
      group: 'banniere',
      options: { collapsible: false },
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'signature', title: 'Signature', type: 'string' }),
        defineField({ name: 'image', title: 'Photo de fond', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // --- Actualités ---
    defineField({
      name: 'actualites',
      title: 'Section actualités',
      type: 'object',
      group: 'actualites',
      options: { collapsible: false },
      description: 'Les actualités elles-mêmes se gèrent dans « Actualité ».',
      fields: [
        defineField({ name: 'titre', title: 'Titre', type: 'string' }),
        defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 2 }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
})
