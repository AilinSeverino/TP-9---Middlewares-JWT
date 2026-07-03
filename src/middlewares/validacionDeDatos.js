const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validarRegistro = (req, res, next) => {
    const { nombre_usuario, nombre_completo, email, password } = req.body;

    if (!nombre_usuario || !nombre_completo || !email || !password) {
        return res.status(400).json({
            error: 'Faltan campos obligatorios: nombre_usuario, nombre_completo, email, password.',
        });
    }

    if (typeof nombre_usuario !== 'string' || nombre_usuario.trim().length < 3) {
        return res.status(400).json({ error: 'nombre_usuario debe tener al menos 3 caracteres.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email no es válido.' });
    }

    if (typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    next();
};

export const validarLogIn = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Debe enviar email y password.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email no es válido.' });
    }

    next();
};

export const validarPublicacion = (req, res, next) => {
    const { url_imagen } = req.body;

    if (!url_imagen || typeof url_imagen !== 'string' || url_imagen.trim().length === 0) {
        return res.status(400).json({ error: 'El campo url_imagen es obligatorio.' });
    }

    next();
};

export const validarPerfil = (req, res, next) => {
    const { nombre_completo, biografia, foto_perfil } = req.body;

    if (nombre_completo === undefined && biografia === undefined && foto_perfil === undefined) {
        return res.status(400).json({
            error: 'Debe enviar al menos un campo para actualizar: nombre_completo, biografia o foto_perfil.',
        });
    }

    next();
};