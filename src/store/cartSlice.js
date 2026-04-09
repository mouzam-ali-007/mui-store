import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const serializedCart = localStorage.getItem("cart");
        if (serializedCart === null) return [];
        return JSON.parse(serializedCart);
    } catch {
        return [];
    }
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
        console.error("Failed to save cart:", error);
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;

            const existingItem = state.items.find(
                (i) => i.id === item.id && i.size === item.size
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push(item);
            }

            saveCartToStorage(state.items);
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );

            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { id, quantity, size } = action.payload;

            const item = state.items.find(
                (i) => i.id === id && i.size === size
            );

            if (item) {
                item.quantity = Math.max(1, quantity);

                // Optional: remove if 0 (but Math.max prevents 0 anyway)
                if (quantity <= 0) {
                    state.items = state.items.filter(
                        (i) => !(i.id === id && i.size === size)
                    );
                }

                saveCartToStorage(state.items);
            }
        },

        clearCart: (state) => {
            state.items = [];
            saveCartToStorage([]);
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;