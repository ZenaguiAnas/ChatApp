import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1591820",
  key: "f3cbdb8360469068d382",
  secret: "6093d902bc7a7893fcf7",
  cluster: "eu",
  useTLS: true,
});