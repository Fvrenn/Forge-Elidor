import { sanityClient, urlFor } from "@lib/sanity"

export type PageAccueil = {
  hero: {
    surtitre: string
    titre: string
    texte: string
    boutonTexte: string
    boutonLien: string
    photos: { image: string; caption: string }[]
  }
  categories: { titre: string; texte: string; boutonTexte: string }
  aPropos: { titre: string; accroche: string; texte: string; image: string }
  banniere: { titre: string; signature: string; image: string }
  actualites: { titre: string; texte: string }
}

// Textes affichés tant que le champ correspondant est vide dans Sanity
const DEFAUTS: PageAccueil = {
  hero: {
    surtitre: "Forge Elidor",
    titre: "Coutelier dans la Vallée de Munster",
    texte:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor consequat ligula, sit amet vestibulum mi consequat a. Mauris sollicitudin ligula sit amet elit bibendum, id consequat lorem hendrerit.",
    boutonTexte: "Voir Plus",
    boutonLien: "/galerie",
    photos: [
      {
        image: "/swiper/swiper1.jpg",
        caption: "Couteau de cuisine artisanal forgé à la Forge Elidor",
      },
      {
        image: "/swiper/swiper2.jpg",
        caption:
          "Trois couteaux de cuisine à lame damas et manches en bois précieux",
      },
      {
        image: "/swiper/swiper3.jpg",
        caption: "Couteau artisanal posé sur un établi de l'atelier",
      },
    ],
  },
  categories: {
    titre: "Nos catégories de couteaux",
    texte:
      "Chaque lame a sa forme et son usage. Survolez une catégorie pour découvrir le couteau, et trouvez celui fait pour votre cuisine.",
    boutonTexte: "Voir la galerie",
  },
  aPropos: {
    titre: "A propos de moi",
    accroche:
      "Un bon tranchant, une lame équilibrée, un manche ergonomique… et le couteau devient le prolongement de votre main.",
    texte: `Moi, c’est Joël. Je suis artisan coutelier depuis 2010 et amateur de bonne lames depuis l’âge de 6 ans.
Après avoir fabriqué des couteaux de chasse, des couteaux outdoor et des couteaux pliants, je me suis découvert une véritable passion pour les couteaux de cuisine. Pourquoi la cuisine ? Tout simplement parce que j’aime émincer des oignons, découper de la viande ou du poisson, et utiliser un couteau au quotidien pour le mettre à l’épreuve.
J’aime les couteaux qui servent chaque jour, ce sont de véritables outils, des outils indispensables.
Ici, pas de couteaux fabriqués en série : chaque pièce est unique. De la pointe jusqu’au bout du manche, en passant par l’étui en bois, tout est réalisé de manière artisanale. Alors oubliez les couteaux industriels sans âme, dont le tranchant ne tient souvent pas une semaine, et entrez dans l’univers du couteau de cuisine artisanal.`,
    image: "/a-propos/img-about.png",
  },
  banniere: {
    titre: "Des couteaux forgés pour durer, conçus pour exceller.",
    signature: "Joel Matter",
    image: "/a-propos/baniere.jpg",
  },
  actualites: {
    titre: "L'actualité récente",
    texte:
      "Les dernières pièces sorties de l'atelier et les rendez-vous à venir.",
  },
}

const PAGE_ACCUEIL_QUERY = `*[_type == "pageAccueil" && _id == "pageAccueil"][0]`

// Garde la valeur par défaut quand le champ Sanity est vide
function ou<T>(valeur: T | null | undefined, defaut: T): T {
  if (valeur === null || valeur === undefined) return defaut
  if (typeof valeur === "string" && !valeur.trim()) return defaut
  return valeur
}

export async function getPageAccueil(): Promise<PageAccueil> {
  let doc: any = null
  try {
    doc = await sanityClient.fetch(PAGE_ACCUEIL_QUERY)
  } catch (e) {
    console.error("Sanity: impossible de récupérer la page d'accueil", e)
  }

  const hero = doc?.hero ?? {}
  const categories = doc?.categories ?? {}
  const aPropos = doc?.aPropos ?? {}
  const banniere = doc?.banniere ?? {}
  const actualites = doc?.actualites ?? {}

  const photos = (hero.photos ?? [])
    .filter((photo: any) => photo?.asset)
    .map((photo: any) => ({
      image: urlFor(photo).width(1600).url(),
      caption: photo.legende ?? "",
    }))

  return {
    hero: {
      surtitre: ou(hero.surtitre, DEFAUTS.hero.surtitre),
      titre: ou(hero.titre, DEFAUTS.hero.titre),
      texte: ou(hero.texte, DEFAUTS.hero.texte),
      boutonTexte: ou(hero.boutonTexte, DEFAUTS.hero.boutonTexte),
      boutonLien: ou(hero.boutonLien, DEFAUTS.hero.boutonLien),
      photos: photos.length ? photos : DEFAUTS.hero.photos,
    },
    categories: {
      titre: ou(categories.titre, DEFAUTS.categories.titre),
      texte: ou(categories.texte, DEFAUTS.categories.texte),
      boutonTexte: ou(categories.boutonTexte, DEFAUTS.categories.boutonTexte),
    },
    aPropos: {
      titre: ou(aPropos.titre, DEFAUTS.aPropos.titre),
      accroche: ou(aPropos.accroche, DEFAUTS.aPropos.accroche),
      texte: ou(aPropos.texte, DEFAUTS.aPropos.texte),
      image: aPropos.image?.asset
        ? urlFor(aPropos.image).width(1200).url()
        : DEFAUTS.aPropos.image,
    },
    banniere: {
      titre: ou(banniere.titre, DEFAUTS.banniere.titre),
      signature: ou(banniere.signature, DEFAUTS.banniere.signature),
      image: banniere.image?.asset
        ? urlFor(banniere.image).width(2400).url()
        : DEFAUTS.banniere.image,
    },
    actualites: {
      titre: ou(actualites.titre, DEFAUTS.actualites.titre),
      texte: ou(actualites.texte, DEFAUTS.actualites.texte),
    },
  }
}
