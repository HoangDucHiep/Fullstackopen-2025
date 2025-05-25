import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: null, type: 'error' });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: 'error' });
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogSection = () => (
    <div>
      <h2>blogs</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>{user.username} logged in </p>
        <button onClick={handleLogout}>logout</button>
      </div>
      
      <Notification message={notification.message} type={notification.type} />
      
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: 
          <input value={title} type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          author: 
          <input value={author} type="text" name="author" onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div>
          url: 
          <input value={url} type="text" name="url" onChange={(e) => setUrl(e.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>

      <h2>Blogs list</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const createdBlog = await blogService.create(newBlog);
      showNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success');
      
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.error('Blog creation failed:', exception);
      showNotification('Failed to create blog');
    }    
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      console.log(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error('Login failed:', exception);
      showNotification('Wrong credentials');
    }
  };
  
  const loginSection = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return <>{user ? blogSection() : loginSection()}</>;
};

export default App;
