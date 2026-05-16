import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Books(){

    const [isbn,setIsbn]=useState("")
    const [title,setTitle]=useState("")
    const [author,setAuthor]=useState("")
    const [publicationYear,setPublicationYear]=useState("");
    const [books,setBooks]=useState([])

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const showBooks=()=>
    {
        fetch("http://localhost:8080/books",{
        headers:{Authorization:`Bearer ${token}`}
    })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => {
        alert("Unauthorized Access");
      });
    };

    useEffect(() => {showBooks();}, []);

    const saveBook=()=>
    {
        const book={
            isbn,
            title,
            author,
            publicationYear:parseInt(publicationYear)
        };
        fetch("http://localhost:8080/books", {
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(book)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book Saved");
        clearFields();
        showBooks();
      })

    };

    const searchBook=()=>
    {
        fetch(`http://localhost:8080/books/${isbn}`,{
        headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => { 
        setTitle(data.title);
        setAuthor(data.author);
        setPublicationYear(data.publicationYear);
      })
      
      
    }

    const updateBook=()=>
    {
        const book={
            isbn,
            title,
            author,
            publicationYear:parseInt(publicationYear)
        };
        fetch(`http://localhost:8080/books/${isbn}`,{
        method:"PUT",
        headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(book)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Book Updated");
        clearFields();
        showBooks();
      });
    }

    const deleteBook=()=>
    {
        fetch(`http://localhost:8080/books/${isbn}`, {
        method:"DELETE",
        headers:{
         Authorization:`Bearer ${token}`
      }
    })
      .then((res) => res.text())
      .then(() => {
        alert("Book deleted");
        clearFields();
        showBooks();
      });
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/")
  };

  const clearFields=()=>{
    setIsbn("");
    setTitle("");
    setAuthor("");
    setPublicationYear("");
  };

  return(
    <div className="container">
    
     <h1>Book Management</h1>

        <input type="text" placeholder="Enter ISBN" value={isbn}
        onChange={(e) => setIsbn(e.target.value)}/>
        <input type="text" placeholder="Enter Title" value={title}
        onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Enter Author" value={author}
        onChange={(e) => setAuthor(e.target.value)}/>
        <input type="number" placeholder="Enter Publication Year" value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}/>
        
        <div className="button-group">

        <button className="save-btn" onClick={saveBook}>
          Save</button>
        <button className="show-btn" onClick={showBooks}>
          Show All</button>
        <button className="search-btn" onClick={searchBook}>
          Search</button>
        <button className="update-btn" onClick={updateBook}>
          Update</button>
        <button className="delete-btn" onClick={deleteBook}>
          Delete</button>
        <button className="logout-btn" onClick={logout}>
          Logout</button>
      </div>
      <h2>Book List</h2>
      {
        books.map((b)=>(
          <div className="card" key={b.isbn}>
            <h3>ISBN:{b.isbn}</h3>
            <p>Title:{b.title}</p>
            <p>Author:{b.author}</p>
            <p>Year:{b.publicationYear}</p>
          </div>
        ))
      }  
    </div>
  )
}
export default Books;