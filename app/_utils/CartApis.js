const { default: axiosClient } = require("./axiosClient")




const addToCart = (payload)=>axiosClient.post(`/carts`,payload);

const getUserCartItems = (email)=>axiosClient.get(`carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)

const deleteCartItems =(documentId)=>axiosClient.delete(`/carts/${documentId}`) 
export default {
    addToCart,
    getUserCartItems,
    deleteCartItems,
}