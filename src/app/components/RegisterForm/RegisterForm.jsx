const RegisterForm = () => {
  return (
    <div>
      <form>
        <h1>Register</h1>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
