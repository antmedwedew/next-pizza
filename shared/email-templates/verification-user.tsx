import { FC } from 'react';

interface VerificationUserTemplateProps {
  code: string;
}

export const VerificationUserTemplate: FC<VerificationUserTemplateProps> = ({ code }) => (
  <div>
    <h1>Ваш код подтверждения</h1>

    <p>
      <b>{code}</b>
    </p>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>
);
