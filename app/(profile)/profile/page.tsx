import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components/forms/profile-form';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

  if (!user) {
    return redirect('/');
  }

  return <ProfileForm data={user} />;
}
