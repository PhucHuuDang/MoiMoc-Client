import { ProductProps } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  orders: ProductProps[];
  totalPrice: number;
  totalItems: number;
}

interface Actions {
  addOrder: (product: ProductProps) => void;
  removeFromCart: (product: ProductProps) => void;
  decreaseQuantity: (product: ProductProps) => void;
  clearCart: () => void;
}

const INITIAL_STATE: State = {
  orders: [],
  totalPrice: 0,
  totalItems: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      orders: INITIAL_STATE.orders,
      totalPrice: INITIAL_STATE.totalPrice,
      totalItems: INITIAL_STATE.totalItems,
      clearCart: () => set({ orders: [], totalPrice: 0, totalItems: 0 }),
      addOrder: (product: ProductProps) => {
        const cartOrders = get().orders;

        const cartOrdersItems = cartOrders.find(
          (order) => order.id === product.id,
        );

        const discountPriceCondition = product?.discountPrice!;

        if (cartOrdersItems) {
          const updatedCartOrders = cartOrders.map((cart) => {
            return cart.id === product.id
              ? { ...cart, quantityOrder: cart.quantityOrder! + 1 }
              : cart;
          });

          set((state) => ({
            orders: updatedCartOrders,
            totalItems: state.totalItems + 1,
            totalPrice:
              state.totalPrice + discountPriceCondition ?? product.price,
          }));
        } else {
          const updatedCartOrders = [
            ...cartOrders,
            { ...product, quantityOrder: 1 },
          ];

          set((state) => ({
            orders: updatedCartOrders,
            totalItems: state.totalItems + 1,
            totalPrice:
              state.totalPrice + discountPriceCondition ?? product.price,
          }));
        }
      },

      removeFromCart: (product: ProductProps) => {
        const cartOrders = get().orders;
        const discountPriceCondition = product?.discountPrice!;

        set((state) => ({
          orders: state.orders.filter((order) => order.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice:
            state.totalPrice - discountPriceCondition ?? product.price,
        }));
      },

      decreaseQuantity: (product: ProductProps) => {
        const cartOrders = get().orders;

        const cartOrderItems = cartOrders.find(
          (order) => order.id === product.id,
        );

        const discountPriceCondition = product?.discountPrice!;

        if (cartOrderItems) {
          const updatedCartOrders = cartOrders.map((cart) =>
            cart.id === product.id
              ? { ...cart, quantityOrder: cart.quantityOrder! - 1 }
              : cart,
          );

          set((state) => ({
            orders: updatedCartOrders,
            totalItems: state.totalItems - 1,
            totalPrice:
              state.totalPrice - discountPriceCondition ?? product.price,
          }));
        } else {
          const updatedCartOrders = cartOrders.filter(
            (order) => order.id !== product.id,
          );

          set((state) => ({
            orders: updatedCartOrders,
            totalItems: state.totalItems - 1,
            totalPrice:
              state.totalPrice - discountPriceCondition ?? product.price,
          }));
        }
      },
    }),
    {
      name: "moi-moc-cart",
      version: 1,
      migrate: (persistedState: any, version) => {
        // console.log({persistedState, version});
        if (version === 0) {
          persistedState.totalProducts = persistedState.totalItems;

          delete persistedState.totalItems;
        }

        return persistedState as State & Actions;
      },
    },
  ),
);
