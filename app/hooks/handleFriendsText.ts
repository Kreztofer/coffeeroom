export const handleFriendsText = (numberOfFriends: number) => {
  if (numberOfFriends === 1) {
    return `${numberOfFriends} friend`;
  } else {
    return `${numberOfFriends} friends`;
  }
};
