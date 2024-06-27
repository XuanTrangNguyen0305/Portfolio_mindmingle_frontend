import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, z } from "zod";
import Viewer from "./Viewer";

const orderValidator = z
  .object({
    id: z.number().positive(),
    sugarLevelId: z.number().positive(),
    iceLevelId: z.number().positive(),
    cupId: z.number().positive(),
    sizeId: z.number().positive(),
    teaId: z.number().positive(),
    milkId: z.number().positive(),
    flavorId: z.number().positive(),
    toppingId: z.number().positive(),
  })
  .strict();

export type Order = z.infer<typeof orderValidator>;

const OptionValidator = z.object({
  iceLevels: z.array(z.object({ id: z.number(), name: z.string() })),
  sizes: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
  cups: z.array(
    z.object({ id: z.number(), name: z.string(), price: z.number() })
  ),
});

type Options = z.infer<typeof OptionValidator>;

const OrderForm = () => {
  const [order, setOrder] = useState<Order>({
    id: 1,
    sugarLevelId: 1,
    iceLevelId: 1,
    cupId: 1,
    sizeId: 1,
    teaId: 1,
    milkId: 1,
    flavorId: 1,
    toppingId: 1,
  });

  const [options, setOptions] = useState<Options>();

  useEffect(() => {
    const getOptionsfromAPI = async () => {
      try {
        const response = await fetch("http://localhost:3001/options");
        const data = await response.json();
        console.log("Fetched data:", data);

        const validated = OptionValidator.safeParse(data);

        if (validated.success) {
          setOptions(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.error("Fetch error for options:", error);
      }
    };
    getOptionsfromAPI();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validated = orderValidator.safeParse(order);
      if (!validated.success) {
        console.log(validated.error.flatten);
        return;
      }
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated.data),
      });

      if (response.ok) {
        console.log("Order submitted successfully");
      } else {
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (!options) {
    return <p>Loading...</p>;
  }

  return (
    <main className="editor">
      <div className="order-viewer">
        <Viewer order={order} />
      </div>
      <form className="order-form" onSubmit={handleFormSubmit}>
        <div className="option-block">
          {/* IceLevels */}
          <label>Ice Level</label>
          <div className="option-choices">
            {options.iceLevels.map((iceLvl) => {
              return (
                <button
                  className="ice-button"
                  onClick={() => {
                    setOrder({ ...order, iceLevelId: iceLvl.id });
                  }}
                >
                  {iceLvl.name}
                </button>
              );
            })}

            {options.cups.map((cup) => {
              return (
                <button
                  className="cup-button"
                  onClick={() => {
                    setOrder({ ...order, cupId: cup.id });
                  }}
                >
                  {cup.name}
                </button>
              );
            })}
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
};
export default OrderForm;
