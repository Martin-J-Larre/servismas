// Middleware para autorizar roles de usuario //TODO: Revisar bien su funcionamiento o ver otros ejemplos de implementación


export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Comprobar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({
        message: "No estás autenticado.",
      });
    }

    // 2. Comprobar que el rol del usuario esté autorizado
    if (!allowedRoles.includes(req.user.accountType)) {
      return res.status(403).json({
        message: "No tenés permisos para acceder a este recurso.",
      });
    }

    // 3. Continuar si tiene los permisos necesarios
    next();
  };
};
