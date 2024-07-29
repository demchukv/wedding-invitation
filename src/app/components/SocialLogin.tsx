import { doSocialLogin } from '@/app/actions/index';
const SocialLogin = () => {
  return (
    <div>
      <form action={doSocialLogin}>
        <div>
          <button type="submit" name="action" value="github">
            Sign in with GitHub
          </button>
        </div>
        <p>&nbsp;</p>
        <div>
          <button type="submit" name="action" value="google">
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialLogin;
