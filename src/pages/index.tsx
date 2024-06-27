import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <div>
      <Layout>
        <h1>Trang's boba shop</h1>
        <OrderForm />
      </Layout>
    </div>
  );
}
