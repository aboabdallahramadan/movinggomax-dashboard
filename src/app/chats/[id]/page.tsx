'use client';

import { useState } from 'react';
import Image from 'next/image';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const ChatPage = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      sender: "agent",
      timestamp: "10:00 AM"
    },
    {
      id: 2,
      text: "I have a question about my order",
      sender: "user",
      timestamp: "10:01 AM"
    },
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      sender: "agent",
      timestamp: "10:00 AM"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chats" />
      <div className="h-screen flex flex-col bg-white dark:bg-gray-dark">
        {/* Chat Header */}
        <div className="p-4 border-b border-stroke dark:border-dark-3">
          <div className="flex items-center gap-3">
            <Image
              src="/images/user/user-01.png"
              alt="User"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-dark dark:text-white">Chat #{params.id}</h3>
              <span className="text-sm text-body">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-2 dark:bg-dark-2 text-dark dark:text-white'
                  }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs mt-1 block opacity-70">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-stroke dark:border-dark-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-opacity-90"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>

  );
};

export default ChatPage;
