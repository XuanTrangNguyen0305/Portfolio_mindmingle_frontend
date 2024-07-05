import Layout from "@/components/Layout";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Order {
  id: number;
  cup: {
    name: string;
    price: number;
  };
  iceLevel: {
    name: string;
  };
  sugarLevel: {
    name: string;
  };
  size: {
    name: string;
    price: number;
  };
  flavor: {
    name: string;
  };
  tea: {
    name: string;
    price: number;
  };
  milk: {
    name: string;
    price: number;
  };
  topping: {
    name: string;
  };
}

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const getOrdersFromApi = useCallback(async () => {
    if (token === null) {
      return;
    }
    const response = await fetch("http://localhost:3001/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const itemData = await response.json();
    setOrders(itemData);
  }, [token]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage === null) {
      console.log("Login to see your orders");
      router.push("/login");
      alert("Please log in to view your orders");
      return;
    }
    setToken(tokenFromStorage);

    getOrdersFromApi();
  }, [getOrdersFromApi, router]);

  if (orders === null) {
    return <p className="loading">loading...</p>;
  }

  const OrderList = ({ order }: { order: Order }) => {
    const { id, cup, iceLevel, sugarLevel, size, flavor, tea, milk, topping } =
      order;

    return (
      <div className="order">
        <h3>Order ID: {id}</h3>

        <h4>Tea</h4>
        <p>{tea.name}</p>
        <p className="price">{tea.price}€</p>

        <h4>Milk</h4>
        <p>{milk.name}</p>

        <h4>Flavor</h4>
        <p>{flavor.name}</p>

        <h4>Ice Level</h4>
        <p>{iceLevel.name}</p>

        <h4>Sugar Level</h4>
        <p>{sugarLevel.name}</p>

        <h4>Size</h4>
        <p>{size.name}</p>
        <p className="price">{size.price}€</p>

        <h4>Cup</h4>
        <p>{cup.name}</p>
        <p className="price">{cup.price}€</p>

        <h4>Topping</h4>
        <p>{topping.name}</p>
        <br />
      </div>
    );
  };

  return (
    <Layout>
      <div className="orders-container">
        <h2>Welcome to your orders</h2>
        <div>
          {orders
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .map((order) => (
              <OrderList key={order.id} order={order} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
