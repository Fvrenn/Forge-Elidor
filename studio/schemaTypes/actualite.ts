import { defineField, defineType } from 'sanity'

export const actualite = defineType({
  name: 'actualite',
  title: 'Actualité',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'texte',
      title: 'Texte',
      type: 'text',
      rows: 8,
    }),
  ],
  orderings: [
    { title: 'Date (récent → ancien)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'titre', subtitle: 'date', media: 'image' }
  }
})
