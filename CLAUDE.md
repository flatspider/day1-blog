You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

# Portfolio Project

A minimalist, museum-aesthetic personal portfolio with subtle organic tension.

## Design Philosophy

**Museum Aesthetic with Subtle Tension**: The design draws from gallery spaces - generous whitespace, careful typography, and deliberate restraint. But beneath the calm surface, Conway's Game of Life creates organic, unpredictable movement that breathes life into the minimalism. The cool teal cells against the warm cream background create inherent visual tension.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS Variables** - Design tokens

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ConwayBackground.jsx  # Game of Life canvas animation
│   │   └── ConwayBackground.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Work.jsx
│   │   ├── Writing.jsx
│   │   └── About.jsx
│   ├── App.jsx         # Main layout with nav/footer
│   ├── App.css         # Layout styles
│   ├── index.css       # Global styles & design tokens
│   └── main.jsx        # Entry point
├── public/
├── index.html
└── package.json
```

## Design System

### Colors

| Variable              | Value                    | Usage                        |
| --------------------- | ------------------------ | ---------------------------- |
| `--color-bg`          | #faf9f7                  | Main background (warm white) |
| `--color-bg-alt`      | #f5f3f0                  | Secondary backgrounds        |
| `--color-text`        | #1a1a1a                  | Primary text                 |
| `--color-text-muted`  | #6b6b6b                  | Secondary text               |
| `--color-text-light`  | #999999                  | Tertiary text                |
| `--color-accent`      | #2d2d2d                  | Emphasis                     |
| `--color-border`      | #e8e6e3                  | Borders/dividers             |
| `--color-cool-accent` | rgba(100, 140, 160, 0.2) | Conway cells                 |

### Typography

- **Headings**: Cormorant Garamond (serif), weight 300, tight letter-spacing
- **Body**: Inter (sans-serif), weight 300, generous line-height (1.7)

### Spacing Scale

- `--space-xs`: 0.5rem
- `--space-sm`: 1rem
- `--space-md`: 2rem
- `--space-lg`: 4rem
- `--space-xl`: 8rem
- `--space-2xl`: 12rem

## Key Components

### ConwayBackground

Full-viewport canvas running Conway's Game of Life:

- ~25px cell grid with 15% initial density
- 250ms tick interval for contemplative movement
- Cells fade in/out over 3 frames
- Cursor proximity effect intensifies nearby cells
- Subtle parallax on scroll (0.1x rate)
- Pauses when tab is hidden
- `pointer-events: none` preserves all interactions

### Pages

- **Home**: Hero section with animated entrance
- **Work**: Project showcase grid
- **Writing**: Blog/article listing
- **About**: Bio and contact information

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design Principles

1. **Restraint over excess** - Every element earns its place
2. **Organic movement** - The Game of Life adds life without demanding attention
3. **Tension through contrast** - Cool cells against warm background
4. **Generous space** - Emptiness is a design element
5. **Subtle interaction** - Hover states and cursor effects reward exploration
