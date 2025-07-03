


import express, {  Request, Response } from 'express';
import { Book } from '../models/book.models';
import { Borrow } from '../models/borrow.model';


 export const borrowRoutes= express.Router();

borrowRoutes.post('/borrow', async (req: Request, res: Response) => {

    const { book, quantity, dueDate } = req.body;

  const updatedBook = await Book.borrowBook(book, quantity);

  console.log(updatedBook);

  const borrow = await Borrow.create({
    book,
    quantity,
    dueDate,
  });

    res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow,
    });

});



borrowRoutes.get('/borrow', async (_req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve borrowed books summary',
      error: 'An unknown error occurred',
    });
  }
});






