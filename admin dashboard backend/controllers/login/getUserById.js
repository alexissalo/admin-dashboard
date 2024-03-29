

const getUserById = async (req, res) => {
  const { id } = req.user;

  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE id_creator = $1",
      [creatorId]
    );

    if (result.rows.length === 0) {
      const error = new HttpError("Creator not found...", 500);
      return next(error);
    }

    res.json({ result: result.rows[0] });
  } catch (e) {
    const error = new HttpError("There was an error", 500);
    return next(error);
  }
};

module.exports = getUserById;