// /utils/wordpress.js
import axios from 'axios';
// import wpapi from 'wpapi';

// Woocommerce Rest Api Key
// Consumer key    ck_751a01949e4c1bffac56bab480fd9c49ee53a330
// Consumer secret     cs_a1757852225ff7081fa9da0c0b67bc87552f4431

const BASE_URL = 'https://matrixdemov3.local/wp-json/wp/v2';
const BASE_URL_WOO = 'https://matrixdemov3.local/wp-json/wc/v3';

const API_URL = BASE_URL_WOO;
const API_KEY = 'ck_751a01949e4c1bffac56bab480fd9c49ee53a330';

// var WPAPI = require( 'wpapi' );
//  export const wp = new WPAPI({
//     endpoint: 'https://matrixdemov3.local/wp-json',
//     username: 'admin',
//     password: 'Tq34icHRh*Y0khjow)'
// });


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

export const authLogin = async () => {
    try {
        const response = await axios.post('https://matrixdemov3.local/wp-json/jwt-auth/v1/token',
            {
                username: 'admin',
                password: 'Tq34icHRh*Y0khjow)'
            })
        console.log('auth response: ', response);
    } catch (err) {
        conosle.log('auth error: ', err)
    }
}


export async function getPosts() {
    const postsRes = await fetch(BASE_URL + '/posts?_embed');
    const posts = await postsRes.json();
    return posts;
}

export async function getPost(slug) {
    const posts = await getPosts();
    const postArray = posts.filter((post) => post.slug == slug);
    const post = postArray.length > 0 ? postArray[0] : null;
    return post;
}

export function getOrders() {
    return axiosInstance.get('products')
        .then((response) => {
                console.log(response.data)
            }
        )
        .catch((error) => console.error(error));
}

export async function getOrder(slug) {
    const orders = await getOrders();
    const orderArray = orders.filter((order) => order.slug == slug);
    const order = orderArray.length > 0 ? orderArray[0] : null;
    return order;
}

export async function getSlugs(type) {
    let elements = [];
    switch (type) {
        case 'posts':
            elements = await getPosts();
            break;
        case 'orders':
            elements = await getOrders();
            break;
    }
    const elementsIds = elements.map((element) => {
        return {
            params: {
                slug: element.slug,
            },
        };
    });
    return elementsIds;
}