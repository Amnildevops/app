const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const db = mysql.createPool({
    host: 'mysql_db', 
    user: 'MYSQL_USER',
    password: 'MYSQL_PASSWORD',
    database: 'books'
});

app.get('/', (req, res)=>{
    res.send('Hi everyone!!');
});

app.get('/get', (req, res) => {
    const selectQuery= "SELECT * FROM books_reviews";
    db.query(selectQuery, (err, result) =>{
        if (err) throw err;
        res.send(result);
    });
});

app.post("/insert", (req, res)=>{
    const bookName=req.body.setBookName;
    const bookReview= req.body.setReview;
    const insertQuery = "INSERT INTO books_reviews(book_name, book_review) VALUES(?,?)";
    db.query(insertQuery, [bookName, bookReview], (err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send("Inserted successfully");
    });
});

app.delete("/delete/:bookId", (req,res)=>{
    const bookId = req.params.bookId;
    const deleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(deleteQuery, bookId, (err, result)=>{
        if (err) throw err;
        res.send("Deleted successfully");
    });
});

app.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const updateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
    db.query(updateQuery, [bookReview, bookId], (err, result) =>{
        if (err) throw err;
        res.send("Updated successfully");
    });
});

app.listen('3001', () => {
    console.log('Server started on port 3001');
});
