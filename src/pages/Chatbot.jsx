import "../css/Chatbot.css";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { RiRobot3Fill } from "react-icons/ri";
import FloatingButton from "./FloatingButton";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [speechBubble, setSpeechBubble] = useState(true);
  const [isChatting, setIsChatting] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "zh-TW"; // 設定語言
    recognition.interimResults = false; // 是否返回中間結果

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prevText) => prevText + transcript);
    };

    recognition.start();
  };

  const handleClicked = () => {
    setSpeechBubble(!speechBubble);
    setIsChatting(!isChatting);
  };

  const sendMessage = () => {
    setMessages([...messages, { text: input, sender: "user" }]);
    // 模擬 AI 回應
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "AI 回應: " + input, sender: "bot" },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <>
      <div
        style={{
          visibility: isChatting ? "hidden" : "",
        }}
      >
        <FloatingButton handleClicked={handleClicked} />
      </div>
      {!speechBubble && (
        <div className="chatbox">
          <div className="box-header">
            <RiRobot3Fill size={25} />
            <a className="robot">Robot</a>
            <button className="shrink" onClick={handleClicked}>
              <FaMinus />
            </button>
          </div>
          <div className="box-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user" : "bot"}
              >
                {msg.sender === "bot" && <RiRobot3Fill size={25} />}
                <span className="text">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="box-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入訊息"
              className="input"
            />

            <button onClick={startListening} className="btn-voice">
              {isListening ? <HiSpeakerWave size={23}/> : <MdOutlineKeyboardVoice size={23}/>}
            </button>

            <button onClick={sendMessage} className="btn-send">
              <IoSend size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
