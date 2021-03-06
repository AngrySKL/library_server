import { Router } from "express";
import { createConnection } from 'mysql';

import * as bodyParser from 'body-parser';
import { dbConfig } from '../config/db.config';

const borrowRouter = Router();
const urlParser = bodyParser.json();

borrowRouter.post('/', urlParser,  (req, res) => {
  const userId = req.body.uid;
  const bookId = req.body.bid;

  const tempBorrowerId = userId ? userId : 6;
  const sql = `update book set borrowerId=${tempBorrowerId} where id=${bookId}`;
  createConnection(dbConfig).query(sql, (err) => {
    if (err) {
      return res.json({ code: 300, message: 'Borrow failed!' });
    }

    return res.json({ code: 200, message: 'Borrow success!' });
  })
});

export { borrowRouter };