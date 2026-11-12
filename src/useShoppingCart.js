import { useState } from 'react'

const PRODUCT_DETAILS = {
  box: { name: 'Konbini Crunch Cereal', price: 149 },
  ramen: { name: 'Tokyo Cup Ramen', price: 79 },
  chips: { name: 'Golden Potato Chips', price: 65 },
  can: { name: 'Retro Canned Coffee', price: 55 },
  bottle: { name: 'Japanese Bottled Tea', price: 89 },
  sticks: { name: 'Sweet Snack Sticks', price: 99 },
}

export default function useShoppingCart() {
  const [cart, setCart] = useState([])

  const addItem = (product) => {
    const details = PRODUCT_DETAILS[product.type] || PRODUCT_DETAILS.box

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...current,
        {
          id: product.id,
          type: product.type,
          color: product.color,
          name: details.name,
          price: details.price,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
    total,
    itemCount,
  }
}

