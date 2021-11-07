# Frontend de tienda de artículos de segunda mano 'Nodepop' 

Este proyecto simula el frontend de una tienda online utilizando **React** 
---
### Librerías principales
- react 
- react-dom
- create-react-app
- react-router-dom
- axios
- styled-components
- classnames

---
## Requisitos
Se asume la instalación previa de:
- Node 
- nodepop-api (simulador de backend):
https://github.com/davidjj76/nodepop-api


## Iniciar la aplicación
Arrancar **nodepop-api** en el puerto deseado (3001 por defecto), ejecutando desde la consola de comandos: 

```
npm start
 ```

Clonar el repo: 

```
git clone https://github.com/calmarti/ReactNodepop.git
``` 
Instalar las dependencias listadas en el **package.json**:
```
npm install
```

Iniciar la applicación (una instancia de **create-react-app**) en el puerto 3000 del navegador: 
```
npm start
``` 
Autenticar un usuario en la página de inicio:

- Usuario predefinido: 
```
user@user.com, constraseña: 123
``` 
- O bien crear un usuario nuevo en el endpoint de nodepop-api (a través de Swagger) 
```
/api/auth/signup
```
---

## Funcionalidades

La aplicación tiene las siguientes funcionalidades básicas:

-Autenticar las credenciales de un usuario contra el backend

-Recordar las credenciales para sesiones futuras

-Crear anuncios de cinco campos (name, price, sale, tags, photo) que son persistidos en nodepop-api 

-Visualizar el listado de anuncios existentes 

-Visualizar el detalle de un anuncio

-Buscar anuncios según los criterios: nombre, compra/venta y categorías
(la búsqueda por rango de precios está aún en desarrollo)

-Borrar un anuncio (previa confirmación)

-Cerrar la sesión (previa confirmación)

## Notas de interés 

- **El filtrado de anuncios se realiza en el frontend**, con lo cual las búsquedas por filtros no suponen una peticiones adicionales al backend. 

- **Bug**: Al crear o borrar un anuncio, la lista total no se actualiza de inmediato (debido justamente al punto anterior). Por tanto, para ver reflejado el cambio en el listado de anuncios es necesario refrescar la página. 

- **Bug**: Si bien la petición de una ruta no existente redirige a la página 404, la llamada al API para traer el listado de anuncios muestra a veces un error 404, *en lugar de redirigir* a la página 404.

- La incorporación de algunos **warnings de React** rompían  funcionalidades de la aplicación. Por tanto, se optó por ignorarlos de momento.  

- El **componente Empty** muestra el estado de ausencia de anuncios. Su renderizado es condicional según la causa de dicha ausencia
(base de datos vacía o una combinación de filtros que arroja un listado vacío) 

- El **componente Modal** muestra un mensaje pidiendo la confirmación de una acción. Es consumido por la barra de navegación (componente Header) y por el detalle del anuncio (componente AdvertPage)
