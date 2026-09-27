import { heroLook } from './upgrades.js'

// The two guides are drawn with the same body as the hero — one family.
const settled = { ...heroLook(0), missing: [], crook: 0, white: true, bandage: false, pocketsOut: false, patch: false, hat: 'none', left: 'none' }

export const GUIDES = {
  kaspi: { name: 'כספי', palette: 'gold', look: { ...settled, shirt: 'button', pants: 'jeans', shoes: 'sneaker', right: 'phone', brow: 'confident' } },
  johnny: { name: 'ג׳וני', palette: 'green', look: { ...settled, shirt: 'blazer', tie: true, pants: 'suit', shoes: 'loafer', right: 'phone', eyes: 'readers', brow: 'neutral' } }
}
