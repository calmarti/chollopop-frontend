# MVP de tienda de segunda mano 'Chollopop' - Reactjs
---
## Instalación y ejecución en entorno local

### Requisitos
- node v16.14.0 

### Clonar el repo
```sh
git clone https://github.com/calmarti/chollopop-react
```
### Instalar dependencias listadas en package.json
```sh
npm install
```

### Ejecución de la aplicación (puerto 3000 por defecto)
```sh
npm start
```
## Arranque del backend 

- El backend se basa en aquel implementado en Nestjs y desarrollado originalmente por David Jiménez:

```
https://github.com/davidjj76/nodepop-api
```

- Una vez clonado e instaladas sus dependencias, ejecutar:
```sh
npm start
```
- El backend se ejecuta por defecto en el puerto 3001


## Autenticar un usuario en la página de inicio:

- Usuario predefinido: 
```
username: user@user.com, password: 123
``` 


## Funcionalidades básicas

- Darse de alta con un nuevo usuario 

- Autenticar un usuario contra el backend

- Recordar las credenciales en el equipo del usuario

- Crear anuncios de cinco campos (name, price, sale, tags, photo) que son persistidos en el backend 

- Visualizar el listado de anuncios existentes 

- Visualizar el detalle de un anuncio

- Buscar y encontrar anuncios según los criterios: nombre, compra/venta y categorías

- Borrar un anuncio (previa confirmación)

- Cerrar la sesión (previa confirmación)

## Notas

- **El filtrado de anuncios se realiza en el frontend**, con lo cual las búsquedas por filtros no suponen peticiones adicionales al backend. 
