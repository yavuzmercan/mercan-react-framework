# Releasing

Mercan UI [Changesets](https://github.com/changesets/changesets) + GitHub Actions ile yarı-otomatik release yapar. Aşağıda **CI-driven** akış (önerilen) ve **manuel** akış var.

---

## CI-driven (önerilen)

### 1. Geliştirme sırasında

Bir PR ile değişiklik gönderiyorsan:

```powershell
npm run changeset
```

İnteraktif soru-cevap:
1. Hangi paket etkileniyor → `@yavuzmercan/ui`
2. Bump tipi:
   - `major` — breaking changes (API kaldırma, davranış değişikliği)
   - `minor` — yeni özellikler (yeni komponent, yeni prop)
   - `patch` — bug fix, dokümantasyon, internal refactor
3. Açıklama — kullanıcı bakış açısıyla, CHANGELOG'a düşecek

`.changeset/<random>.md` üretilir. Bu dosyayı **PR'ına commit et**. CI buna bakacak.

### 2. PR merge → otomatik "Version Packages" PR

Main'e merge olduğu anda `release.yml` workflow'u çalışır. Eğer birikmiş changeset varsa **bot otomatik bir "Version Packages" PR'ı açar** (veya günceller). Bu PR:

- `packages/ui/package.json`'da `version` alanını bump'lar
- `packages/ui/CHANGELOG.md`'ye notları ekler (GitHub linkleri ile)
- `.changeset/*.md` dosyalarını siler

PR'ı incele, beğendiysen merge et.

### 3. "Version Packages" PR merge → otomatik npm publish

Bot main'e bu PR'ı merge ettiğinde, `release.yml` bu sefer changeset bulamaz ve `publish` adımına geçer:

- `npm run build:packages` çalışır (test + build)
- `changeset publish` npm'e push eder
- GitHub'da release notu otomatik oluşur

İşin biter — sürüm npm'de.

### 4. Gerekli secret

CI'nın npm'e push yapabilmesi için bir kez:

1. https://www.npmjs.com/settings/yavuzmercan/tokens → **"Generate New Token"** → **"Automation"** tipi → kopyala
2. https://github.com/yavuzmercan/mercan-react-framework/settings/secrets/actions → **"New repository secret"** → ad: `NPM_TOKEN`, değer: yapıştır

İkinci kez yapmana gerek yok, token expiry'a kadar çalışır.

---

## Manuel (acil/küçük durumlar için)

Tek bir hızlı fix için:

```powershell
npm run changeset                  # changeset oluştur
git add .changeset && git commit -m "<açıklama>"
git push

npm run version                    # versiyon bump + CHANGELOG
git add . && git commit -m "chore: version packages"
git push

npm login                          # bir kez
npm run release                    # build + npm publish
```

---

## Workflow özeti

```
Code change → npm run changeset → commit & PR → merge to main
                                                       ↓
                                        release.yml → "Version Packages" PR açar
                                                       ↓
                                        İncele + merge → release.yml → npm publish
```

## Sürüm semantiği

- `0.x.y` — pre-1.0: minor bump'lar breaking olabilir
- `1.0.0` — public API stabil, semver kuralları aynen
- Pre-release: `npm run version -- --snapshot beta` → `0.2.0-beta-20260101`
