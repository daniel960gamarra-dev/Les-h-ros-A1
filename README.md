# FLE 7e – Atelier d'Étude Interactif (Présent & Compréhension)

Application web interactive d'étude et de préparation à l'examen cumulatif de français (7e année FLE débutants – I période 2026-2027).

---

## 🎯 Contenu Pédagogique

1. **Partie 1 – Fiches & Règles Interactives :**
   - Conjugaison interactive de **ÊTRE**, **AVOIR** et des **verbes en -er** (modèle *PARLER*).
   - Laboratoire des 14 verbes en *-er* de l'atelier (*aimer, adorer, habiter, étudier, travailler, regarder, écouter, jouer, porter, aider, rester, arriver, chanter, détester*).
   - Les 3 règles d'or (élision *j'*, homophonie *il parle / ils parlent*, exprimer l'âge avec *avoir*).
   - Vocabulaire thématique sonorisé : Les héros, les qualités, les défauts, les connecteurs logiques.

2. **Partie 4 – Exercices de Grammaire (Ex. 1 à 8) :**
   - **Ex. 1 :** QCM (10 questions) avec feedback immédiat et explications.
   - **Ex. 2 :** Verbe ÊTRE (8 phrases).
   - **Ex. 3 :** Verbe AVOIR (8 phrases).
   - **Ex. 4 :** Verbes en -er (10 phrases).
   - **Ex. 5 :** Être ou Avoir (8 phrases).
   - **Ex. 6 :** Détective d'erreurs (8 phrases à corriger).
   - **Ex. 7 :** Puzzle de mots pour reconstituer les phrases (5 phrases).
   - **Ex. 8 :** Le texte de Léa (10 formes verbales).
   - Corrigé officiel conforme à la page 8 du PDF.

3. **Jeux & Défis Ludiques :**
   - **Duel Chrono (Speed Conjugaison) :** 30 secondes pour trouver la bonne forme et réaliser des combos.
   - **Memory des Héros :** Paires vocabulaire français ↔ espagnol.
   - **Générateur de Super-Héros :** Création d'une fiche d'identité de super-héros avec paragraphe rédigé prêt pour l'oral ou la production écrite.

4. **Partie 2 – Compréhension Écrite (11 points) :**
   - Texte officiel : *« Des modèles pour tous : de l'imaginaire à la réalité »* (Mulan, Spider-Man, Frida Kahlo, Lionel Messi).
   - Narration audio phrase par phrase.
   - 7 questions d'évaluation (VRAI/FAUX avec justification, QCM, réponses complètes) avec barème officiel et corrigé.

5. **Partie 3 – Production Écrite (8 points) :**
   - Analyse du modèle de Lucas Ferreira (104 mots).
   - Éditeur interactif avec compteur de mots en direct (objectif : 100 mots minimum).
   - Détection automatique de la 1re personne, des verbes être/avoir, des verbes en *-er* et des connecteurs.
   - Liste de contrôle officielle (Page 4).

6. **Compréhension Orale :**
   - **Support 1 :** *Valérie se présente (Québec / France)* – [Le Point du FLE](https://www.lepointdufle.net/ressources_fle/audio_valerie-se-presente.htm).
   - **Support 2 :** *Victor Hugo – Biographie & Poème « Demain, dès l'aube »* – [Podcast Français Facile](https://www.podcastfrancaisfacile.com/texte/victor_hugo-1.html).
   - Lecteur audio intégré (vitesse réglable 0.75x, 0.85x, 1.0x), mode écoute active (transcription masquable), repères culturels et quiz de compréhension.

7. **Simulation d'Examen Blanc :**
   - Note sur 29 points convertie sur 5.0 (Colombie) et sur 20 (France).
   - Sujet imprimable avec nom de l'élève et date.

---

## 🚀 Déploiement sur GitHub & Vercel

### 1. Cloner ou initialiser le dépôt Git
```bash
git init
git add .
git commit -m "Initial commit - Atelier FLE 7e"
```

### 2. Pousser vers GitHub
Créez un dépôt sur GitHub et liez-le :
```bash
git remote add origin https://github.com/VOTRE_UTILISATEUR/fle-7e-atelier.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel
1. Connectez-vous sur [vercel.com](https://vercel.com).
2. Cliquez sur **"Add New Project"** -> **"Import Git Repository"**.
3. Sélectionnez le dépôt `fle-7e-atelier`.
4. Vercel détecte automatiquement le projet **Vite** (`npm run build`, dossier `dist`).
5. Cliquez sur **"Deploy"**. Votre site est en ligne en quelques secondes !
