using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        private static int onlineUsersCount = 0;
        private static List<string> onlineUsers = new List<string>();

        public async Task SendChatMessage(string message, string username)
        {
            await Clients.All.SendAsync("ChatUpdate", username, message);
        }

        public override async Task OnConnectedAsync()
        {
            onlineUsersCount++;
            onlineUsers.Add(Context.ConnectionId);
            await Clients.All.SendAsync("OnlineUsersUpdate", onlineUsersCount);
            await Clients.All.SendAsync("OnlineUsersListUpdate", onlineUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            onlineUsersCount--;
            onlineUsers.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("OnlineUsersUpdate", onlineUsersCount);
            await Clients.All.SendAsync("OnlineUsersListUpdate", onlineUsers);
            await Clients.All.SendAsync("UsersRemovedUpdate", new List<string> { Context.ConnectionId });
            await base.OnDisconnectedAsync(exception);
        }
    }
}

