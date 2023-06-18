using System.Collections.Generic;

namespace ChatService
{
    public class NotificationObserver
    {
        public List<string> OnlineUsers { get; private set; }
        public List<string> UsersRemoved { get; private set; }
        public int OnlineUsersCount { get; private set; }

        public NotificationObserver()
        {
            OnlineUsers = new List<string>();
            UsersRemoved = new List<string>();
            OnlineUsersCount = 0;
        }

        public void UpdateOnlineUsersCount(int count)
        {
            OnlineUsersCount = count;
        }

        public void UpdateOnlineUsers(List<string> users)
        {
            OnlineUsers = users;
        }

        public void UpdateUsersRemoved(List<string> users)
        {
            UsersRemoved = users;
        }
    }
}
