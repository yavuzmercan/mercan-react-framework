# Releasing

Bu dosya `@yavuzmercan/ui` paketini yayına gönderme akışını anlatır. **Otomatik yayın** (CI-driven) varsayılan yöntemdir; manuel yayın acil durumlar için.

---

## Günlük akış — kopyala/yapıştır

Her değişiklik için izleyeceğin sıra:

```powershell
# 1. Remote'tan son hali çek (bot'un Version Packages PR merge'leri varsa lokal'e gelir)
git pull

# 2. Kod değişikliklerini yap
# ...editör'de düzenle, dosya ekle/çıkar...

# 3. Lokalde test + typecheck (opsiyonel ama önerilir)
npm test
npm run typecheck

# 4. Changeset oluştur — değişikliği kullanıcıya nasıl anlatacağını yaz
npm run changeset

# 5. Tüm değişiklikleri stage'le (kod + .changeset/<random>.md)
git add .

# 6. Commit
git commit -m "feat: ..."

# 7. Push
git push
```

**Bittin.** Gerisi GitHub'da otomatik. Aşağıdaki "Push'tan sonra ne olur" bölümüne bak.

---

## `npm run changeset` — interaktif sorulara ne yazacağın

`npm run changeset` koşturduğunda 3 soru gelir. Klavye kontrolleri:

### Soru 1: Hangi paketleri etkiliyor?
```
🦋  Which packages would you like to include? …
   ↑/↓ arrows · space to select · enter to confirm
   ◯ @yavuzmercan/ui
```

`Space` ile `@yavuzmercan/ui`'yi seç → `Enter`.

### Soru 2: Bump tipi
```
🦋  Which packages should have a major bump? …
🦋  Which packages should have a minor bump? …
🦋  The following packages will be patch bumped:
🦋    @yavuzmercan/ui@0.3.1
```

Karar matrisi:

| Tip | Ne zaman | Sürüm değişimi |
|---|---|---|
| **patch** | Bug fix, dokümantasyon, internal refactor | `0.3.0 → 0.3.1` |
| **minor** | Yeni komponent, yeni prop, yeni özellik (backwards-compatible) | `0.3.0 → 0.4.0` |
| **major** | Breaking change (API kaldırma, prop adı değişimi, davranış değişimi) | `0.3.0 → 1.0.0` |

> Pre-1.0 dönemde (şu anki gibi) minor bump da breaking olabilir — kullanıcılar lock'larken `^0.x` yerine `~0.3.0` yazmalı.

Major/minor istemediğin paketleri Enter ile geç (varsayılan patch).

### Soru 3: Özet (kullanıcı için CHANGELOG'a düşecek)
```
🦋  Please enter a summary for this change (this will be in the changelogs).
🦋    Submit empty line to open external editor
```

İki türlü yazabilirsin:
- **Tek satır:** kısa, doğrudan yaz, Enter
- **Çok satır:** boş Enter → editör açılır → markdown'la uzun açıklama yaz, kaydet/kapat

İyi summary örnekleri:
```
fix: PasswordInput artık `autoComplete` prop'unu doğru iletiyor
```
```
feat: Combobox'a `clearable` prop'u eklendi — input sağında X butonu ile değer sıfırlanabilir
```
```
fix: Modal escape tuşu `closeOnEsc={false}` iken de tetikleniyordu
```

İyi olmayan:
```
düzelttim
update
fix
```

Bittiğinde `.changeset/<random-isim>.md` adında bir dosya oluşur. Bu dosyayı `git add .` ile commit'e dahil etmen şart — bot bunu okuyor.

---

## Push'tan sonra ne olur (otomatik akış)

```
git push
   ↓
release.yml CI tetiklenir (1-2 dakika)
   ↓
.changeset/*.md var mı kontrol eder
   ↓
   ├─ VAR  → "Version Packages" PR'ı açar/günceller
   │         (package.json bump'lar, CHANGELOG yazar, .changeset siler)
   │         Sen GitHub'da bu PR'ı incele + merge et
   │         ↓
   │         release.yml tekrar tetiklenir
   │         ↓
   │         changeset YOK → "yayınlanmamış sürüm var mı?"
   │         ↓
   │         npm publish + GitHub Release otomatik
   │
   └─ YOK  → "yayınlanmamış sürüm var mı?" diye bakar
             yoksa hiçbir şey yapmaz
```

### Sen ne zaman GitHub'a girersin

İki an:

1. **PR review:** Bot "Version Packages" PR'ı açtığında `Pull Requests` sekmesine git, içeriğini incele:
   - Beklediğin sürüm bump'ı var mı?
   - CHANGELOG.md'ye doğru özet eklenmiş mi?
   - Paket dependency'leri doğru güncellenmiş mi (apps tarafı vs.)?
   - Onaylıyorsan **Merge**.

2. **Yayın doğrulama:** Merge sonrası `Actions` sekmesinde `Release` workflow'unu izle:
   - Yeşil → npm'e push edildi.
   - https://www.npmjs.com/package/@yavuzmercan/ui sayfasında yeni sürüm 1-2 dakika içinde görünür.
   - GitHub'da `Releases` sekmesinde otomatik release notu var.

---

## Akışı bozmamak için kurallar

❌ **Yerelde `npm run version` koşturma.**  
Bot'un işini elinden alır, "Version Packages" PR'ı açılmaz, CHANGELOG'lar dağılır.

❌ **Yerelde `npm run release` koşturma** (artık).  
Sadece çok acil durumlarda — manuel yayın bölümüne bak.

❌ **`.changeset` klasörünü `.gitignore`'a ekleme.**  
Bot bu klasörü okuyor; gizlenirse otomatik akış çalışmaz.

❌ **Push öncesi `git pull` atlamak.**  
Bot main'e commit attığı için lokalin geride kalmış olabilir; pull'suz push reject olur.

✅ **Her değişiklikten önce `git pull`.**  
Ana branch'in son halini al, sonra çalış.

✅ **Bir PR = bir changeset (genelde).**  
Birkaç PR'ın bump'ları biriktiyse `npm run version` sonucu hepsi tek release'te toplanır.

---

## Acil manuel yayın (sadece CI'ı bypass etmen gerekirse)

Senaryo: CI bozuk, hızlı bir hotfix'i yayına almalısın.

```powershell
git pull
# kod değişikliği yap
npm run changeset       # patch seç, açıklama yaz
npm run version         # SÜRÜMÜ YEREL'DE BUMP ETME — sadece zorunluysa
npm run release         # build + npm publish (lokal token'ınla)
git add . && git commit -m "chore: emergency publish 0.x.y"
git push
```

> Bu yolu kullandığında CI'a "ben yaptım" demek için bir sonraki normal push'unda `.changeset` klasörü temiz olmalı. Bot pending changeset bulamazsa "yayınlanacak sürüm var mı?" diye bakar — yayında olduğunu görüp pas geçer.

---

## CI ön-koşulları (bir kez yapılır)

Eğer CI hiç publish yapamıyorsa bunlar eksiktir:

1. **`NPM_TOKEN` secret** — Classic Automation tipi token
   - https://www.npmjs.com/settings/yavuzmercan/tokens/new-classic
   - Type: **Automation** (2FA bypass eder)
   - Üret, kopyala, GitHub'a `NPM_TOKEN` adıyla ekle:
   - https://github.com/yavuzmercan/mercan-react-framework/settings/secrets/actions

2. **Workflow permissions**
   - https://github.com/yavuzmercan/mercan-react-framework/settings/actions
   - Aşağı kaydır → "Workflow permissions"
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

3. **Workflow dosyaları repoda olmalı** (`.github/workflows/ci.yml` ve `release.yml`)

---

## Sürüm semantiği

`0.x.y` — pre-1.0 dönemi: minor bump'lar breaking olabilir.  
`1.0.0` — public API stabil, semver kuralları aynen geçerli.

Pre-release tag'leri için (örn. beta):
```powershell
npx changeset pre enter beta
# normal akış (changeset + version + release)
npx changeset pre exit         # beta dönemini bitir
```

---

## Hızlı referans — sadece komutlar

```powershell
# Standart akış
git pull
# ...kod değişikliği...
npm run changeset           # patch / minor / major + açıklama
git add .
git commit -m "feat: ..."
git push
# ↑ GitHub'da bot Version PR açar → merge et → otomatik publish

# Test
npm test
npm run typecheck

# Build (lokal kontrol)
npm run build:packages

# Acil manuel yayın
npm run version
npm run release
```
