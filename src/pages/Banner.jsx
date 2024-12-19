import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Banner.css";
import { FaRegUserCircle } from "react-icons/fa";

function Banner() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // 切換小視窗顯示狀態
  };

  const handleLogout = () => {
    alert("您已登出！");
    setIsPopupOpen(false); // 關閉小視窗
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  return (
    <div className="banner">
      <div className="list">
        <button className="btn-banner">組織圖</button>
        <button className="btn-banner">職位管理</button>
        <button className="btn-banner">員工管理</button>
      </div>
      <button className="userName btn-banner" onClick={togglePopup}>
        <span>{userName}</span>
        <FaRegUserCircle size={25} />
      </button>
      {isPopupOpen && (
        <div className="popup-container">
          <div className="modal-content">
            <div className="modal-header">
                <span>{userName}</span>
                <button onClick={togglePopup} className="btn-close"></button>
            </div>
            <hr/>
            <div className="modal-body">
                你確定要登出嗎?
            </div>
            <div className="modal-footer">
                <button onClick={handleLogout} className="popup-btn">登出</button>    
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
