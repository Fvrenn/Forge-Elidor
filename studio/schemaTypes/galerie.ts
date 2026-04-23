import { defineField, defineType } from 'sanity'

export const galerie = defineType({
  name: 'galerie',
  title: 'Galerie',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }, 
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'categorieGalerie' }],
    }),
  ],
  orderings: [
    { title: 'Ordre', name: 'ordre', by: [{ field: 'ordre', direction: 'asc' }] }
  ]
})