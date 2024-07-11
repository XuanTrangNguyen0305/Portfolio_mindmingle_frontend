import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OrderForm from "@/components/OrderForm";
import Land from "./landing";

export default function HomePage() {
  return (
    <div>
      <Layout>
        <OrderForm />
      </Layout>
    </div>
  );
}
