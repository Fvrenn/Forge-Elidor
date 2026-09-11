/**
 * Remplit les nouveaux champs (bannière, description, icônes) des catégories
 * existantes à partir des fichiers jusqu'ici codés en dur dans le storefront.
 *
 * À lancer une seule fois depuis studio/ :
 *   npx sanity exec scripts/migrate-categories.ts --with-user-token
 *
 * Le script ne touche qu'aux champs encore vides : il est rejouable sans risque.
 */
import {getCliClient} from 'sanity/cli'
import {createReadStream, existsSync} from 'fs'
import {basename, resolve} from 'path'

const client = getCliClient()
const PUBLIC_DIR = resolve(__dirname, '../../storefront/public')

type Seed = {
  banniere: string
  icone: string
  iconeHover: string
  description: string
}

const SEEDS: Record<string, Seed> = {
  'couteau-santoku': {
    banniere: 'galerie-page/Santoku_1.webp',
    icone: 'nav/santoku.svg',
    iconeHover: 'nav/santoku-hover.svg',
    description:
      'Les couteaux Santoku sont parfaits pour ciseler et hacher avec une précision exceptionnelle.',
  },
  'couteau-bunka': {
    banniere: 'galerie-page/Bunka_1.webp',
    icone: 'nav/bunka.svg',
    iconeHover: 'nav/bunka-hover.svg',
    description:
      'Avec sa pointe biseautée caractéristique, le Bunka excelle autant dans le travail du poisson que de la viande.',
  },
  'couteau-petty': {
    banniere: 'galerie-page/Petty_1.webp',
    icone: 'nav/petty.svg',
    iconeHover: 'nav/petty-hover.svg',
    description:
      'Le couteau Petty est le compagnon indispensable pour tous les travaux délicats en cuisine.',
  },
  'couteau-office': {
    banniere: 'galerie-page/Office_1.webp',
    icone: 'nav/office.svg',
    iconeHover: 'nav/office-hover.svg',
    description:
      "Petit et maniable, le couteau d'office est l'outil polyvalent par excellence pour éplucher et couper.",
  },
  'couteau-nakiri': {
    banniere: 'galerie-page/Nakiri_1.webp',
    icone: 'nav/nakiri.svg',
    iconeHover: 'nav/nakiri-hover.svg',
    description:
      'Spécialement conçu pour les légumes, le Nakiri permet une coupe nette et rapide grâce à sa lame rectangulaire.',
  },
  econome: {
    banniere: 'galerie-page/Econome_1.webp',
    icone: 'nav/econome.svg',
    iconeHover: 'nav/econome-hover.svg',
    description: 'Un classique revisité pour une prise en main parfaite et un épluchage sans effort.',
  },
  'couteau-de-chef': {
    banniere: 'galerie-page/Gyuto_1.webp',
    icone: 'nav/gyuto.svg',
    iconeHover: 'nav/gyuto-hover.svg',
    description:
      'Polyvalent et puissant, le couteau de chef est la pièce maîtresse de toute cuisine professionnelle.',
  },
  'couteau-a-pain': {
    banniere: 'galerie-page/Couteau-a-pain.webp',
    icone: 'nav/pain.svg',
    iconeHover: 'nav/pain-hover.svg',
    description:
      'Sa lame dentelée traverse les croûtes les plus dures sans écraser la mie moelleuse.',
  },
}

// Ordre d'affichage repris de la page d'accueil
const ORDRE = [
  'couteau-santoku',
  'couteau-bunka',
  'couteau-petty',
  'couteau-office',
  'couteau-nakiri',
  'econome',
  'couteau-de-chef',
  'couteau-a-pain',
]

async function uploadImage(relativePath: string) {
  const filePath = resolve(PUBLIC_DIR, relativePath)
  if (!existsSync(filePath)) {
    console.warn(`  ! fichier introuvable : ${filePath}`)
    return null
  }
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  })
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function run() {
  const categories: Array<{_id: string; nom: string; slug?: string}> = await client.fetch(
    `*[_type == "categorieGalerie"]{_id, nom, "slug": slug.current}`
  )

  for (const cat of categories) {
    const seed = cat.slug ? SEEDS[cat.slug] : undefined
    if (!seed) {
      console.log(`- ${cat.nom} : aucun visuel connu pour ce slug, ignoré`)
      continue
    }

    const existant = await client.getDocument(cat._id)
    const patch: Record<string, unknown> = {}

    if (!existant?.description) patch.description = seed.description
    if (!existant?.banniere) patch.banniere = await uploadImage(seed.banniere)
    if (!existant?.icone) patch.icone = await uploadImage(seed.icone)
    if (!existant?.iconeHover) patch.iconeHover = await uploadImage(seed.iconeHover)
    if (existant?.ordre === undefined) {
      const index = ORDRE.indexOf(cat.slug!)
      if (index !== -1) patch.ordre = index + 1
    }

    const champs = Object.entries(patch).filter(([, v]) => v !== null)
    if (!champs.length) {
      console.log(`- ${cat.nom} : déjà complet`)
      continue
    }

    await client.patch(cat._id).set(Object.fromEntries(champs)).commit()
    console.log(`✓ ${cat.nom} : ${champs.map(([k]) => k).join(', ')}`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
