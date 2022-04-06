import React from "react";
import '../css/bestSellerList.css'

export class BestSellerList extends React.Component {
    render() {
        return (
            <div style={{float:"right", width:"30%"}}>
                <div className="book_cort">
                    <h1>Best Seller</h1>
                    <div className="content">
                        <ol>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1859245776"><strong>Book 2</strong></a><span>The KMuid LAROI/Justin BicN9eber</span>
                            </li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                3</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                4</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                5</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>舒克</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>author</span></li>
                            <li><a href="https://music.163.com/song?id=1880886636"><strong>Book
                                1</strong></a><span>author</span></li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}