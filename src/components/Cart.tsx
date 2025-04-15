import { useLanguage } from "LanguageContext";
import resources from "../resources"
function Cart({ order, isOpen, onClose, increaseQuantity, decreaseQuantity }) {

    const { language } = useLanguage()
    const t = resources[language]

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            <div
                className="bg-black bg-opacity-50 backdrop-blur-sm w-full"
                onClick={onClose}
            ></div>

            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[400px] bg-white p-6 shadow-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{t.orderSummary.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-800"
                    >
                        x
                    </button>
                </div>

                <ul>
                    {order.map((item) => (
                        <li key={item.id} className="mb-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span>{item.name}</span>
                                <span className="text-sm text-gray-600">
                                    ${item.price} x {item.quantity} =  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                                >
                                    –
                                </button>
                                <span className="min-w-[24px] text-center">{item.quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>


                <p className="mt-6 font-bold text-lg">
                    {t.orderSummary.total}: $
                    {order
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default Cart;
