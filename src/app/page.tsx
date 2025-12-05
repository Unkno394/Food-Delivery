"use client";

import { useState } from "react";
import { 
  FaBowlFood, FaDrumstickBite, FaCarrot, FaIceCream, FaMugHot, FaCookie, FaBurger, FaPizzaSlice, FaFish, FaBacon, FaLeaf, FaUtensils, FaCartShopping
} from "react-icons/fa6";
import { useRouter } from "next/navigation"; // Добавил для навигации

import CafeSelector from "@/components/CafeSelector/CafeSelector";
import CategorySelector from "@/components/CategorySelector/CategorySelector";
import MenuSection from "@/components/Menu/MenuSection";
import DishModal from "@/components/Menu/DishModal";
import CartSummary from "@/components/Cart/CartSummary";
import CheckoutButton from "@/components/Cart/CheckoutButton";

export default function Home() {
  const router = useRouter(); // Для навигации
  const [activeCafeId, setActiveCafeId] = useState<number>(1);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [selectedDish, setSelectedDish] = useState<null | typeof dishes[0]>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cafes = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1, name: `кафе ${i + 1}` }));

  const categories = [
    { id: 1, name: "Все", icon: <FaBowlFood /> },
    { id: 2, name: "Второе", icon: <FaDrumstickBite /> },
    { id: 3, name: "Салаты", icon: <FaCarrot /> },
    { id: 4, name: "Десерты", icon: <FaIceCream /> },
    { id: 5, name: "Напитки", icon: <FaMugHot /> },
    { id: 6, name: "Закуски", icon: <FaCookie /> },
    { id: 7, name: "Бургеры", icon: <FaBurger /> },
    { id: 8, name: "Пицца", icon: <FaPizzaSlice /> },
    { id: 9, name: "Суши", icon: <FaFish /> },
    { id: 10, name: "Стейки", icon: <FaBacon /> },
    { id: 11, name: "Вегетарианские", icon: <FaLeaf /> },
    { id: 12, name: "Паста", icon: <FaUtensils /> },
  ];

  // ОБНОВЛЕННЫЕ ДАННЫЕ С ТЕГАМИ "КОМУ ПОДХОДИТ"
  const dishes = [
    { 
      id: 1, 
      name: "Борщ украинский", 
      description: "С говядиной, сметаной и зеленью", 
      price: 450, 
      categoryId: 1,
      composition: ["Говядина", "Свекла", "Капуста", "Картофель", "Морковь", "Лук", "Сметана", "Зелень"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: лактоза"]
    },
    { 
      id: 2, 
      name: "Стейк Рибай", 
      description: "С овощами гриль и соусом пеперони", 
      price: 1200, 
      categoryId: 10,
      composition: ["Говядина рибай", "Овощи гриль", "Соус пеперони", "Специи"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: глютен"]
    },
    { 
      id: 3, 
      name: "Цезарь с курицей", 
      description: "С соусом цезарь и пармезаном", 
      price: 550, 
      categoryId: 3,
      composition: ["Куриная грудка", "Салат айсберг", "Пармезан", "Сухарики", "Соус цезарь"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: лактоза, глютен"]
    },
    { 
      id: 4, 
      name: "Тирамису", 
      description: "Итальянский десерт", 
      price: 350, 
      categoryId: 4,
      composition: ["Сыр маскарпоне", "Печенье савоярди", "Кофе", "Какао", "Яйца", "Сахар"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: лактоза, глютен, яйца"]
    },
    { 
      id: 5, 
      name: "Пицца Маргарита", 
      description: "Моцарелла, томаты, базилик", 
      price: 650, 
      categoryId: 8,
      composition: ["Тесто для пиццы", "Сыр моцарелла", "Томаты", "Соус томатный", "Базилик", "Оливковое масло"],
      suitableFor: ["Подходит вегетарианцам", "Не подходит веганам", "Аллергены: лактоза, глютен"]
    },
    { 
      id: 6, 
      name: "Сет Калифорния", 
      description: "8 роллов с лососем и авокадо", 
      price: 850, 
      categoryId: 9,
      composition: ["Рис", "Нори", "Лосось", "Авокадо", "Огурец", "Кунжут", "Соус"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: рыба, соевый соус"]
    },
    { 
      id: 7, 
      name: "Бургер Чизбургер", 
      description: "Говяжья котлета, сыр, овощи", 
      price: 480, 
      categoryId: 7,
      composition: ["Булочка", "Говяжья котлета", "Сыр чеддер", "Помидор", "Лук", "Салат", "Соус"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: лактоза, глютен"]
    },
    { 
      id: 8, 
      name: "Лазанья", 
      description: "С мясным соусом бешамель", 
      price: 520, 
      categoryId: 12,
      composition: ["Листы для лазаньи", "Фарш говяжий", "Сыр", "Томатный соус", "Соус бешамель", "Специи"],
      suitableFor: ["Не подходит веганам", "Не подходит вегетарианцам", "Аллергены: лактоза, глютен"]
    },
  ];

  const handleCafeClick = (id: number) => setActiveCafeId(id);
  const handleCategoryClick = (id: number) => setActiveCategoryId(id);


  const navigateToFortuneWheel = () => {
    router.push("/FortuneWheel");
  };

  const addToCart = (dishId: number) =>
    setCart(prev => ({ ...prev, [dishId]: (prev[dishId] || 0) + 1 }));

  const removeFromCart = (dishId: number) =>
    setCart(prev => {
      const copy = { ...prev };
      if (!copy[dishId]) return copy;
      if (copy[dishId] > 1) copy[dishId]--;
      else delete copy[dishId];
      return copy;
    });

  const totalItems = Object.values(cart).reduce((s, v) => s + v, 0);

  const totalPrice = dishes
    .filter(d => !!cart[d.id])
    .reduce((sum, d) => sum + d.price * (cart[d.id] || 0), 0);

  const filteredDishes = activeCategoryId === 1
    ? dishes
    : dishes.filter(d => d.categoryId === activeCategoryId);

  const handleDishClick = (dish: typeof dishes[0]) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#130F30] overflow-x-hidden">

      <div className="absolute bg-[#A020F0] blur-[200px] opacity-40 rounded-full w-[120%] h-[50%] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90" />
      <div className="absolute bg-[#A020F0] blur-[150px] opacity-40 rounded-full w-[80%] h-[60%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative w-full md:w-[90%] min-h-[90vh] mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-none md:rounded-2xl overflow-visible">
        <div className="px-4 pt-6 md:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Food Delivery</h1>
            <p className="text-gray-300 text-sm md:text-base">Выберите категорию и блюдо</p>
          </div>
          
          {/* Кнопка колеса фортуны с картинкой */}
          <button
            onClick={navigateToFortuneWheel}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B23CB]/50 to-[#A020F0]/50 hover:from-[#8B23CB]/70 hover:to-[#A020F0]/70 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group overflow-hidden"
            aria-label="Колесо фортуны"
            title="Колесо фортуны"
          >
            {/* Картинка колеса фортуны из public */}
            <img 
              src="/image.png" 
              alt="Колесо фортуны" 
              className="w-8 h-8 object-contain group-hover:animate-spin transition-transform duration-700"
            />
          </button>
        </div>

        <div className="px-4 md:px-6 py-4">
          <h2 className="text-white text-base md:text-lg font-semibold mb-3">Названия заведений</h2>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            {CafeSelector ? (
              <CafeSelector cafes={cafes} activeCafeId={activeCafeId} onCafeClick={handleCafeClick} />
            ) : (
              <div className="text-white">Компонент CafeSelector не найден</div>
            )}
          </div>
        </div>

        <div className="px-4 md:px-6">
          <h2 className="text-white text-base md:text-lg font-semibold mb-3">Категории блюд</h2>
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {CategorySelector ? (
              <CategorySelector categories={categories} activeCategoryId={activeCategoryId} onCategoryClick={handleCategoryClick} />
            ) : (
              <div className="text-white">Компонент CategorySelector не найден</div>
            )}
          </div>
        </div>

        <div className="px-4 md:px-6 pt-4 pb-[180px]">
          <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Меню кафе</h3>
          {MenuSection ? (
            <MenuSection 
              dishes={filteredDishes} 
              cart={cart} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart}
              onDishClick={handleDishClick}
            />
          ) : (
            <div className="text-white">Компонент MenuSection не найден</div>
          )}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          padding: "16px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-2xl mx-auto bg-[#7B6F9C]/30 border border-white/10 backdrop-blur-xl rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaCartShopping className="text-white text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-[#8B23CB] to-[#A020F0] text-white text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
            </div>
            <CheckoutButton disabled={totalItems === 0} />
          </div>
        </div>
      </div>

      {/* Модалка блюда */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}