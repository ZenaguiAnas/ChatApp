import { useEffect, useState } from "react";
import SendMessage from "../components/SendMessage";
import ChatList from "../components/ChatList";
import LeftPanel from "../components/LeftPanel";
import { useRouter } from "next/router";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { NotificationObserver } from "../components/NotificationObserver";
import Notifications from "../components/Notifications";


const Chat = ({ username, userLocation }) => {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [connection, setConnection] = useState(null);
  const [notificationObserver] = useState(new NotificationObserver());

  useEffect(() => {
    const startSignalRConnection = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7012/chatHub")
          .withAutomaticReconnect()
          .build();

        connection.on("ChatUpdate", (username, message) => {
          setChats((prevChats) => [...prevChats, { username, message }]);
        });

        connection.on("OnlineUsersUpdate", (count) => {
          notificationObserver.updateOnlineUsersCount(count);
        });

        connection.on("OnlineUsersListUpdate", (users) => {
          notificationObserver.updateOnlineUsers(users);
        });

        connection.on("UsersRemovedUpdate", (users) => {
          notificationObserver.updateUsersRemoved(users);
        });

        await connection.start();
        setConnection(connection);
      } catch (error) {
        console.error("Error connecting to SignalR hub:", error);
      }
    };

    startSignalRConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const handleSignOut = () => {
    if (connection) {
      connection.stop();
    }
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (connection) {
      await connection.invoke("SendChatMessage", messageToSend, username);
      setMessageToSend("");
    }
  };

  return (
    <div className="m-auto max-w-full h-screen bg-purple-500 shadow-lg">
      <div className="max-w-4xl m-auto pt-20">
        <div className="grid grid-cols-3 bg-white px-10 py-10 rounded-lg">
          <div className="col-span-1 mr-5 ">
            <LeftPanel sender={username} onSignOut={handleSignOut} />
            <Notifications
              onlineUsersCount={notificationObserver.onlineUsersCount}
              onlineUsers={notificationObserver.onlineUsers}
              usersRemoved={notificationObserver.usersRemoved}
            />
          </div>

          <div className="col-span-2 flex flex-col bg-purple-50 rounded-lg px-5 py-5">
            <div className="flex-1">
              {chats.map((chat, id) => (
                <ChatList key={id} chat={chat} currentUser={username} />
              ))}
            </div>

            <div className="pt-20">
              <SendMessage
                message={messageToSend}
                handleMessageChange={(e) => setMessageToSend(e.target.value)}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
