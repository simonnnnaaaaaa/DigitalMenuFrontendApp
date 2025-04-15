import { useLanguage } from "LanguageContext"
import resources from "../resources"

function ProductCard({ name, description, price, available, addToOrder, onViewDetails }) {

    const { language } = useLanguage()
    const t = resources[language].product

    return (
        <div className="mb-4 rounded-lg border bg-white p-4 shadow">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="mt-2 font-semibold">${price.toFixed(2)}</p>
            {!available ? (
                <p className="text-sm font-medium text-red-500">{t.notAvailable}</p>
            ) : (<p className="text-sm font-medium text-green-500">{t.available}</p>)}

            <div className="mt-4 flex flex-row gap-2">
                {available && (
                    <button
                        className="bg-green-500 text-white px-4 py-2 min-h-[40px] rounded hover:bg-green-600 transition"
                        onClick={addToOrder}
                    >
                        {t.add}
                    </button>
                )}
                <button
                    className="bg-orange-500 text-white px-4 py-2 min-h-[40px] rounded hover:bg-orange-600 transition"
                    onClick={onViewDetails}
                >
                    {t.view}
                </button>
            </div>
        </div>
    )
}

export default ProductCard
