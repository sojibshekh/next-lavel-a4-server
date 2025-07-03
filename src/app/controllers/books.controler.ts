

import express, { Request, Response } from 'express';
import { Book } from '../models/book.models';


 export const bookRoutes= express.Router();


 interface BookQuery {
  filter?: string;
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: string;
}

bookRoutes.post('/books', async (req: Request, res: Response) => {

    const body = req.body;
    
    const book = await Book.create(body)

    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book
    });

});



bookRoutes.get('/books', async (req: Request, res: Response) => {
  const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query as unknown as BookQuery;

  const filterCondition: Record<string, string> = {};
  if (filter) {
    filterCondition.genre = filter;
  }

  
  const sortCondition: Record<string, 1 | -1> = {};
  sortCondition[sortBy] = sort === 'asc' ? 1 : -1;

  const books = await Book.find(filterCondition)
    .sort(sortCondition)
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  });
});



bookRoutes.get('/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
   

    const book = await Book.findById(bookId);
  ;
    res.status(201).json({
        success: true,
        message: 'Book retrieved successfully',
        book
    });

    }); 

bookRoutes.patch('/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId
    const updatedBody = req.body;
  

    const note = await Book.findByIdAndUpdate(bookId, updatedBody,{new: true});


    res.status(201).json({
        success: true,
        message: 'Book updated successfully',
        note
    });

});


bookRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {

    const userId = req.params.userId
    const book = await Book.findByIdAndDelete(userId);

    res.status(201).json({
        success: true,
        message: 'Book deleted successfully',
        book
    });

});

