import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import sharp from 'sharp'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const projectDirectory = dirname(scriptsDirectory)
const publicDirectory = join(projectDirectory, 'public')
const ogSource = join(publicDirectory, 'og-ultra-sol.svg')
const faviconSource = join(publicDirectory, 'favicon.svg')

const faviconTargets = [
  { filename: 'favicon-16x16.png', size: 16 },
  { filename: 'favicon-32x32.png', size: 32 },
  { filename: 'apple-touch-icon.png', size: 180 },
  { filename: 'icon-192.png', size: 192 },
  { filename: 'icon-512.png', size: 512 },
]

await Promise.all([
  sharp(ogSource, { density: 144 })
    .resize(1200, 630)
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
    })
    .toFile(join(publicDirectory, 'og-ultra-sol.png')),
  ...faviconTargets.map(({ filename, size }) =>
    sharp(faviconSource, { density: 192 })
      .resize(size, size)
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
      })
      .toFile(join(publicDirectory, filename)),
  ),
])

console.log('Generated OGP and favicon PNG assets.')
