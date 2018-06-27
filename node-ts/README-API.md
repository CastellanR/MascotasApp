<a name="top"></a>
# mascotas-node-typescript v0.1.0

Server de Masctoas en Node con TypeScript

- [Grupos](#grupos)
	- [Actualizar Grupo](#actualizar-grupo)
	- [Buscar Grupo](#buscar-grupo)
	- [Crear Grupo](#crear-grupo)
	- [Eliminar Grupo](#eliminar-grupo)
	- [Listar Grupo](#listar-grupo)
	
- [Imagen](#imagen)
	- [Guardar Imagen](#guardar-imagen)
	- [Obtener Imagen](#obtener-imagen)
	
- [Likes](#likes)
	- [Crear Like](#crear-like)
	- [Eliminar Like](#eliminar-like)
	- [Listar Likes](#listar-likes)
	
- [Mascotas](#mascotas)
	- [Actualizar Mascota](#actualizar-mascota)
	- [Buscar Mascota](#buscar-mascota)
	- [Crear Mascota](#crear-mascota)
	- [Eliminar Mascota](#eliminar-mascota)
	- [Listar Mascota](#listar-mascota)
	
- [Mensajes](#mensajes)
	- [Crear Mensaje](#crear-mensaje)
	- [Eliminar Mensaje](#eliminar-mensaje)
	- [Listar Mensajes](#listar-mensajes)
	
- [Perfil](#perfil)
	- [Actualizar Perfil](#actualizar-perfil)
	- [Obtener Perfil](#obtener-perfil)
	
- [Provincias](#provincias)
	- [Crear Provincia](#crear-provincia)
	- [Eliminar Provincia](#eliminar-provincia)
	- [Listar Provincias](#listar-provincias)
	
- [Seguridad](#seguridad)
	- [Cambiar Contraseña](#cambiar-contraseña)
	- [Crear Usuario](#crear-usuario)
	- [Log In](#log-in)
	- [Log Out](#log-out)
	- [Usuario Actual](#usuario-actual)
	


# <a name='grupos'></a> Grupos

## <a name='actualizar-grupo'></a> Actualizar Grupo
[Back to top](#top)

<p>Actualiza los datos de un Grupo.</p>

	PUT /group/:groupId



### Examples

Grupo

```
{
  "name": "Nombre del Grupo",
  "description": "Descripcion del Grupo",
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Grupo

```
{
  "name": "Nombre del grupo",
  "description": "Descripción del grupo",
  "owner": "Id de usuario",
  "owner_name": "Nombre del creador",
  "users": "Id de Usuarios"
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='buscar-grupo'></a> Buscar Grupo
[Back to top](#top)

<p>Busca un grupo por id.</p>

	PUT /group/:groupId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Grupo

```
{
  "name": "Nombre del grupo",
  "description": "Descripción del grupo",
  "owner": "Id de usuario",
  "owner_name": "Nombre del creador",
  "users": "Id de Usuarios"
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='crear-grupo'></a> Crear Grupo
[Back to top](#top)

<p>Crea un Grupo.</p>

	POST /group



### Examples

Grupo

```
{
  "name": "Nombre del Grupo",
  "description": "Descripcion del Grupo",
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Grupo

```
{
  "name": "Nombre del grupo",
  "description": "Descripción del grupo",
  "owner": "Id de usuario",
  "owner_name": "Nombre del creador",
  "users": "Id de Usuarios"
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='eliminar-grupo'></a> Eliminar Grupo
[Back to top](#top)

<p>Eliminar un Grupo.</p>

	DELETE /group/:groupId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='listar-grupo'></a> Listar Grupo
[Back to top](#top)

<p>Obtiene un listado de los Grupos.</p>

	GET /group



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Grupo

```
[
  {
    "name": "Nombre del Grupo",
    "description": "Descripción del Grupo",
    "owner": "Id de usuario",
    "owner_name": "Nombre del creador",
    "users": "Id de Usuarios",
    "updated": date (DD/MM/YYYY),
    "created": date (DD/MM/YYYY),
    "enabled": [true|false]
  }, ...
]
```
Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='imagen'></a> Imagen

## <a name='guardar-imagen'></a> Guardar Imagen
[Back to top](#top)

<p>Guarda una imagen en la db</p>

	POST /image



### Examples

Body

```
{
  "image" : "Base 64 Image Text"
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
{
  "id": "id de imagen"
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='obtener-imagen'></a> Obtener Imagen
[Back to top](#top)

<p>Obtiene una imagen</p>

	GET /image/:id



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
{
  "id": "id de imagen",
  "image" : "Base 64 Image Text"
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='likes'></a> Likes

## <a name='crear-like'></a> Crear Like
[Back to top](#top)

<p>Crea un Like.</p>

	POST /like



### Examples

Like

```
{
  "from": "id del Usuario",
  "created": date (DD/MM/YYYY),
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Like

```
{
  "from": "Id de usuario",
  "to": "Id de mascota",
  "created": date (DD/MM/YYYY),
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='eliminar-like'></a> Eliminar Like
[Back to top](#top)

<p>Eliminar un Like.</p>

	DELETE /like/:likeId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='listar-likes'></a> Listar Likes
[Back to top](#top)

<p>Obtiene un listado de los likes por mascota.</p>

	GET /likes/:id



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Like

```
[
  {
    "from": "Id de usuario",
    "to": "Id de mascota",
    "created": date (DD/MM/YYYY),
  }, ...
]
```
Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='mascotas'></a> Mascotas

## <a name='actualizar-mascota'></a> Actualizar Mascota
[Back to top](#top)

<p>Actualiza los datos de una mascota.</p>

	PUT /pet/:petId



### Examples

Mascota

```
{
  "name": "Nombre de la mascota",
  "description": "Description de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Mascota

```
{
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "user": "Id de usuario",
  "birthDate": date (DD/MM/YYYY),
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='buscar-mascota'></a> Buscar Mascota
[Back to top](#top)

<p>Busca una mascota por id.</p>

	PUT /pet/:petId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Mascota

```
{
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "user": "Id de usuario",
  "birthDate": date (DD/MM/YYYY),
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='crear-mascota'></a> Crear Mascota
[Back to top](#top)

<p>Crea una mascota.</p>

	POST /pet



### Examples

Mascota

```
{
  "name": "Nombre de la mascota",
  "description": "Description de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Mascota

```
{
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "user": "Id de usuario",
  "birthDate": date (DD/MM/YYYY),
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='eliminar-mascota'></a> Eliminar Mascota
[Back to top](#top)

<p>Eliminar una mascota.</p>

	DELETE /pet/:petId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='listar-mascota'></a> Listar Mascota
[Back to top](#top)

<p>Obtiene un listado de las mascotas del usuario actual.</p>

	GET /pet



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Mascota

```
[
  {
    "name": "Nombre de la mascota",
    "description": "Descripción de la mascota",
    "user": "Id de usuario",
    "birthDate": date (DD/MM/YYYY),
    "updated": date (DD/MM/YYYY),
    "created": date (DD/MM/YYYY),
    "enabled": [true|false]
  }, ...
]
```
Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='mensajes'></a> Mensajes

## <a name='crear-mensaje'></a> Crear Mensaje
[Back to top](#top)

<p>Crea un Mensaje.</p>

	POST /message



### Examples

Mensaje

```
{
  "content": "Contenido del mensaje",
  "created": date (DD/MM/YYYY),
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Mensaje

```
{
  "content": "Contenido del mensaje",
  "from": "Id de usuario",
  "from_user": "Nombre de usuario",
  "to": "Id de usuario",
  "to_user": "Nombre de usuario",
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='eliminar-mensaje'></a> Eliminar Mensaje
[Back to top](#top)

<p>Eliminar un Mensaje.</p>

	DELETE /message/:messageId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='listar-mensajes'></a> Listar Mensajes
[Back to top](#top)

<p>Obtiene un listado de los Mensajes.</p>

	GET /message



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Mensaje

```
[
  {
    "content": "Contenido del Mensaje",
    "from": "Id de usuario",
    "from_user": "Nombre de usuario",
    "to": "Id de usuario",
    "to_user": "Nombre de usuario",
    "updated": date (DD/MM/YYYY),
    "created": date (DD/MM/YYYY),
    "enabled": [true|false]
  }, ...
]
```
Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='perfil'></a> Perfil

## <a name='actualizar-perfil'></a> Actualizar Perfil
[Back to top](#top)

<p>Actualiza los datos del perfil de usuario.</p>

	PUT /profile



### Examples

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "picture": "Id de imagen",
  "province": "Id de provincia",
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "picture": "Id de imagen",
  "province": "Id de provincia",
  "valid": [true|false],
  "user": "Id de usuario",
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='obtener-perfil'></a> Obtener Perfil
[Back to top](#top)

<p>Obtiene el perfil del usuario logueado.</p>

	GET /profile



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "picture": "Id de imagen",
  "province": "Id de provincia",
  "valid": [true|false],
  "user": "Id de usuario",
  "updated": date (DD/MM/YYYY),
  "created": date (DD/MM/YYYY),
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='provincias'></a> Provincias

## <a name='crear-provincia'></a> Crear Provincia
[Back to top](#top)

<p>Crea o actualiza una provincia.</p>

	POST /province



### Examples

Provincia

```
{
  "name": "Nombre Provincia",
  "enabled": [true|false]
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Provincia

```
{
  "name": "Nombre Provincia",
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='eliminar-provincia'></a> Eliminar Provincia
[Back to top](#top)

<p>Elimina una provincia.</p>

	DELETE /province/:provinceId



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='listar-provincias'></a> Listar Provincias
[Back to top](#top)

<p>Lista todas las provincias.</p>

	GET /province




### Success Response

Provincia

```
[ {
   "name": "Nombre Provincia",
   "enabled": [true|false]
  }, ...
]
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
# <a name='seguridad'></a> Seguridad

## <a name='cambiar-contraseña'></a> Cambiar Contraseña
[Back to top](#top)

<p>Permite cambiar la contraseña de usuario</p>

	POST /auth/password



### Examples

Body

```
{
     "currentPassword" : "currPass",
     "newPassword" : "newPass",
     "verifyPassword" : "newPass"
}
```
Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='crear-usuario'></a> Crear Usuario
[Back to top](#top)

<p>Registra un nuevo usuario en el sistema.</p>

	POST /auth/signup



### Examples

Usuario

```
{
  "name": "Nombre Usuario",
  "login": "login"
  "password": "password"
}
```

### Success Response

Response

```
HTTP/1.1 200 OK
{
  "token": "tokenData"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='log-in'></a> Log In
[Back to top](#top)

<p>Login en el sistema.</p>

	POST /auth/signin



### Examples

Usuario

```
{
  "login": "login"
  "password": "password"
}
```

### Success Response

Response

```
HTTP/1.1 200 OK
{
  "token": "tokenData"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "messages" : [
     {
       "path" : "propertyName",
       "message" : "Error Text"
     },
     ...
  ]
}
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='log-out'></a> Log Out
[Back to top](#top)

<p>Desloguea al usuario y limpia el token de sesión.</p>

	GET /auth/signout



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
## <a name='usuario-actual'></a> Usuario Actual
[Back to top](#top)

<p>Obtiene información del usuario logueado actualmente</p>

	GET /auth/currentUser



### Examples

Autorización

```
Authorization=bearer {token}
```

### Success Response

Usuario

```
{
  "id": "Id de usuario"
  "name": "Nombre Usuario",
  "login": "login"
  "roles": ["USER", "ADMIN"...]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized Method
```
404 Not Found

```
HTTP/1.1 404 Not Found
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "url" : "http://...",
   "error" : "Not Found"
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
HTTP/1.1 Header X-Status-Reason: {Message}
{
   "error" : "Not Found"
}
```
