import * as THREE from 'three'
import BioNexus from './BioNexus.jsx'

// Make THREE available on window so the existing useThree() hook finds it
// immediately (no async CDN load needed in the deployed build).
window.THREE = THREE

export default BioNexus
