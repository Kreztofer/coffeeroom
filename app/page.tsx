import getCurrentUser from './actions/getCurrentUser';
import getFeedPosts from './actions/getFeedPosts';
import getUsersFriends from './actions/getUsersFriends';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import HomeCard from './components/home/HomeCard';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const feed = await getFeedPosts();
  // const friendList = await getUsersFriends({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <HomeCard
          currentUser={currentUser}
          feed={feed}
          // friendList={friendList}
        />
      </Container>
    </ClientOnly>
  );
}
