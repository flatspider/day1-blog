// Conway's Game of Life Pattern Detector
// Detects common patterns and returns absurdist descriptions + cell coordinates

// Pattern definitions: 2D arrays where 1 = alive, 0 = dead
// Each pattern includes all rotations/reflections as variations

const PATTERNS = {
  // Still Lifes (period 1)
  block: {
    name: 'Block',
    description: "Refuses to change. Relatable.",
    type: 'still',
    variations: [
      [[1, 1], [1, 1]]
    ]
  },
  beehive: {
    name: 'Beehive',
    description: "No bees were harmed. The cells, however...",
    type: 'still',
    variations: [
      [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]],
      [[0, 1, 0], [1, 0, 1], [1, 0, 1], [0, 1, 0]]
    ]
  },
  loaf: {
    name: 'Loaf',
    description: "Fresh from the void bakery.",
    type: 'still',
    variations: [
      [[0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 0]],
      [[0, 0, 1, 0], [0, 1, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
      [[0, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]],
      [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 1, 0], [0, 1, 0, 0]]
    ]
  },
  boat: {
    name: 'Boat',
    description: "Going nowhere. Living its best life.",
    type: 'still',
    variations: [
      [[1, 1, 0], [1, 0, 1], [0, 1, 0]],
      [[0, 1, 1], [1, 0, 1], [0, 1, 0]],
      [[0, 1, 0], [1, 0, 1], [1, 1, 0]],
      [[0, 1, 0], [1, 0, 1], [0, 1, 1]]
    ]
  },
  tub: {
    name: 'Tub',
    description: "It's not a phase, mom.",
    type: 'still',
    variations: [
      [[0, 1, 0], [1, 0, 1], [0, 1, 0]]
    ]
  },

  // Oscillators (period 2)
  blinker: {
    name: 'Blinker',
    description: "Having a normal one.",
    type: 'oscillator',
    variations: [
      [[1, 1, 1]],
      [[1], [1], [1]]
    ]
  },
  toad: {
    name: 'Toad',
    description: "Ribbit (it doesn't actually ribbit).",
    type: 'oscillator',
    variations: [
      [[0, 1, 1, 1], [1, 1, 1, 0]],
      [[0, 1], [1, 1], [1, 1], [1, 0]],
      [[1, 1, 1, 0], [0, 1, 1, 1]],
      [[1, 0], [1, 1], [1, 1], [0, 1]]
    ]
  },
  beacon: {
    name: 'Beacon',
    description: "Trying to get your attention. Desperately.",
    type: 'oscillator',
    variations: [
      [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 1], [0, 0, 1, 1]],
      [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]]
    ]
  },

  // Spaceships
  glider: {
    name: 'Glider',
    description: "On its way to your DMs.",
    type: 'spaceship',
    variations: [
      [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
      [[1, 0, 0], [1, 0, 1], [1, 1, 0]],
      [[1, 1, 1], [1, 0, 0], [0, 1, 0]],
      [[0, 1, 1], [1, 0, 1], [0, 0, 1]],
      [[0, 1, 0], [1, 0, 0], [1, 1, 1]],
      [[1, 1, 0], [1, 0, 1], [1, 0, 0]],
      [[1, 1, 1], [0, 0, 1], [0, 1, 0]],
      [[0, 0, 1], [1, 0, 1], [0, 1, 1]]
    ]
  }
}

// Absurdist descriptions for dead/empty cells
const DEAD_CELL_DESCRIPTIONS = [
  { name: 'The Void', description: "The Void Stares Back" },
  { name: 'Nothing', description: "It Knew Too Much" },
  { name: 'Empty', description: "Gone But Not Forgotten (Forgotten)" },
  { name: 'Void', description: "Existential Dread Zone" },
  { name: 'Absence', description: "This cell has left the chat" },
  { name: 'Nothing', description: "Peak minimalism" },
  { name: 'Zero', description: "Division by this is forbidden" },
  { name: 'Null', description: "undefined behavior" },
  { name: 'Nada', description: "Spanish for 'also nothing'" },
  { name: 'Emptiness', description: "Marie Kondo was here" }
]

/**
 * Extract a neighborhood from the grid around a given position
 */
function extractNeighborhood(grid, row, col, rows, cols, size) {
  const half = Math.floor(size / 2)
  const neighborhood = []

  for (let i = -half; i <= half; i++) {
    const neighborRow = []
    for (let j = -half; j <= half; j++) {
      const r = row + i
      const c = col + j
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        neighborRow.push(grid[r][c] ? 1 : 0)
      } else {
        neighborRow.push(0)
      }
    }
    neighborhood.push(neighborRow)
  }
  return neighborhood
}

/**
 * Check if a pattern exists at a position and return matched cells
 */
function matchPatternAtPosition(neighborhood, pattern, startRow, startCol, centerRow, centerCol, half) {
  const patternRows = pattern.length
  const patternCols = pattern[0].length
  const cells = []

  for (let i = 0; i < patternRows; i++) {
    for (let j = 0; j < patternCols; j++) {
      const nRow = startRow + i
      const nCol = startCol + j
      if (nRow < 0 || nRow >= neighborhood.length ||
          nCol < 0 || nCol >= neighborhood[0].length) {
        return null
      }
      if (neighborhood[nRow][nCol] !== pattern[i][j]) {
        return null
      }
      // If this is a live cell, record its grid position
      if (pattern[i][j] === 1) {
        cells.push({
          row: centerRow - half + nRow,
          col: centerCol - half + nCol
        })
      }
    }
  }
  return cells
}

/**
 * Search for a pattern anywhere in the neighborhood and return cell coordinates
 */
function findPatternInNeighborhood(neighborhood, patternDef, centerRow, centerCol, half) {
  for (const variation of patternDef.variations) {
    const patternRows = variation.length
    const patternCols = variation[0].length

    // Try each starting position
    for (let startRow = 0; startRow <= neighborhood.length - patternRows; startRow++) {
      for (let startCol = 0; startCol <= neighborhood[0].length - patternCols; startCol++) {
        const cells = matchPatternAtPosition(neighborhood, variation, startRow, startCol, centerRow, centerCol, half)
        if (cells) {
          return cells
        }
      }
    }
  }
  return null
}

/**
 * Detect pattern at or near the cursor position
 * @returns {Object|null} - Pattern info with cells array for highlighting
 */
export function detectPattern(grid, row, col, rows, cols) {
  // Check if cursor is on a live cell
  const isOnLiveCell = row >= 0 && row < rows && col >= 0 && col < cols && grid[row][col]

  // If on dead cell, return random absurdist description (no cells to highlight)
  if (!isOnLiveCell) {
    // Only show dead cell tooltip occasionally (10% chance) to not be annoying
    if (Math.random() > 0.1) {
      return null
    }
    const randomDesc = DEAD_CELL_DESCRIPTIONS[Math.floor(Math.random() * DEAD_CELL_DESCRIPTIONS.length)]
    return {
      name: randomDesc.name,
      description: randomDesc.description,
      type: 'dead',
      cells: []
    }
  }

  // Extract a 7x7 neighborhood centered on cursor
  const size = 7
  const half = Math.floor(size / 2)
  const neighborhood = extractNeighborhood(grid, row, col, rows, cols, size)

  // Check each pattern type
  for (const [, patternDef] of Object.entries(PATTERNS)) {
    const cells = findPatternInNeighborhood(neighborhood, patternDef, row, col, half)
    if (cells) {
      return {
        name: patternDef.name,
        description: patternDef.description,
        type: patternDef.type,
        cells: cells
      }
    }
  }

  // If no pattern matched but cell is alive, return single cell
  const chaosDescriptions = [
    { name: 'Chaos', description: "Doing its own thing" },
    { name: 'Life', description: "Just vibing" },
    { name: 'Cell', description: "Cellular automata, baby" },
    { name: 'Organism', description: "Part of something bigger" },
    { name: 'Being', description: "Exists (for now)" }
  ]

  const randomChaos = chaosDescriptions[Math.floor(Math.random() * chaosDescriptions.length)]
  return {
    name: randomChaos.name,
    description: randomChaos.description,
    type: 'unknown',
    cells: [{ row, col }]
  }
}

export default { detectPattern, PATTERNS }
