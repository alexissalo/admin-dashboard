const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM admins WHERE nombre =${nombre}  AND contraseña = ${contraseña} `,
      [nombre, contraseña]
    );

    bcrypt.compare(contraseña, result.contraseña).then((esCorrecta) => {
      if (esCorrecta) {
        const { id, nombre } = result;

        const data = {
          id,
          nombre,
        };

        const token = jwt.sign(data, "secreto", {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          mensaje: "Usuario logeado correctamente",
          usuario: {
            id,
            nombre,
            token,
          },
        });
      } else {
        return res.json({ mensaje: "Contraseña incorrecta" });
      }
    });

    if (result.rows.length === 0) {
      console.error("Credenciales invalidas")
    }

    res.json({ result: result.rows[0]});
  } catch (error) {
    console.error(error)
  }

};

module.exports = login;