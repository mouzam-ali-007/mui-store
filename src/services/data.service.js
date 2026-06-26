import { createClient } from '@supabase/supabase-js'
import { products as fallbackProducts } from "../data/products";


const url = process.env.REACT_APP_SUPABASE_URL
const anon_key = process.env.REACT_APP_SUPABASE_ANON_KEY
const hasSupabaseConfig = Boolean(url && anon_key);

export const supabase = hasSupabaseConfig ? createClient(url, anon_key) : null

const createLocalUser = (emailOrPhone, password = "") => ({
    id: "local-dev-user",
    email: emailOrPhone.includes("@") ? emailOrPhone : "local@example.com",
    phone: emailOrPhone.includes("@") ? "" : emailOrPhone,
    user_metadata: {
        full_name: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Local Shopper",
    },
    password_hint: password ? "configured" : "",
});

const persistLocalOrder = (orderData) => {
    try {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.unshift({ ...orderData, id: `local-order-${Date.now()}` });
        localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to persist local order:", error);
    }
};

// Email Sign Up
export const signUpWithEmail = async (email, password) => {
    if (!supabase) {
        return { user: createLocalUser(email, password) };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
};

// Email Login
export const loginWithEmail = async (email, password) => {
    if (!supabase) {
        return { user: createLocalUser(email, password) };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
};

// Phone OTP (Login or Sign Up)
export const loginWithPhone = async (phone) => {
    if (!supabase) {
        return { user: createLocalUser(phone) };
    }

    const { data, error } = await supabase.auth.signInWithOtp({ phone });

    if (error) throw error;
    return data;
};
// User sign-in
export async function signIn() {
    if (!supabase) {
        return createLocalUser("ali@gmail.com", "ali@123");
    }

    let email = "ali@gmail.com";
    let password = "ali@123"
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
}


// User sign-out
export async function signOut() {
    sessionStorage.removeItem("user")
    if (!supabase) {
        return true;
    }

    const { error } = await supabase.auth.signOut()
    if (error) return error
    return true
}


export async function getUserSession() {
    if (!supabase) {
        const user = JSON.parse(sessionStorage.getItem("user") || "null");
        return { session: user };
    }

    const session = await supabase.auth.getSession()
    return session?.data
}

export async function addProduct(product) {
    if (!supabase) {
        return [{ ...product, id: `local-product-${Date.now()}` }];
    }

    await supabase.auth.getSession()

    let imageUrl = "https://hrjxxzzumohxrhrmflxk.supabase.co/storage/v1/object/public/products/ladies_bag.webp"
    const { data, error } = await supabase
        .from('product')
        .insert([
            {
                name: product.name,
                price: product.price,
                description: product.description,
                image: imageUrl, // use uploaded image URL

            }
        ]).select()

    if (error) {
        console.error(error)
    } else {
        return data
    }
}

export async function getProducts() {
    if (!supabase) {
        return fallbackProducts;
    }

    const { data, error } = await supabase
        .from('product')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching products:", error);
        return fallbackProducts;
    }

    return data;
}

export async function getProductById(id) {
    if (!supabase) {
        return fallbackProducts.find((item) => String(item.id) === String(id)) || null;
    }

    const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching product:", error);
        return fallbackProducts.find((item) => String(item.id) === String(id)) || null;
    }

    return data;
}

export async function placeOrder(orderData) {
    if (!supabase) {
        persistLocalOrder(orderData);
        return [{ ...orderData, id: `local-order-${Date.now()}` }];
    }

    const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

    if (error) {
        console.error('Error placing order:', error);
        throw error;
    }

    return data;
}


// async function getMedia() {

//     const { data, error } = await supabase.storage.from('uploads').list(userId + '/', {
//         limit: 10,
//         offset: 0,
//         sortBy: {
//             column: 'name', order:
//                 'asc'
//         }
//     });

//     if (data) {
//         setMedia(data);
//     } else {
//         console.log(71, error);
//     }
// }
