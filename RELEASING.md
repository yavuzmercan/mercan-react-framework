# Releasing

Mercan UI uses [Changesets](https://github.com/changesets/changesets) for version management and CHANGELOG generation.

## When you make a change

After landing a code change that should ship:

```powershell
npm run changeset
```

This opens an interactive prompt:

1. **Hangi paketi etkiliyor?** → `@yavuzmercan/ui` (shift+space to select)
2. **Hangi tip bump?**
   - `major` — breaking changes (API kaldırma, davranış değişikliği)
   - `minor` — yeni özellikler (yeni komponent, yeni prop)
   - `patch` — bug fix, dokümantasyon, internal refactor
3. **Açıklama:** kısa, kullanıcı bakış açısıyla — CHANGELOG'a düşecek

`.changeset/<random-name>.md` adında bir dosya oluşur. Bu dosyayı **git'e commit et** ve PR'ına dahil et.

## Yayın sırası geldiğinde

Birikmiş changeset'leri tek seferde uygulamak için:

```powershell
npm run version
```

Bu komut:
- `packages/ui/package.json`'da `version` alanını uygun şekilde bump'lar
- `packages/ui/CHANGELOG.md`'ye yeni bölüm ekler (changeset dosyalarındaki açıklamaları toplayıp)
- `.changeset/*.md` dosyalarını siler (kullanıldı, bitti)

Sonra commit + push:
```powershell
git add .
git commit -m "chore: version packages"
git push
```

## npm'e yayınla

```powershell
npm login              # bir kez
npm run release        # build + changeset publish
```

`changeset publish` zaten yayınlanmış sürümleri atlar; bumped olanları npm'e gönderir. `prepublishOnly` script'i sayesinde otomatik test + build çalışır.

2FA açıksa OTP istenir.

## Workflow özeti

```
Code change → npm run changeset → commit changeset.md → PR → merge
                                                              ↓
                              npm run version → commit → npm run release
```

## Bypass etmek istediğinde

Tek bir küçük fix için changeset ekleme zahmeti istemezsen elle de yayınlayabilirsin:

```powershell
cd packages\ui
npm version patch     # 0.1.0 → 0.1.1
cd ..\..
npm run release
```

Ama uzun vadede Changesets workflow'una sadık kalırsan CHANGELOG'un düzenli olur.

## Sürüm semantiği

- `0.x.y` — pre-1.0 dönemi: minor bump'lar breaking olabilir
- `1.0.0` — public API stabilize, semver kuralları aynen uygulanır
- Pre-release tag'leri için: `npm run version -- --snapshot beta` → `0.2.0-beta-20260101`
