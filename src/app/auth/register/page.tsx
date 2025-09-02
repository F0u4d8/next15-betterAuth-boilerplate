import RegisterForm from '@/components/auth/forms/RegisterForm';
import { Suspense } from 'react';


export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}