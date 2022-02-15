import "./App.css";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

function App() {
  const [item, setItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:3004/comments?_page=1&_limit=12`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setPageCount(Math.ceil(total / 12));
      setItem(data);
    };
    getComments();
  }, []);
  console.log(item);
  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3004/comments?_page=${currentPage}&_limit=12`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItem(commentsFormServer);
  };

  return (
    <div className="container">
      <div className="row m-2">
        {item.map((result) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">id:{result.id}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {result.email}
                  </h6>
                  <p className="card-text">{result.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
