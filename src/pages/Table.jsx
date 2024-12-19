import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Table.css";
import { useEffect, useState } from "react";
import { API_GET_DATA } from "../components/Constants";
import Banner from "./Banner";
import Chatbot from "./Chatbot";

function Table() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  async function fetchData() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_GET_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        page: 1,
        limit: 900719925474099,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const items = data.body.accounts;
      console.log(items);
      setItems(items || []);
    } else {
      console.error("Failed to fetch data:", response.status);
      return;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <>
    <Banner />
    <div className="container">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="narrow">
              員工編號
            </th>
            <th scope="col" className="narrow">
              員工姓名
            </th>
            <th scope="col" className="narrow">
              所屬組織
            </th>
            <th scope="col" className="narrow">
              職位名稱
            </th>
            <th scope="col" className="wide">
              建立時間
            </th>
            <th scope="col" className="wide">
              更新時間
            </th>
            <th scope="col" className="narrow">
              功能選項
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.member_id}>
              <td>{item.member_id}</td>
              <td>{item.name}</td>
              <td>{item.department_name}</td>
              <td>{item.role_name}</td>
              <td>
                {new Date(item.created_at)
                  .toLocaleString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(/\//g, "-")}
              </td>
              <td>
                {new Date(item.updated_at)
                  .toLocaleString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(/\//g, "-")}
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <div>
            <button
              className="btn-page"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &laquo; Previous
            </button>
            <span>
              {pageNumbers.map((page) => (
                <button 
                  className={`btn-page btn-page-number ${currentPage === page ? "active" : ""}`}
                  key={page} 
                  onClick={() => setCurrentPage(page)}
                  >
                  {page}
                </button>
              ))}
            </span>
            <button
              className="btn-page"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next &raquo;
            </button>
          </div>
        </ul>
      </nav>
    </div>
    <Chatbot />
  </>
  );
}

export default Table;
