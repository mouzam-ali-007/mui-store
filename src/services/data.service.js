import { createClient } from '@supabase/supabase-js'


let url = 'https://hrjxxzzumohxrhrmflxk.supabase.co'

let anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyanh4enp1bW9oeHJocm1mbHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNjgwNzcsImV4cCI6MjA5MDg0NDA3N30.0Gw8I2hVgMQmfHSoCw057WkOz4JslLdS1ZmxsuVyT38'


export const supabase = createClient(url, anon_key)

// Email Sign Up
export const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
};

// Email Login
export const loginWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("🚀 ~ loginWithEmail ~ data:", data)
    if (error) throw error;
    return data;
};

// Phone OTP (Login or Sign Up)
export const loginWithPhone = async (phone) => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });

    if (error) throw error;
    return data;
};


// User sign-in
export async function signIn() {
    let email = "mouzamsaleem007@gmail.com";
    let password = "@mouzam2026"
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
}

// User sign-out
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    sessionStorage.removeItem("user")
    if (error) return error
    return true
}


export async function getUserSession() {
    const session = await supabase.auth.getSession() // returns a Promise
    const user = session?.data
    return user
}

export async function addProduct(product) {




    // Get current session
    const session = await supabase.auth.getSession() // returns a Promise
    const user = session?.data?.session
    // sessionStorage.setItem("user", JSON.stringify(user))
    // console.log("🚀 ~ addProduct ~ user:", user)

    //const imageUrl = await uploadImageFromPath(product.image)

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
        console.log(data)
        return data
    }
}

export async function getProducts() {
    const { data, error } = await supabase
        .from('product')
        .select('*')
        .order('created_at', { ascending: false }) // latest first

    if (error) {
        console.error("Error fetching products:", error);
        return null;
    }

    return data;
}

export async function getProductById(id) {
    const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)   // filter by ID
        .single();      // return a single object instead of an array

    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }

    return data;
}

async function getFileFromPath(imagePath) {
    const response = await fetch(imagePath)
    const blob = await response.blob()

    const file = new File([blob], "product.jpg", {
        type: blob.type
    })

    return file
}


async function uploadImageFromPath(imagePath) {
    const file = await getFileFromPath(imagePath)


    const fileName = `${Date.now()}-product.jpg`

    const { data, error } = await supabase.storage
        .from('uploadImages')

        .upload(fileName, file, {

            upsert: false
        })

    if (data) {
        //   getMedia();

    } else {
        console.log(error);
        return null
    }




    const { data: publicUrl } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

    return publicUrl.publicUrl
}

export async function placeOrder(orderData) {
    const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

    if (error) {
        console.error('Error placing order:', error);
        throw error;
    }

    console.log('Order placed:', data);
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

