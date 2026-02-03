# 🔚 Quick Reference - "Fin de Session"

## Comment l'utiliser ?

### Avec GitHub Copilot Chat

Simplement taper dans le chat :

```
fin de session
```

Copilot va automatiquement :
1. ✅ Vérifier le code
2. 🔍 Lancer lint + build
3. 🐛 Corriger les erreurs
4. 📊 Faire la review
5. ⚡ Optimiser
6. 💾 Committer
7. 📝 Rapport complet

---

## Avec le script bash (démo)

```bash
./scripts/fin-de-session.sh
```

Ce script démontre le workflow que Copilot exécutera.

---

## Checklist automatique

- [ ] TypeScript sans erreurs
- [ ] ESLint sans erreurs
- [ ] Imports corrects
- [ ] Types définis
- [ ] "use client" si nécessaire
- [ ] API routes avec try/catch
- [ ] Pas de console.log
- [ ] Performance optimisée
- [ ] Variables d'env sécurisées
- [ ] Code review complet

---

## Rapport généré

```markdown
## 🎯 RAPPORT DE FIN DE SESSION

✅ Build : PASS
✅ Linting : PASS
✅ TypeScript : 0 erreurs
✅ Optimisations appliquées

📦 Commit créé avec succès
```

---

## Commandes manuelles (si besoin)

```bash
# Vérifier l'état
git status

# Linter
npm run lint

# Build
npm run build

# Commit
git add .
git commit -m "feat: description"
git push
```

---

## Aide

Voir documentation complète : `FIN_DE_SESSION_GUIDE.md`

Instructions Copilot : `.copilot-instructions.md` (section "FIN DE SESSION")

---

**Version :** 1.0.0  
**Date :** 3 février 2026
