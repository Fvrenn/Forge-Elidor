/**
 * Crée le document "Page d'accueil" avec les textes et images jusqu'ici codés
 * en dur dans le storefront, pour que tout soit modifiable depuis le Studio.
 *
 * À lancer une seule fois depuis studio/ :
 *   npx sanity exec scripts/seed-page-accueil.ts --with-user-token
 *
 * Si le document existe déjà, le script ne fait rien : il est rejouable sans risque.
 */
import {getCliClient} from 'sanity/cli'
import {createReadStream, existsSync} from 'fs'
import {basename, resolve} from 'path'

const client = getCliClient()
const PUBLIC_DIR = resolve(__dirname, '../../storefront/public')
const DOC_ID = 'pageAccueil'

async function uploadImage(relativePath: string) {
  const filePath = resolve(PUBLIC_DIR, relativePath)
  if (!existsSync(filePath)) {
    console.warn(`  ! fichier introuvable : ${filePath}`)
    return undefined
  }
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: basename(filePath),
  })
  console.log(`  ✓ image envoyée : ${relativePath}`)
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

async function run() {
  if (await client.getDocument(DOC_ID)) {
    console.log("- Page d'accueil : existe déjà, rien à faire")
    return
  }

  const photos = [
    ['swiper/swiper1.jpg', 'Couteau de cuisine artisanal forgé à la Forge Elidor'],
    ['swiper/swiper2.jpg', 'Trois couteaux de cuisine à lame damas et manches en bois précieux'],
    ['swiper/swiper3.jpg', "Couteau artisanal posé sur un établi de l'atelier"],
  ]
  const photosHero = []
  for (const [i, [path, legende]] of photos.entries()) {
    const image = await uploadImage(path)
    if (image) photosHero.push({...image, _key: `photo${i + 1}`, legende})
  }

  await client.create({
    _id: DOC_ID,
    _type: 'pageAccueil',
    hero: {
      surtitre: 'Forge Elidor',
      titre: 'Coutelier dans la Vallée de Munster',
      texte:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet vestibulum mi consequat a. Mauris sollicitudin ligula sit amet elit bibendum, id consequat lorem hendrerit.',
      boutonTexte: 'Voir Plus',
      boutonLien: '/galerie',
      photos: photosHero,
    },
    categories: {
      titre: 'Nos catégories de couteaux',
      texte:
        'Chaque lame a sa forme et son usage. Survolez une catégorie pour découvrir le couteau, et trouvez celui fait pour votre cuisine.',
      boutonTexte: 'Voir la galerie',
    },
    aPropos: {
      titre: 'A propos de moi',
      accroche:
        'Un bon tranchant, une lame équilibrée, un manche ergonomique… et le couteau devient le prolongement de votre main.',
      texte: `Moi, c’est Joël. Je suis artisan coutelier depuis 2010 et amateur de bonne lames depuis l’âge de 6 ans.
Après avoir fabriqué des couteaux de chasse, des couteaux outdoor et des couteaux pliants, je me suis découvert une véritable passion pour les couteaux de cuisine. Pourquoi la cuisine ? Tout simplement parce que j’aime émincer des oignons, découper de la viande ou du poisson, et utiliser un couteau au quotidien pour le mettre à l’épreuve.
J’aime les couteaux qui servent chaque jour, ce sont de véritables outils, des outils indispensables.
Ici, pas de couteaux fabriqués en série : chaque pièce est unique. De la pointe jusqu’au bout du manche, en passant par l’étui en bois, tout est réalisé de manière artisanale. Alors oubliez les couteaux industriels sans âme, dont le tranchant ne tient souvent pas une semaine, et entrez dans l’univers du couteau de cuisine artisanal.`,
      image: await uploadImage('a-propos/img-about.png'),
    },
    banniere: {
      titre: 'Des couteaux forgés pour durer, conçus pour exceller.',
      signature: 'Joel Matter',
      image: await uploadImage('a-propos/baniere.jpg'),
    },
    actualites: {
      titre: "L'actualité récente",
      texte: "Les dernières pièces sorties de l'atelier et les rendez-vous à venir.",
    },
  })
  console.log("✓ Page d'accueil créée")
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
