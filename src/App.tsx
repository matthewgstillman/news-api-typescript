import React, { useState, useEffect, FC, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import ArticleComponent from "./components/ArticleComponent";
import TestAPI from "./components/TestAPI";
import { formatDictionary } from "./formatDictionary";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const App: FC = () => {
  const [articles, setArticles] = useState<IndividualArticle[]>([]);
  const [text, setText] = useState<string>("putin");
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${text}&from=2022-02-24&sortBy=publishedAt&apiKey=fad2a37dcc0940059524bc53c204f3ee`;

  const formatDate = (utcTime: string) => {
    const year: string = utcTime.substring(0, 4);
    const month: string = utcTime.substring(5, 7);
    const date: string = utcTime.substring(8, 10);
    const formattedDate: string = `${month}-${date}-${year}`;
    return formattedDate;
  };

  const formatTest = (unformattedText: string) => {
    const formattedString = unformattedText.replace(/ /g, "%20");
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

  return (
    <div className="App">
      <h1>News API</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={text}
            placeholder="Add Todo"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setText(text);
            setText("");
          }}
          variant="primary"
          type="submit"
        >
          Add
        </Button>
      </Form>
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
