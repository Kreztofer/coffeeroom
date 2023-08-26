export const handleFriendsText = (numberOfFriends: number | undefined) => {
  if (numberOfFriends === 1) {
    return `${numberOfFriends} friend`;
  } else {
    return `${numberOfFriends} friends`;
  }
};
