import { db, sequelize } from '../../models/index.js';

const { review } = db;

export const getLibrary = async (req, res) => {
  const { id: member_id } = req.decoded || req.params;

  try {
    if (member_id === null) {
      throw new Error('멤버 아이디가 없습니다');
    }

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;
    const rating = parseFloat(req.query.rating) || null;
    const offset = (page - 1) * size;
    let books = null;
    let query = null;

    if (rating === null) {
      query = `
      SELECT r.rating, r.book_id, book.title
        FROM
        (
            SELECT
            r.rating, r.book_id, r.id, r.member_id,
                ROW_NUMBER() OVER(PARTITION BY r.rating
                                ORDER BY r.id DESC) rn
            FROM review r, book
            WHERE r.member_id = ${member_id} AND book.id = r.book_id AND r.rating IS NOT NULL
        ) r, book
        WHERE r.rn <= 5 AND book.id = r.book_id
        ORDER BY r.rating DESC
      `;
    } else {
      query = `
      SELECT r.rating, r.book_id, r.member_id, r.id, book.title
      FROM review r, book
      WHERE book.id = r.book_id AND r.rating = ${rating} AND r.member_id = ${member_id} AND r.rating IS NOT NULL
      LIMIT ${size}
      OFFSET ${offset}
      `;

      const bookCount = await review.count({
        where: {
          member_id,
          rating,
        },
      });

      res.set({ 'book-count': bookCount });
      res.set({ 'last-page': Math.ceil(bookCount / size) });
    }

    books = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.send(books);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
