import React, { useState, useEffect, FC, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import ArticleComponent from "./components/ArticleComponent";
import TestAPI from "./components/TestAPI";
import { formatDictionary } from "./formatDictionary";

const App: FC = () => {
  const [articles, setArticles] = useState<IndividualArticle[]>([]);
  const [text, setText] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=james%20harden&from=2022-02-24&sortBy=publishedAt&apiKey=fad2a37dcc0940059524bc53c204f3ee`;

  const formatDate = (utcTime: string) => {
    const year: string = utcTime.substring(0, 4);
    const month: string = utcTime.substring(5, 7);
    const date: string = utcTime.substring(8, 10);
    const formattedDate: string = `${month}-${date}-${year}`;
    return formattedDate;
  };

  useEffect(() => {
    getData();
    async function getData() {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data["articles"]);
    }
  }, []);

  console.log(articles);

  const mapArticles = () => {
    console.log(
      `This is what the articles look like before full mapping: ${articles}`
    );
    articles &&
      articles.map((article) => (
        <ArticleComponent
          urlToImage={article.urlToImage}
          title={article.title}
          description={article.description}
          publishedAt={article.publishedAt}
          content={article.content}
          author={article.author}
          url={article.url}
        />
      ));
  };

  return (
    <div className="App">
      <h1>News API</h1>
      {/* <div className="inputContainer">
        <input
          type="text"
          placeholder="Topic"
          name="storyTopic"
          value={storyTopic}
          onChange={handleChange}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setStoryTopic(storyTopic);
          }}
        >
          Add Story Topic
        </button>
      </div> */}
      <div>
        {articles &&
          articles.map((article: IndividualArticle, i: number) => {
            return (
              <ArticleComponent
                urlToImage={article.urlToImage}
                title={article.title}
                description={article.description}
                publishedAt={formatDate(article.publishedAt)}
                content={article.content}
                author={article.author}
                url={article.url}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
