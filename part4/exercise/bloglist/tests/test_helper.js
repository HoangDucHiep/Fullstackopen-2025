const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "Hello world",
        author: "Hoang Duc Hiep",
        url: "http://newurl.com",
        likes: 1000,
        },
    {
        title: "Hello world 2",
        author: "Hoang Duc Hiep",
        url: "http://newurl.com",
        likes: 2000,
    },
    {
        title: "Hello world 3",
        author: "Hoang Duc Hiep",
        url: "http://newurl.com",
        likes: 3000,
    }
];

module.exports = {
    initialBlogs,
}