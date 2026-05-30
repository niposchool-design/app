---
name: Nipo Wa
colors:
  surface: '#fdf9f2'
  surface-dim: '#dddad3'
  surface-bright: '#fdf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ec'
  surface-container: '#f1ede6'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e6e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#5c403c'
  inverse-surface: '#31302c'
  inverse-on-surface: '#f4f0e9'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#bf0715'
  primary: '#b70011'
  on-primary: '#ffffff'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4ab'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#894900'
  on-tertiary: '#ffffff'
  tertiary-container: '#ad5d00'
  on-tertiary-container: '#fff6f2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#fdf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e6e2db'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style

The design system is built for a vibrant cultural intersection: Japanese discipline and Brazilian warmth. It serves a dual-language environment where music is the bridge. The brand personality is encouraging, structured yet playful, and deeply rooted in heritage.

The style is **Modern-Tactile with Japanese Minimalist influences**. It leverages a "Paper and Ink" aesthetic—using a warm ivory base reminiscent of washi paper—paired with clean, modern UI elements. To distinguish roles within the school community, the system utilizes a specific "Color + Pattern" logic that applies subtle Japanese geometric motifs (at 5% opacity) to backgrounds, creating a rich but unobtrusive visual texture. Sumi-e brush strokes are used sparingly as decorative accents to add movement and an organic, handcrafted feel to the digital experience.

**Target Audience:** Children and teens (7-17), their families, and music educators.
**Emotional Response:** Belonging, focus, rhythmic energy, and cultural pride.

## Colors

The palette is defined by role-based signaling while maintaining a unified "Japanese Red" core for the school's primary identity.

- **Primary (Student):** Red (#dc2626) represents energy and the sun.
- **Secondary (Teacher):** Blue (#0284c7) represents wisdom and the sea.
- **Tertiary (Family):** Amber (#d97706) represents support and the earth.
- **Admin:** Purple (#7c3aed) is reserved strictly for administrative functions.
- **Background:** Ivory (#fbf7f0) provides a soft, low-strain canvas compared to pure white.
- **Accent:** Sakura Pink (#FF6B9D) is used exclusively for decorative micro-interactions or "praise" moments (e.g., a tiny flower blooming on task completion).

**Pattern Mapping:**
- **Red Roles:** Asanoha (Hemp leaf) for growth.
- **Blue Roles:** Seigaiha (Waves) for flow.
- **Purple Roles:** Sayagata (Interlocking keys) for order.
- **Amber Roles:** Kikko (Tortoise shell) for longevity.

## Typography

This design system uses a functional pairing designed for clarity and musical precision. 

**Inter** handles all narrative and UI text, ensuring high legibility for students and families. **JetBrains Mono** is employed for all technical and quantitative data—BPM (Batidas por Minuto), timestamps, practice durations, and point tallies. This monospaced choice reflects the precision of musical notation and technical practice.

All headings should use a tight letter-spacing for a modern, confident look. Body text remains open and accessible. All UI labels must be in Portuguese (BR).

## Layout & Spacing

The layout follows a **Fluid Grid** logic with generous internal padding to maintain a "zen" sense of space. 

- **Grid:** 12-column system for desktop, 4-column for mobile.
- **Rhythm:** An 8px base unit (2 units of 4px) governs all spacing to ensure mathematical harmony.
- **Margins:** Desktop views utilize large 32px side margins to center focus; mobile views use 16px to maximize real estate for musical scores or practice schedules.
- **Vertical Rhythm:** Spacing between sections should be ample (48px+) to prevent the UI from feeling cluttered, encouraging a calm learning environment.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** rather than heavy shadows. 

1. **Base Layer:** Ivory (#fbf7f0) or Gray-50 background.
2. **Surface Layer:** White (#ffffff) cards with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)) and role-specific pattern overlays at 5% opacity.
3. **Interactive Layer:** Elements like buttons use a slightly more pronounced shadow to indicate "pressability."

Sumi-e brush strokes should be treated as "Z-index 0" elements—they sit behind the content but above the background paper, often bleeding off the edges of the screen to create a sense of infinite canvas.

## Shapes

The shape language is **Softly Geometric**. 

Standard elements (cards, input fields, containers) use a **12px to 16px radius**. This high roundedness removes "sharpness" from the educational environment, making the software feel approachable for younger students. 

Iconography should be contained within circular frames when used for primary actions (like the "Musical Note" primary brand icon). Sumi-e elements provide the only "irregular" shapes in the system, acting as a counterpoint to the structured grid.

## Components

### Buttons
- **Primary:** Solid Red (#dc2626) with White text. Rounded (12px).
- **Secondary:** Outlined Red with a 2px stroke.
- **Role-based:** For teacher-specific or family-specific actions, the primary color shifts to Blue or Amber respectively.
- **Focus State:** 3px offset ring in the role's primary color.

### Role Cards
Containers that display role-specific data (e.g., "Minha Prática") must feature the corresponding Japanese pattern (Asanoha for students) as a subtle background texture.

### Inputs & Progress
- **Input Fields:** Thick 2px borders in Gray-200, turning Red/Blue/Amber on focus. 
- **Progress Bars:** Use a thick stroke that resembles a horizontal brush mark.
- **BPM/Time Displays:** Always rendered in JetBrains Mono for a "digital metronome" feel.

### Specialized Components
- **The "Enso" Badge:** A circular red badge containing a white musical note, used for achievement milestones or the main "Start Practice" (Iniciar Prática) trigger.
- **Patterned Dividers:** Instead of simple lines, use a thin strip of the Seigaiha (wave) pattern to separate sections in the teacher portal.