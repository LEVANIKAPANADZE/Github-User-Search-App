import { useEffect, useState } from "react";

export default function First() {
  interface UserType {
    login: string;
    name: string;
  }

  const [user, setUser] = useState<UserType | undefined>();
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    if (search) getUser();
  }, []);

  async function getUser() {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={getUser}>Search</button>
      </div>
      <div>
        <h1>Login: {user?.login}</h1>
        <h1>Name: {user?.name || "Not name"}</h1>
      </div>
    </>
  );
}
