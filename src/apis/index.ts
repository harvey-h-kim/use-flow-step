interface Props {
  title: string;
  body: string;
  userId: number;
}

export const apiNewPost = ({ body, title, userId }: Props) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ body, title, userId }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
};
