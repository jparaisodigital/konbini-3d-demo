const productGraphics = {
  box: {
    label: 'CRUNCH',
    color: '#e5b952',
    shape: '<rect x="24" y="8" width="64" height="100" rx="3" fill="#e5b952"/><rect x="31" y="20" width="50" height="75" fill="#f5edda"/>',
  },
  ramen: {
    label: 'TOKYO',
    color: '#d9503d',
    shape: '<path d="M17 28H95L85 100Q56 110 27 100Z" fill="#d9503d"/><ellipse cx="56" cy="28" rx="40" ry="9" fill="#f5edda"/>',
  },
  chips: {
    label: 'CHIPS',
    color: '#e8bc65',
    shape: '<path d="M23 10H89L96 105H16Z" fill="#e8bc65"/><path d="M23 10H89L86 22H26Z" fill="#d9503d"/>',
  },
  can: {
    label: 'COFFEE',
    color: '#315c48',
    shape: '<rect x="28" y="12" width="56" height="94" rx="9" fill="#315c48"/><rect x="28" y="12" width="56" height="9" rx="4" fill="#d3d7cb"/>',
  },
  bottle: {
    label: 'TEA',
    color: '#83bea9',
    shape: '<rect x="43" y="8" width="26" height="13" rx="3" fill="#315c48"/><path d="M40 21H72L80 37V101Q80 108 73 108H39Q32 108 32 101V37Z" fill="#83bea9"/>',
  },
  sticks: {
    label: 'POKI',
    color: '#e9a9b5',
    shape: '<rect x="29" y="8" width="54" height="100" rx="3" fill="#e9a9b5"/><path d="M39 33L49 88M56 33L60 88M72 33L67 88" stroke="#d9503d" stroke-width="6"/>',
  },
}

function fallbackImage(type) {
  const graphic = productGraphics[type] || productGraphics.box

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 112 116">
      ${graphic.shape}
      <rect x="26" y="53" width="60" height="26"
        rx="3" fill="#f5edda"/>
      <text x="56" y="69"
        text-anchor="middle"
        font-family="Arial,sans-serif"
        font-weight="bold"
        font-size="12"
        fill="#315c48">${graphic.label}</text>
    </svg>
  `

  return 'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(svg)
}

function captureProductPreview(dialog) {
  const source = dialog?.querySelector('canvas')
  if (!source || !source.width || !source.height) return null

  try {
    const snapshot = document.createElement('canvas')
    snapshot.width = 112
    snapshot.height = 112

    const ctx = snapshot.getContext('2d')
    if (!ctx) return null

    const ratio = Math.min(
      112 / source.width,
      112 / source.height
    )

    const width = source.width * ratio
    const height = source.height * ratio

    ctx.drawImage(
      source,
      (112 - width) / 2,
      (112 - height) / 2,
      width,
      height
    )

    // Some WebGL canvases cannot be captured after rendering.
    const pixels = ctx.getImageData(0, 0, 112, 112).data
    let visible = 0

    for (let i = 0; i < pixels.length; i += 64) {
      if (
        pixels[i + 3] > 20 &&
        (pixels[i] > 30 ||
         pixels[i + 1] > 30 ||
         pixels[i + 2] > 30)
      ) {
        visible++
      }
    }

    if (visible < 30) return null

    return snapshot.toDataURL('image/png')
  } catch {
    return null
  }
}

function bounceCart(cart) {
  cart.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.22)' },
      { transform: 'scale(0.96)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: 380,
      easing: 'ease-out',
    }
  )
}

export function flyToCart(product, button) {
  const cart = document.querySelector(
    'button[aria-label="Open shopping cart"]'
  )

  if (!cart || !button) return

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (reducedMotion) {
    bounceCart(cart)
    return
  }

  const dialog = button.closest('[role="dialog"]')
  const previewCanvas = dialog?.querySelector('canvas')

  const sourceRect = previewCanvas
    ? previewCanvas.getBoundingClientRect()
    : button.getBoundingClientRect()

  const targetRect = cart.getBoundingClientRect()

  const size = 88

  const startX =
    sourceRect.left + sourceRect.width / 2 - size / 2

  const startY =
    sourceRect.top + sourceRect.height / 2 - size / 2

  const endX =
    targetRect.left + targetRect.width / 2 - size / 2

  const endY =
    targetRect.top + targetRect.height / 2 - size / 2

  const image = document.createElement('img')

  image.src =
    captureProductPreview(dialog) ||
    fallbackImage(product.type)

  image.alt = ''
  image.setAttribute('aria-hidden', 'true')

  Object.assign(image.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: 'contain',
    pointerEvents: 'none',
    zIndex: '100',
    filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.18))',
  })

  document.body.appendChild(image)

  const dx = endX - startX
  const dy = endY - startY

  const animation = image.animate(
    [
      {
        transform: 'translate3d(0,0,0) scale(1)',
        opacity: 1,
        offset: 0,
      },
      {
        transform: `translate3d(${dx * 0.5}px, ${dy * 0.15}px, 0) scale(0.8)`,
        opacity: 1,
        offset: 0.5,
      },
      {
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(0.18)`,
        opacity: 0.2,
        offset: 1,
      },
    ],
    {
      duration: 720,
      easing: 'cubic-bezier(0.22, 0.65, 0.35, 1)',
      fill: 'forwards',
    }
  )

  animation.onfinish = () => {
    image.remove()
    bounceCart(cart)
  }

  animation.oncancel = () => {
    image.remove()
  }
}
