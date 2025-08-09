'use client';

import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { AuthModal } from '@/shared/components/modals/auth-modal';

export const ProfileButton: FC = () => {
  const { data: session } = useSession();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <AuthModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />

      {!session ? (
        <Button variant="outline" className="flex items-center gap-1" onClick={() => setIsOpenModal(true)}>
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            {session.user.name || 'Пользователь №' + session.user.id}
          </Button>
        </Link>
      )}
    </>
  );
};
