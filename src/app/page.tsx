
export default async function Page() {

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.BASE_URI}/api/users`);
    const users = await res.json();
    return users;
  }

  const users = await fetchUsers();
    console.log(users);

  return (
    <main>
      <h1>Home page</h1>
      {Array.isArray(users) && users &&
        <ul>
        {users.map((user: any) => (
        <p key={user._id}>{user.name}</p>
          ))}
      </ul>}
    </main>
  );
}
