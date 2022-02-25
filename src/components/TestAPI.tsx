import React, { useState, useEffect, FC } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const TestAPI: FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => "error");
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return <div>{data[0]["userId"]}</div>;
};

export default TestAPI;
