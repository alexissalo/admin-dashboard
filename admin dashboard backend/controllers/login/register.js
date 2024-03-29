const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { nombre, contraseña } = req.body;
  let contraHasheada;

  const existe = await pool.query(`SELECT * FROM admins WHERE nombre = ${nombre}`);

  if (existe) {
    res.json({mensaje:"Ya existe un usuario con ese nombre"});
  }else{
    bcrypt.hash(contraseña, 10, (error, contraseñaHasheada) => {
      if (error) res.json({ error });
      else {
        contraHasheada=contraseñaHasheada
      }
    });
    try {
      const result = await pool.query(
        "INSERT INTO admins (nombre, contraseña) VALUES (?,?)",
        [nombre, contraHasheada]
      );

      res.json({ result: result.rows[0]});
      res.json({ mensaje: "Usuario creado correctamente" });
    } catch (error) {
      console.error(error)
    }
  }
    
};

module.exports = register;
