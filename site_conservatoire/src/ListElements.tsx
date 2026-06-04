// id : identifiant unique de l'élément (utilisé pour le select)
// nomAffichage : nom lisible pour l'administrateur dans le select
// balise : correspondance avec la balise HTML ou le composant React à utiliser pour cet élément
// parametres : liste des paramètres spécifiques à cet élément, avec une clé (cle), un label pour l'interface (label) et un type d'input (type)

const dictionnaireElements = [
    {
        nomAffichage: "Image",
        balise: "Image",
        type: "element",
        parametres: [
            { cle: "image", label: "Fichier de l'image", type: "file" },
            { cle: "texte", label: "Texte alternatif (Description)", type: "text" },
            { cle: "largeur", label: "Largeur (px)", type: "number" },
            { cle: "hauteur", label: "Hauteur (px)", type: "number" }
        ]
    },
    {
        nomAffichage: "Bouton",
        balise: "Button",
        type: "element",
        parametres: [
            { cle: "texte", label: "Texte du bouton", type: "text" },
            { cle: "couleur", label: "Couleur du bouton", type: "color" }
        ]
    },
    {
        nomAffichage: "Titre de Section",
        balise: "h2",
        type: "element",
        parametres: [
            { cle: "contenu", label: "Contenu du titre", type: "text" },
            { cle: "taille", label: "Taille de la police (px)", type: "number" }
        ]
    }
];

export default dictionnaireElements;


