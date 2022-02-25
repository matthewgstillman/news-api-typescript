import React, { FC, useState, useEffect } from "react";

const ArticleComponent: FC<IndividualArticle> = ({
  urlToImage,
  title,
  description,
  publishedAt,
  content,
  url,
  author,
}) => {
  return (
    <div className="card">
      <img className="image" src={urlToImage} alt="" />
      <h1>{title}</h1>
      <h2>
        <i>"{description}"</i>
      </h2>
      <h6>
        {author} - {publishedAt}
      </h6>
      <p>{content}</p>
      <a href={url}>Read Full Article</a>
      <hr />
      <br />
      <br />
    </div>
  );
};

export default ArticleComponent;
