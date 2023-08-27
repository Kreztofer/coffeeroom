import getCurrentUser from '@/app/actions/getCurrentUser';
import getUserPostsById from '@/app/actions/getUserPostsById';
import getUserProfileById from '@/app/actions/getUserProfileById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ProfilePageClient from './ProfilePageClient';

interface IParams {
  profileId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
  const profile = await getUserProfileById(params);
  const posts = await getUserPostsById(params);
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ProfilePageClient
        profile={profile}
        posts={posts}
        currentUserId={currentUser.id}
      />
    </ClientOnly>
  );
};

export default ProfilePage;
