# Composants du site Toffolon

Direction : une monographie d'artisan imprimée, pas un site « template ». Papier chaux, encre, filets fins, serif Newsreader pour lire, Public Sans pour l'interface, le bleu du logo comme seul accent. Page de référence : `index.html`.

## Interdits (ils font « site généré »)
- Pas de petit titre en majuscules colorées au-dessus des titres (ancienne classe `eyebrow`).
- Pas de grilles de cartes identiques, de pastilles (`badge`), de listes à coches, de bandeau de chiffres, d'icônes décoratives, d'étoiles.
- Pas de hero sombre en dégradé, pas de formulaire posé dans le hero, pas de bandeau bleu pleine largeur.
- Pas de titres moules : « Pourquoi nous choisir », « Ce que vous pouvez attendre de nous », « Nos valeurs », « Notre engagement », « Votre projet en X étapes », « X : Y » en série.
- Pas de formules creuses : sur-mesure, clé en main, de A à Z, sans compromis, accompagnement personnalisé, votre satisfaction est notre priorité, n'hésitez pas, solutions, expertise reconnue.
- Pas plus d'une liste à puces par section ; préférer des paragraphes.

## Squelette d'une page
```html
<main id="contenu" data-preset="Ravalement de façade">   <!-- data-preset facultatif -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <nav class="crumbs" aria-label="Fil d'Ariane"><ol><li><a href="/">Accueil</a></li><li aria-current="page">Ravalement de façade</li></ol></nav>
        <p class="kicker">phrase courte en italique, lieu ou date</p>
        <h1 class="h1">Titre principal avec le mot-clé</h1>
        <p class="lede">Deux ou trois phrases concrètes.</p>
        <div class="actions">
          <a class="btn" href="#devis-form">Demander une visite</a>
          <a class="tel" href="tel:+33148502455" data-loc="hero"><small>ou appelez-nous</small><span>01 48 50 24 55</span></a>
        </div>
        <p class="mentions"><span>Qualibat RGE</span><span>Adhérent FFB</span><span>Garantie décennale</span></p>
      </div>
      <figure class="plate hero-plate"><img src="..." alt="..." width="960" height="1200" fetchpriority="high" /><figcaption>Légende sobre, jamais attribuée à un chantier précis.</figcaption></figure>
    </div>
  </section>

  <section class="demande" id="demande">               <!-- juste après le hero sur les pages commerciales -->
    <div class="wrap demande-grid">
      <div class="demande-text"><h2 class="h2">...</h2><p>...</p><a class="tel" ...>...</a></div>
<!-- @quote-form --><!-- /@quote-form -->
    </div>
  </section>

  <section class="section">...</section>                <!-- sections séparées par un filet -->
  <section class="section section--chaux2">...</section>  <!-- fond chaux plus soutenu, avec parcimonie -->
  <section class="section section--ardoise">...</section> <!-- une seule section sombre par page au plus -->
</main>
```

## En-tête de section
```html
<header class="sh"><h2 class="h2">Titre</h2><p>Introduction courte à droite.</p></header>
<header class="sh sh--solo"><h2 class="h2">Titre seul</h2></header>
```

## Colonnes
`cols` (1/1), `cols cols--7-5`, `cols cols--5-7`, `cols--center`, `cols-3`. Tout passe sur une colonne sous 900 px.

## Texte long
```html
<div class="prose">
  <p class="lede">Premier paragraphe plus grand.</p>
  <h2>Intertitre (filet au-dessus)</h2><p>...</p>
  <h3>Sous-titre</h3><p>...</p>
  <ul><li>puces carrées sienne</li></ul>
  <figure class="plate"><img ... /><figcaption>...</figcaption></figure>
</div>
```
Page avec colonne latérale : `<div class="wrap page"><div class="prose">...</div><aside class="page-aside"><div class="aside-bloc">...</div></aside></div>`.

## Composants
- Sommaire de liens (prestations, pages liées) : `<ul class="index"><li><a href="/x/"><span class="index-t">Titre</span><span class="index-d">Description</span><span class="index-f" aria-hidden="true">&rarr;</span></a></li></ul>`
- Fiches de chantier : `<div class="fiches"><article class="fiche"><p class="fiche-lieu">Ville</p><h3>Titre</h3><p>...</p><dl class="fiche-data"><div><dt>Surface</dt><dd>150 m²</dd></div></dl></article></div>`
- Déroulé ou comparatif : `<table class="ledger">` avec `<thead>`, des `<th scope="row">` (avec `<span class="n">1</span>`), et `data-label` sur les `<td>` pour le mobile.
- Chronologie : `<ol class="chrono"><li><time>1960</time><div><h3>...</h3><p>...</p></div></li></ol>`
- Références : `<div class="cols-3"><div class="credits"><h3>Catégorie</h3><ul><li>...</li></ul></div></div>`
- Citation : `<blockquote class="pull">«&nbsp;...&nbsp;»</blockquote><p class="pull-by">Auteur, contexte</p>`
- Avis : bloc `.avis` (voir l'accueil), sans étoiles, mention « avis Google, 5 sur 5 ».
- Lettre ou mot signé : `<div class="letter"><p>...</p><p class="signature"><strong>Nom</strong><span>fonction</span></p></div>` (uniquement avec des propos réels du gérant).
- Note en marge : `<div class="note"><p><strong>Début en gras.</strong> Suite.</p></div>`
- Époques : `.epoques > .epoque > .epoque-date + h3 + p + ul`.
- Villes : `<ul class="villes"><li><a href="/x/">Ville</a></li></ul>` (séparées par des points).
- Questions : `<div class="qa"><details><summary>Question ?</summary><div class="answer"><p>...</p></div></details></div>`
- Boutons : `btn` (bleu), `btn btn--encre`, `btn btn--trait`. Lien d'action : `<a class="lien" href="...">texte</a>` (flèche ajoutée par le CSS).
- Téléphone mis en avant : `<a class="tel" href="tel:+33148502455" data-loc="..."><small>libellé</small><span>01 48 50 24 55</span></a>`
- Mentions de qualification : `<p class="mentions"><span>...</span><span>...</span></p>`
- Utilitaires : `mt-s`, `mt-m`, `mt-l`, `mt-xl`, `muted`, `small`, `h1`, `h2`, `h3`, `lede`, `kicker`.

## Écriture
Voix de l'entreprise (« nous ») et, en citation, celle de Jean-Marc Toffolon. Phrases de longueurs variées, détails concrets tirés de l'interview (vélo, échelle, sondage des supports, chaux, meulière, camionnettes, échafaudages, chantiers réels), pas de triades d'adjectifs. Les titres disent quelque chose de précis.
