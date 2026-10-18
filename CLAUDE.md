# Toffolon refonte

Refonte du site de Toffolon Peinture & Décoration (prospect PulseAds, Les Pavillons-sous-Bois, 93), optimisée SEO local et demandes de devis.
Site actuel : toffolon-peinture-deco.fr. Dépôt : github.com/yacinebouripro-design/toffolon-refonte.

## Contenu

- Une page = un dossier avec `index.html` (URL propres à slash final) : accueil, 6 prestations, réalisations, histoire, devis, zones, 8 villes, mentions légales
- `assets/site.css`, `assets/site.js` : styles et scripts communs (menu, formulaire de devis en étapes, événements `dataLayer`)
- `partials/` : blocs communs (en-tête, pied de page, formulaire, JSON-LD entreprise) ; `partials/COMPOSANTS.md` = direction artistique, composants et interdits ; `partials/TEMPLATE.txt` = squelette d'en-tête HTML d'une nouvelle page
- `tools/sync.py` : recopie les partials dans toutes les pages entre les marqueurs `<!-- @nom -->` et `<!-- /@nom -->`. À relancer après toute modification d'un partial
- `tools/typo.py` : espaces insécables de la typographie française dans le texte visible (à relancer après édition)
- `sitemap.xml`, `robots.txt` (indexation bloquée tant que c'est une maquette)

## Lancer

- Aperçu `toffolon` (port 3600), ou `python3 -m http.server 3600`

## Règles

- Pas de framework ni de build : HTML statique, les pages restent déployables telles quelles.
- Direction éditoriale (papier chaux, Newsreader + Public Sans, bleu du logo #007ED8) : aucune carte, pastille, coche ou petit titre coloré en majuscules. Suivre `partials/COMPOSANTS.md` et `index.html`.
- Aucun tiret cadratin ni demi-cadratin dans les textes (livrable client).
- N'écrire que des faits issus de l'interview du gérant ou vérifiés (pas d'avis, chiffres ou labels inventés).
- Formulaire : `ENDPOINT` et `ACCESS_KEY` vides dans `assets/site.js` = repli sur un e-mail prérempli. Brancher Web3Forms (ou équivalent) avant la mise en ligne.
- Mise en ligne : passer `robots.txt` en `Allow: /`.
