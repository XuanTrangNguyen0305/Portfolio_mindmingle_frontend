import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const MyCartPage = () => {
  const router = useRouter();
  const [items, setItems] = useState<[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const getMyOrderFromApi = useCallback(async () => {
    if (token === null) {
      return;
    }
    const response = await fetch("http://localhost:3001/my-cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const itemData = await response.json();
    setItems(itemData);
  }, [token]);
};
export default MyCartPage;
