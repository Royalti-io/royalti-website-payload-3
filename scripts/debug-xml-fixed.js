import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const xmlFile = path.join(__dirname, 'royaltiio.WordPress.2025-06-06.xml')
const xmlData = fs.readFileSync(xmlFile, 'utf8')

// FIXED parser for WordPress XML
const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
  parseTagValue: true,
  trimValues: true,
  cdataPropName: '__cdata',
  textNodeName: '#text',
  isArray: (name) => name === 'item',
  processEntities: true,
  htmlEntities: true,
})

const wpData = parser.parse(xmlData)
const items = wpData.rss?.channel?.item || []

const getText = (obj) => {
  if (typeof obj === 'string') return obj
  if (typeof obj === 'object') return obj['__cdata'] || obj['#text'] || 'unknown'
  return obj?.toString() || 'unknown'
}

const types = {}
items.forEach(item => {
  const type = getText(item['wp:post_type'])
  types[type] = (types[type] || 0) + 1
})

console.log(`✅ Found ${items.length} items`)
console.log('\nContent breakdown:')
Object.entries(types).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`)
})

const posts = items.filter(item => getText(item['wp:post_type']) === 'post')
const pages = items.filter(item => getText(item['wp:post_type']) === 'page')

if (posts.length > 0) console.log(`\nFirst post: "${getText(posts[0].title)}"`)
if (pages.length > 0) console.log(`First page: "${getText(pages[0].title)}"`)

console.log('\n🚀 XML parsing fixed!')
