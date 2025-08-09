import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { signIn } from 'next-auth/react';
import { LoginForm } from '@/shared/components/forms/login-form';
import { RegisterForm } from '@/shared/components/forms/register-form';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const toggleType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-5 w-[450px] max-w-[450px] bg-white">
        <DialogTitle title="Выбор авторизации" className="hidden" />
        <DialogDescription title="Выбор авторизации" className="hidden" />
        {type === 'login' ? <LoginForm onClose={handleClose} /> : <RegisterForm onClose={handleClose} />}
        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" alt="github" />
            Github
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="github"
            />
            Google
          </Button>
        </div>
        <Button variant="outline" onClick={toggleType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
