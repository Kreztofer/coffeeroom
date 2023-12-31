import getCurrentUser from './actions/getCurrentUser';
import getFeedPosts from './actions/getFeedPosts';
import getUsersFriends from './actions/getUsersFriends';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import HomeCard from './components/home/HomeCard';
import NoUserCard from './components/nouser/NoUserCard';

export default async function Home() {
  const currentUser = await getCurrentUser();

  const feed = await getFeedPosts();
  const friendList = await getUsersFriends({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <Container>
          <NoUserCard feed={feed} />
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <HomeCard
          currentUser={currentUser}
          feed={feed}
          friendList={friendList}
        />
      </Container>
    </ClientOnly>
  );
}
