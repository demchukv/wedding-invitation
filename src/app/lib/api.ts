  export const fetchUsers = async () => {
      const res = await fetch(`${process.env.BASE_URI}/api/users`);
      
      const users = await res.json();
      return JSON.parse(JSON.stringify(users));
  }
