import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";

import PropTypes from "prop-types";
const BlogToView = (props) => {
  const [blogView, setBlogView] = useState(null);

  const blogGet = (blog) => {
    blogService.getBlog(blog.id).then((blog) => setBlogView(blog));
  };

  useEffect(() => {
    blogGet(props);
  }, []);

  const addLikes = () => {
    const newBlogView = { ...blogView, likes: blogView.likes + 1 }; //将新建，更新likes后的blog一个变量名
    blogService.updata(newBlogView.id, newBlogView).then((blog) => {
      //先将更新后的变量put到数据库中，成功后再从数据库中get到最新的blogs，同步到前端
      blogGet(blog);
    });
  };

  if (blogView === null) {
    return null;
  }
  return (
    <div className="likesContent" >
      <p> title : {blogView.title}</p>
      <p> auhort: {blogView.author}</p>
      <p> url: {blogView.url}</p>
      <p> likes: {blogView.likes}</p>

      <button onClick={addLikes}  name="likes">
        {props.buttonLabel}
      </button>
    </div>
  );
};

BlogToView.prototype = {
  buttonLabel: PropTypes.string.isRequired,
};

export default BlogToView;
