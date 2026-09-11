import { defineField, defineType } from 'sanity'

export const categorieGalerie = defineType({
  name: 'categorieGalerie',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: "Texte affiché sous le titre dans la bannière de la page galerie.",
    }),
    defineField({
      name: 'banniere',
      title: 'Bannière',
      type: 'image',
      options: { hotspot: true },
      description: "Photo utilisée en bannière de la galerie et au survol sur la page d'accueil.",
    }),
    defineField({
      name: 'icone',
      title: 'Icône (SVG)',
      type: 'image',
      options: { accept: 'image/svg+xml' },
      description: "Icône au trait affichée dans le menu et sur la page d'accueil.",
    }),
    defineField({
      name: 'iconeHover',
      title: 'Icône au survol (SVG)',
      type: 'image',
      options: { accept: 'image/svg+xml' },
      description: "Variante claire affichée au survol dans le menu. Si vide, l'icône principale est réutilisée.",
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      description: "Plus le nombre est petit, plus la catégorie apparaît tôt.",
    }),
  ],
  orderings: [
    { title: 'Ordre', name: 'ordre', by: [{ field: 'ordre', direction: 'asc' }] },
    { title: 'Nom', name: 'nom', by: [{ field: 'nom', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nom', subtitle: 'slug.current', media: 'banniere' }
  }
})
