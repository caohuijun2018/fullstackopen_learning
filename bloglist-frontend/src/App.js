import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogToView from "./components/blogToView";
import ReTogglable from "./components/RecombinationTogglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [success, setSuccessMessage] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [newtitle, setTitle] = useState("");
  const [newauthor, setAuthor] = useState("");
  const [newurl, setUrl] = useState("");
  const [name, setName] = useState("");
  const [newlikes, setLikes] = useState("");

  useEffect(() => {
    //初始获得所有的blogs
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    // 匹配token
    const loggedLoginJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedLoginJSON) {
      const user = JSON.parse(loggedLoginJSON);
      setUser(user);
      //loginService.setToken(user.token);
    }
  }, []);
  console.log("name:", name);

  const handleLogin = async (event) => {
    //登陆
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setName(name.concat(username));
      console.log("username:", username);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      //loginService.setToken(user.token);
      setUser(user);

      setSuccessMessage(`${username} logged in`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 6000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = async (event) => {
    //登出

    window.localStorage.removeItem("loggedBlogappUser", JSON.stringify(user));
    //s loginService.deleteToken(user.token);
  };

  const addBlogs = (event) => {
    //添加新的blog
    event.preventDefault();
    const blog = {
      title: newtitle,
      author: newauthor,
      url: newurl,
      id: Math.floor(Math.random() * 100000000000),
      likes: newlikes,
    };
    console.log(blog);
    blogService.setToken(user.token);
    blogService.create(blog).then((returneBlog) => {
      setBlogs(blogs.concat(blog));
      setSuccessMessage(` a new blog${newtitle}! by ${newauthor} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle("");
      setUrl("");
      setAuthor("");
      setLikes("");
    });
  };
  const NotificationError = ({ message }) => {
    //错误信息提示
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };
  const NOtificationSuccess = ({ message }) => {
    //成功信息提示
    if (message === null) {
      return null;
    }
    return <div className="success">{message}</div>;
  };
  const handleTitlechange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthotChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleLikesChange = (event) => {
    setLikes(event.target.value);
  };
  const blogForm = () => (
    // 控制登陆表单是否显示
    <Togglable buttonLabel="new blog">
      <BlogForm //Togglable的child
        onsubmit={addBlogs}
        valueTitle={newtitle}
        valueAuthor={newauthor}
        valueUrl={newurl}
        valueLikes={newlikes}
        handleChangeTitle={handleTitlechange}
        handleChangeAuthor={handleAuthotChange}
        handleChangeUrl={handleUrlChange}
        handleChangeLikes={handleLikesChange}
      />
    </Togglable>
  );

  const BlogView = (props) => (
    <ReTogglable buttonLabel="view">
      <BlogToView id={props.id}   buttonLabel = 'likes'/>
    </ReTogglable>
  );

  if (user === null) {
    return (
      <div>
        <h1> log in to application</h1>
        <form onSubmit={handleLogin}>
          <NotificationError message={error} />
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <NOtificationSuccess message={success} />
        <p>{`${name} is login in`}</p>

        <form onSubmit={handleLogout}>
          <div>
            <button type="submit">login out </button>
          </div>
        </form>
        <div>
          {blogForm()}
          {blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <Blog blog={blog} />
                <BlogView id={blog.id} />
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    );
  }
};

export default App;
