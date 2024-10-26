import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChatCard from "@/components/Chat/ChatCard";

const ChatPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Archived Chats" />

      <div className="grid">
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ChatPage;
