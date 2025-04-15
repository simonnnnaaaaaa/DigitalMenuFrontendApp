import { useState } from 'react'
import { menuData } from '../data/menuData'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import { useLanguage } from 'LanguageContext'
import resources from '../resources'
import Cart from 'components/Cart'

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [menuState, setMenuState] = useState(menuData)
  const [order, setOrder] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('none')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setCartOpen] = useState(false)

  const { language } = useLanguage()
  const t = resources[language]

  const toggleAvailability = (categoryId, productId) => {
    const updatedMenu = menuState.map((category) => {
      if (category.id !== categoryId) return category

      const updatedProducts = category.products.map((product) =>
        product.id === productId
          ? { ...product, available: !product.available }
          : product
      )

      return { ...category, products: updatedProducts }
    })

    setMenuState(updatedMenu)
  }

  const addToOrder = (product) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === product.id)

      if (existingItem) {
        return prevOrder.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevOrder, { ...product, quantity: 1 }]
      }
    })
  }

  const increaseQuantity = (productId) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setOrder((prevOrder) =>
      prevOrder
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-2">
        <button
          className={`rounded px-4 py-2 ${
            selectedCategory === 'All'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          {t.categories.all}
        </button>
        {menuState.map((cat) => (
          <button
            key={cat.id}
            className={`rounded px-4 py-2 ${
              selectedCategory === cat.category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(cat.category)}
          >
            {t.categories[cat.category.toLocaleLowerCase()]}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="w-full rounded border px-4 py-2 md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <select
          className="rounded border px-4 py-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">{t.sort.none}</option>
          <option value="asc">{t.sort.asc}</option>
          <option value="desc">{t.sort.desc}</option>
        </select>
      </div>

      {menuState
        .filter(
          (cat) =>
            selectedCategory === 'All' || cat.category === selectedCategory
        )
        .map((category) => (
          <div key={category.id} className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">{category.category}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.products
                .filter((product) =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => {
                  if (sortOrder === 'asc') return a.price - b.price
                  if (sortOrder === 'desc') return b.price - a.price
                  return 0
                })
                .map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      available={product.available}
                      addToOrder={() => addToOrder(product)}
                      onViewDetails={() => setSelectedProduct(product)}
                    />
                    <label className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={product.available}
                        onChange={() =>
                          toggleAvailability(category.id, product.id)
                        }
                      />
                      <span>
                        {product.available
                          ? t.availability.available
                          : t.availability.available}
                      </span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* {
        order.length > 0 && (
          <div className="mt-10 p-6 bg-white border rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{t.orderSummary.title}</h2>
            <ul>
              {order.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name} × {item.quantity} = ${(
                    item.quantity * item.price
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold">
              {t.orderSummary.total}: $
              {order
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        )
      } */}

      {order.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-5 py-3 text-white shadow-lg transition hover:bg-orange-600"
        >
          {t.orderSummary.title} (
          {order.reduce((total, item) => total + item.quantity, 0)})
        </button>
      )}

      <Cart
        order={order}
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

export default Menu
