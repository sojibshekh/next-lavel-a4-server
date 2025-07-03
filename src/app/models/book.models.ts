
import { Model, Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';



interface BookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<IBook>;
}

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: { 
        type: String, 
        required: true, 
        enum: [ 'FICTION' , 'NON_FICTION' , 'SCIENCE' , 'HISTORY' , 'BIOGRAPHY' , 'FANTASY' ]
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min:0 },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.statics.borrowBook = async function (bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  book.copies -= quantity;

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};



export const Book = model<IBook,BookModel>("Book",bookSchema);