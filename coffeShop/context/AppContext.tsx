import React, { createContext, useState, useContext, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
};

type Order = {
  id: string;
  product: Product;
  quantity: number;
};

type CustomerData = {
  name: string;
  email: string;
  phone: string;
};

type AppContextType = {
  products: Product[];
  orders: Order[];
  customerData: CustomerData;
  addProduct: (product: Product) => void;
  addOrder: (order: Order) => void;
  updateCustomerData: (data: CustomerData) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Caramel Macchiato",
      price: 12.9,
      description: "Creamy dessert with authentic French syrup",
      image: require("@/assets/images/caramel-macchiato.png"),
    },
    {
      id: "2",
      name: "Café Mocha",
      price: 11.5,
      description: "Chocolate mixed with premium coffee",
      image: require("@/assets/images/cafe-mocha.png"),
    },
    {
      id: "3",
      name: "Vietnamense Latte",
      price: 10.5,
      description: "Traditional Vietnamese style coffee",
      image: require("@/assets/images/vietnamese-latte.png"),
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
  });

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  const updateCustomerData = (data: CustomerData) => {
    setCustomerData(data);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        customerData,
        addProduct,
        addOrder,
        updateCustomerData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
