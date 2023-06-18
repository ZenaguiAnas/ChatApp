export class NotificationObserver {
  onlineUsers: string[] = [];
  usersRemoved: string[] = [];
  onlineUsersCount: number = 0;

  updateOnlineUsersCount(count: number): void {
    this.onlineUsersCount = count;
  }

  updateOnlineUsers(users: string[]): void {
    this.onlineUsers = users;
  }

  updateUsersRemoved(users: string[]): void {
    this.usersRemoved = users;
  }
}
