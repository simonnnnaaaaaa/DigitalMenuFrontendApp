
function ProductModal({ product, onClose }) {

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="font-semibold mb-2">
                    Price: ${product.price.toFixed(2)}
                </p>
                <p
                    className={`mb-4 ${product.available ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {product.available ? "Available" : "Not Available"}
                </p>
            </div>
        </div>
    )
}

export default ProductModal