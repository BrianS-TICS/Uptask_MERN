import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
    try {
        // Evitar registros duplicados
        const { email } = req.body;
        const existeUsuario = await Usuario.findOne({ email: email })

        if (existeUsuario) {
            const error = new Error('Usuario ya registrado');
            return res.status(400).json({ msg: error.message });
        }

        const usuario = new Usuario(req.body);
        // Asigno token generado
        usuario.token = generarId();

        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    // Verificar si el usuario existe
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    //Comprobar password  
    if (await usuario.comprobarPassword(password)) {
        return res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    } else {
        const error = new Error("El password es incorrecta");
        return res.status(403).json({ msg: error.message });
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("EL token no es valido");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""; // Rectificar que se elimine el token

        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" });

        console.log(usuarioConfirmar)
    } catch (error) {
        console.log(error)
    }
}

export {
    registrar,
    autenticar,
    confirmar,
}