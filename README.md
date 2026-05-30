from pathlib import Path

content = r"""# SGA DRILLING SRL — MASTER PROJECT BRIEF

# VISIONE DEL PROGETTO

Creare un sito web premium, moderno, immersivo e cinematografico per:

- Scavi
- Perforazioni
- Trivellazioni
- Movimento terra
- Cantieri industriali
- Opere edili specialistiche

Il sito dovrà trasmettere:

- affidabilità
- forza
- precisione
- modernità
- tecnologia
- esperienza professionale

Obiettivo finale:
realizzare un sito memorabile che faccia percepire l’azienda come:
- grande
- strutturata
- seria
- tecnologica
- premium

---

# DIREZIONE CREATIVA

## Mood principale

- industrial cinematic
- realistico
- premium tecnico
- moderno
- immersivo
- potente
- elegante industriale

## Brand perception

L’azienda deve sembrare:
- altamente professionale
- affidabile
- moderna
- tecnologica
- organizzata

## Livello WOW

10/10

## Eleganza

8/10

## Realismo

10/10

## Futuristico

6/10

---

# DESIGN SYSTEM

## Modalità

- dark cinematic mode

## Palette principale

### Colore dominante
- verde industriale profondo (ispirato al logo)

### Secondari
- nero grafite
- grigio cemento
- bianco tecnico
- accenti giallo/oro industriale

## Stile UI

- cinematico
- industriale premium
- minimal moderno
- realistico
- spazioso
- impattante

## Effetti grafici

- glassmorphism leggero
- blur cinematici
- ombre morbide industriali
- effetti polvere
- luci realistiche
- micro animazioni premium

## Navbar

- trasparente
- minimal
- elegante
- effetto blur al scroll

---

# HERO SECTION — ESPERIENZA PRINCIPALE

# CONCEPT CINEMATICO

All’apertura del sito compare:

- un grande cantiere realistico full screen
- macchinari in movimento
- trivelle
- escavatori
- polvere cinematica
- atmosfera industriale realistica

La scena deve sembrare:
- un film industriale premium
- realistico
- immersivo

---

# EFFETTO SCROLL WOW

L’utente usando la rotellina:

- entra lentamente nel cantiere
- la camera avanza cinematicamente
- passa tra i macchinari
- si avvicina a una finestra/cabina/container tecnico

Poi:

## Zoom finale

la camera entra nella finestra.

A quel punto:
- il sito si apre cinematicamente
- compare tutta la presentazione aziendale
- transizione seamless immersiva

Effetto finale:

“Stai entrando dentro SGA Drilling.”

---

# EFFETTI DESIDERATI

- transizioni ultra smooth
- motion cinematico
- camera movement realistici
- parallasse avanzato
- profondità cinematografica
- motion premium stile Apple + industria

---

# STRUTTURA HOMEPAGE

1. Hero cinematico immersivo
2. Presentazione emozionale azienda
3. Servizi principali
4. Showcase macchinari
5. Cantieri realizzati
6. Numeri aziendali
7. Sicurezza e certificazioni
8. Recensioni
9. Google Maps
10. Contatti
11. Footer premium

---

# TECNOLOGIE CONSIGLIATE

## Frontend
- Next.js
- React
- TailwindCSS
- Framer Motion
- GSAP
- Three.js
- React Three Fiber

## Motion & Scroll
- GSAP ScrollTrigger
- Lenis Smooth Scroll

## Rendering
- SSR
- SEO avanzato

---

# OBIETTIVO EMOTIVO

Quando una persona entra nel sito deve pensare:

“Questa azienda è seria, moderna e di altissimo livello.”

Il sito deve creare:
- fiducia
- imponenza
- curiosità
- percezione premium
- autorevolezza
"""

path = Path("/mnt/data/SGA_DRILLING_MASTER_BRIEF.md")
path.write_text(content, encoding="utf-8")

print(f"File creato: {path}")