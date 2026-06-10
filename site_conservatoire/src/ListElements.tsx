// nomAffichage : nom lisible pour l'administrateur dans le select
// balise : correspondance avec la balise HTML ou le composant React à utiliser pour cet élément
// parametres : liste des paramètres spécifiques à cet élément, avec une clé, 
// un label pour l'interface (label) et un type d'input (type)

const dictionnaireElements = [
    {
        nomAffichage: "Bannière page d'accueil",
        balise: "HomePageBanner",
        type: "section",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
        ]
    },
    {
        nomAffichage: "Image de fond",
        balise: "BgImage",
        type: "element",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
            { cle: "image", label: "Fichier de l'image", type: "file" }
        ]
    },
    {
        nomAffichage: "Image",
        balise: "Image",
        type: "element",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
            { cle: "image", label: "Fichier de l'image", type: "file" },
            { cle: "texte", label: "(facultatif) Texte alternatif", type: "text" },
            { cle: "longueur", label: "(facultatif) Longueur en px", type: "number" },
            { cle: "hauteur", label: "(facultatif) Hauteur en px", type: "number" }
        ]
    },
    {
        nomAffichage: "Bouton",
        balise: "Button",
        type: "element",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
            { cle: "texte", label: "Texte du bouton", type: "text" },
            { cle: "couleur", label: "Couleur du bouton", type: "color" }
        ]
    },
    {
        nomAffichage: "Titre page d'accueil",
        balise: "HomePageTitle",
        type: "element",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
            { cle: "texte", label: "Contenu du titre", type: "text" },
            { cle: "couleur", label: "Couleur du texte", type: "color" }
        ]
    },
    {
        nomAffichage: "Sous-titre page d'accueil",
        balise: "HomePageSmallTitle",
        type: "element",
        parametres: [
            { cle: "nom", label: "Nom de l'élément", type: "text" },
            { cle: "texte", label: "Contenu du titre", type: "textarea" },
            { cle: "couleur", label: "Couleur du texte", type: "color" }
        ]
    },
];

export default dictionnaireElements;


