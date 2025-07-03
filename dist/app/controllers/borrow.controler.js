"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    const updatedBook = yield book_models_1.Book.borrowBook(book, quantity);
    console.log(updatedBook);
    const borrow = yield borrow_model_1.Borrow.create({
        book,
        quantity,
        dueDate,
    });
    res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrow,
    });
}));
exports.borrowRoutes.get('/borrow', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve borrowed books summary',
            error: 'An unknown error occurred',
        });
    }
}));
