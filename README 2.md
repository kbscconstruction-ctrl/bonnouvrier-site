# Bonnouvrier — Site vitrine BTP

## Structure du projet

```
bonnouvrier/
│
├── index.html              ← Page d'accueil
│
├── css/
│   ├── style.css           ← Styles communs (nav, footer, composants)
│   └── pages.css           ← Styles spécifiques aux pages intérieures
│
├── js/
│   └── main.js             ← Scripts communs (nav, animations, FAQ...)
│
├── images/                 ← Toutes vos photos et images
│   ├── hero/               ← Photos hero de chaque page
│   ├── realisations/       ← Photos de chantiers
│   └── logo/               ← Logo en différents formats
│
└── pages/                  ← Pages intérieures
    ├── charpente.html
    ├── toiture.html
    ├── renovation.html
    ├── dessin-technique.html
    ├── peinture.html
    ├── mobilier.html
    ├── realisations.html
    └── contact.html
```

## Pour ajouter une nouvelle page

1. Dupliquer un fichier existant dans `/pages/`
2. Modifier le `<title>` et la `<meta description>`
3. Ajouter vos styles spécifiques dans `css/pages.css`
4. Ajouter les scripts nécessaires dans `js/main.js`

## Pour mettre en ligne (Hostinger)

1. Sélectionner tous les fichiers et dossiers
2. Compresser en `.zip`
3. Uploader dans `public_html` via le Gestionnaire de fichiers Hostinger
4. Décompresser sur le serveur

## Couleurs du projet

- Rouge principal : `#C0392B`
- Rouge vif : `#E74C3C`
- Noir : `#0F0F0F`
- Fond clair : `#f7f7f5`
- Ardoise : `#C8C0B4`
