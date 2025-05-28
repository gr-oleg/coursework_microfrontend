import React, { useState, useRef, useEffect } from "react";
import "./SupportChatWidget.css";

function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Вітаю! Чим можу допомогти?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ref на сам контейнер з повідомленнями
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("http://13.61.35.121:8003/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await resp.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.answer || "Вибачте, сталася помилка." },
      ]);
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Вибачте, сталася помилка при зверненні до сервера." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="support-chat-widget">
      {open && (
        <div className="support-chat-box">
          <div className="support-chat-header">
            <span>Техпідтримка</span>
            <button
              className="support-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Закрити чат"
            >
              ×
            </button>
          </div>
          <div className="support-chat-messages" ref={messagesContainerRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  "support-chat-message " +
                  (msg.role === "user"
                    ? "support-chat-message-user"
                    : "support-chat-message-assistant")
                }
              >
                {msg.content}
              </div>
            ))}
          </div>
          <form
            className="support-chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              className="support-chat-textarea"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ваше повідомлення..."
              disabled={loading}
            />
            <button
              className="support-chat-send"
              type="submit"
              disabled={loading}
            >
              {loading ? "..." : "Відправити"}
            </button>
          </form>
        </div>
      )}

      <button
        className="support-chat-icon-button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Відкрити чат підтримки"
      >
        <svg
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 3C6.48 3 2 6.92 2 11c0 2.02 1.07 3.85 2.85 5.14-.04.41-.18.97-.68 1.69-.15.22-.05.52.21.6.12.04.25.01.35-.08.44-.37 1.04-.97 1.35-1.31C8.5 18.14 10.19 18.5 12 18.5c5.52 0 10-3.92 10-7.5S17.52 3 12 3z" />
        </svg>
      </button>
    </div>
  );
}

export default SupportChatWidget;