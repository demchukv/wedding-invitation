const LoginForm = () => {
  
  return (
    <div>
      <h1>LoginForm</h1>
      <form>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
