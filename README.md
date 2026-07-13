1. El código principal está dentro de la carpeta /src, separado todo en capas para que sea más ordenado:

app.js: Es el archivo principal que arranca el servidor, configura los CORS y levanta el puerto.
/config: Acá adentro está el archivo `db.js`. Sirve para conectar el backend con la base de datos de PostgreSQL usando variables de entorno para que las contraseñas no queden expuestas.
/routes: Dentro de esta carpeta están las rutas de la API divididas por su función (como authRoutes.js, userRoutes.js y `postRoutes.js). Su trabajo es decir si llega una petición a tal URL, pasasela al middleware y controlador.
/middlewares: Acá adentro guardé los filtros de control. Está authMiddleware.js que revisa que el token del usuario sea válido antes de dejarlo entrar a las rutas privadas, y validacionDeDatos.js para chequear que no manden campos vacíos.
/controllers: Dentro de esta carpeta está la lógica de los endpoints (authController.js, userController.js y postController.js). Reciben lo que manda el usuario, llaman a los servicios para buscar la info y devuelven la respuesta con los estados HTTP que correspondan (como 200 si está todo bien o 401 si no está autorizado).
/services: Acá está la capa que habla directamente con la base de datos (user-service.js, post-service.js). Tienen las consultas SQL puras y devuelven los resultados limpios a los controladores.

2. Base de Datos

En la base de datos armamos un diseño relacional con dos tablas principales que se conectan entre sí:

1.  usuarios: Guarda las cuentas de la gente. Tiene el ID autoincremental, nombre de usuario único, nombre completo, email único, contraseña que se guarda encriptada, foto de perfil y biografía.
2.  publicaciones: Guarda las fotos de los gatitos que sube la gente. Tiene su propio ID, la foto (URL), una descripción, los likes y la fecha. Se conecta con la tabla de usuarios mediante el usuario_id y tiene borrado en cascada, o sea que si se borra un usuario, se borran sus posts.

3. Endpoints

Rutas Públicas (Cualquiera las puede usar):
POST /api/auth/register: Para crear una cuenta nueva. Pide usuario, nombre, email y contraseña (la cual se encripta antes de guardarse).
POST /api/auth/login: Para iniciar sesión. Si el email y la contraseña coinciden, te devuelve el token JWT.
GET /api/publicaciones: Devuelve todas las publicaciones de la base de datos para armar el Feed de inicio.

Rutas Protegidas (Sí o sí necesitás el Token JWT):
GET /api/usuarios/perfil: Te da los datos del usuario que está conectado y trae automáticamente todos los posts que subió ese usuario específico.
PUT /api/usuarios/perfil: Para que el usuario pueda editar sus datos (cambiar su nombre completo, biografía o foto de perfil).
POST /api/publicaciones: Para subir una nueva foto de un gatito. El sistema le asigna el post al usuario logueado automáticamente gracias al token.

4. Para proteger las secciones privadas (como ver tu perfil o subir una foto), esta el archivo authMiddleware.js. 

Cuando un usuario inicia sesión con éxito, el servidor le genera un token firmado. En las siguientes peticiones, el usuario manda ese token en los encabezados (Authorization: Bearer <token>). El middleware intercepta la petición, verifica que el token sea válido y no haya expirado, extrae los datos del usuario (ID y email) y los guarda en req.user para que el controlador sepa exactamente quién está navegando. Si el token no sirve o no está, frena todo ahí mismo y devuelve un error 401.
