import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    // 1. Obtener el encabezado Authorization
    const authHeader = req.headers.authorization;

    // 2. Comprobar que exista el token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No se proporcionó un token de autenticación.",
      });
    }

    // 3. Extraer el token
    const token = authHeader.split(" ")[1];

    // 4. Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Guardar los datos del usuario en la solicitud
    req.user = {
      id: Number(decoded.sub),
      accountType: decoded.accountType,
    };

    // 6. Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "La sesión ha expirado. Iniciá sesión nuevamente.",
      });
    }

    return res.status(401).json({
      message: "Token de autenticación inválido.",
    });
  }
};
