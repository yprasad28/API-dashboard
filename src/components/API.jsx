import axios from "axios";
import { useEffect, useState } from "react";

function useGetUsers(headers) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerObj = {};
  headers.forEach((item) => {
    headerObj[item.key] = item.value;
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
          { headers: headerObj }
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}

function usePostPosts(userId, post, headers) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerObj = {};
  headers.forEach((item) => {
    headerObj[item.key] = item.value;
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            title: post.title,
            body: post.body,
            userId,
          },
          { headers: headerObj }
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to create post");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}

function useGetComments(postId, headers) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerObj = {};
  headers.forEach((item) => {
    headerObj[item.key] = item.value;
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
          { headers: headerObj }
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
}

export { useGetUsers, usePostPosts, useGetComments };