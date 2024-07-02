import Layout from "@/components/Layout";
import { Order } from "@/components/OrderForm";
import { useEffect, useState } from "react";

interface OrderProps {
  id: number;
  sugarLevelId: number;
  iceLevelId: number;
  cupId: number;
  sizeId: number;
  teaId: number;
  milkId: number;
  flavorId: number;
  toppingId: number;
}

const OrderPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const getOrdersFromApi = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetch data:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getOrdersFromApi();
  }, []);

  const OrderList = (props: OrderProps) => {
    return (
      <div>
        <ul>
          <li>ID: {props.id}</li>
          <li>Tea:{props.teaId}</li>
          <li>Milk:{props.milkId}</li>
          <li>Flavor:{props.flavorId}</li>
          <li>Topping:{props.toppingId}</li>
          <li>Sugar Level:{props.sugarLevelId}</li>
          <li>Ice Level: {props.iceLevelId}</li>
          <li>Cup:{props.cupId}</li>
          <li>Size:{props.sizeId}</li>
        </ul>
      </div>
    );
  };
  return (
    <Layout>
      <h2>Welcome to your orders</h2>
      <div>
        {orders
          .sort((a, b) => {
            // Sort by amount in descending order
            if (a.id.valueOf() > b.id.valueOf()) return -1;
            if (a.id.valueOf() < b.id.valueOf()) return 1;

            // If amounts are equal, sort by id in descending order
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;

            return 0;
          })
          .map((order) => (
            <OrderList
              key={order.id}
              id={order.id}
              teaId={order.teaId}
              milkId={order.milkId}
              flavorId={order.flavorId}
              toppingId={order.toppingId}
              cupId={order.cupId}
              iceLevelId={order.iceLevelId}
              sugarLevelId={order.sugarLevelId}
              sizeId={order.sizeId}
            />
          ))}
      </div>
    </Layout>
  );
};

export default OrderPage;
