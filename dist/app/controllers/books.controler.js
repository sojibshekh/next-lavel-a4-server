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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield book_models_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book
    });
}));
exports.bookRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
    const filterCondition = {};
    if (filter) {
        filterCondition.genre = filter;
    }
    const sortCondition = {};
    sortCondition[sortBy] = sort === 'asc' ? 1 : -1;
    const books = yield book_models_1.Book.find(filterCondition)
        .sort(sortCondition)
        .limit(Number(limit));
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
    });
}));
exports.bookRoutes.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_models_1.Book.findById(bookId);
    ;
    res.status(201).json({
        success: true,
        message: 'Book retrieved successfully',
        book
    });
}));
exports.bookRoutes.patch('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const note = yield book_models_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: 'Book updated successfully',
        note
    });
}));
exports.bookRoutes.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_models_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: 'Book deleted successfully',
        book
    });
}));
