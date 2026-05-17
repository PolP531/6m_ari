# 6 mesos — Pàgina web per a l'Ariadna

Estructura de fitxers senzilla per pujar a GitHub Pages.

## Fitxers

```
├── index.html   ← tota l'estructura de la pàgina
├── style.css    ← tots els estils
├── script.js    ← comptador de temps, menú mòbil, animacions
├── fotos/       ← (crea aquesta carpeta) posa aquí les fotos
└── README.md
```

---

## Com personalitzar-ho

### 1. Data d'inici
Obre `script.js` i canvia la primera línia:
```js
const START_DATE = new Date('2024-12-01T00:00:00');
```
Posa la data real en format `AAAA-MM-DD`.

---

### 2. Fotos
Crea una carpeta `fotos/` i posa-hi les imatges.
Després a `index.html`, substitueix els blocs `photo-placeholder` per:
```html
<img src="fotos/nom-foto.jpg" alt="descripció breu" />
```

**Consell:** fes les fotos d'un pes raonable (< 500 KB cadascuna) per a càrrega ràpida.

---

### 3. Secció "Tu" — Foto de l'Ariadna
Busca el comentari `<!-- Substitueix per la teva foto -->` i canvia:
```html
<div class="photo-placeholder"><span>Foto d'Ariadna</span></div>
```
per:
```html
<img src="fotos/ariadna.jpg" alt="Ariadna" />
```

---

### 4. Cançons — Enllaç a Spotify/YouTube
Busca la `song-card` amb `→` i afegeix l'href real:
```html
<a href="https://open.spotify.com/playlist/..." class="stretched-link" target="_blank" rel="noopener"></a>
```

---

### 5. Colors
Si vols canviar l'accent daurador, obre `style.css` i modifica:
```css
--accent:  #c8a96e;  /* color principal */
--accent2: #8c6a3f;  /* color secundari */
```

---

## Com pujar a GitHub Pages

1. Crea un repositori a GitHub (pot ser privat o públic).
2. Puja tots els fitxers (index.html, style.css, script.js, fotos/).
3. Ves a **Settings → Pages**.
4. A "Source" selecciona la branca `main` i la carpeta `/root`.
5. Guarda. En uns minuts tindrà URL del tipus: `https://el-teu-usuari.github.io/nom-repo/`

---

## Estructura de seccions

| # | ID | Contingut |
|---|-----|-----------|
| 01 | `#tu` | Descripció de l'Ariadna + foto + tags |
| 02 | `#nosaltres` | Línia del temps dels 6 mesos |
| 03 | `#frase` | Cita o text motivacional |
| 04 | `#cancons` | Playlist de cançons |
| 05 | `#fotos` | Galeria de fotos |
| 06 | `#etc` | Coses vàries + missatge final |
