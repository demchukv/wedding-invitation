import RegistrationForm from '@/app/components/RegistrationForm';

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <main>
      <h1>Register</h1>
      <RegistrationForm />
    </main>
  );
}
