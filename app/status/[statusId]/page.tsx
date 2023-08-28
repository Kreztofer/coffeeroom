import getCurrentUser from '@/app/actions/getCurrentUser';
import getFeedPosts from '@/app/actions/getFeedPosts';
import getUsersFriends from '@/app/actions/getUsersFriends';
import ClientOnly from '@/app/components/ClientOnly';
import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import AdsAndFriends from '@/app/components/feed/AdsAndFriends';
import MyProfile from '@/app/components/feed/MyProfile';
import StatusFeed from '@/app/components/status/StatusFeed';

interface IParams {
  statusId?: string;
}

const StatusPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const feed = await getFeedPosts();
  const friendList = await getUsersFriends({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="w-full my-10 flex justify-between">
          <MyProfile currentUser={currentUser} />
          <StatusFeed
            currentUser={currentUser}
            currentUserId={currentUser?.id}
            feeds={feed}
            toggle="yes"
          />
          <AdsAndFriends currentUserId={currentUser.id} friends={friendList} />
        </div>
      </Container>
    </ClientOnly>
  );
};

export default StatusPage;
