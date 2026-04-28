# FitnessStore - Tienda Deportiva Web

Bienvenido al repositorio de FitnessStore. Este es un proyecto de una tienda en línea especializada en artículos deportivos para Fútbol, Basketball y Natación. 

Este documento está diseñado para que cualquier persona pueda entender qué es este proyecto y cómo funciona, con una sección especial al final para los desarrolladores.

---

## Para el público general: ¿Qué es este proyecto?

FitnessStore es el "esqueleto" visual y funcional de una página web de compras. Imagina que es la maqueta interactiva de una tienda en línea real. 

### ¿Qué puedes hacer en esta página?
* **Navegar por el catálogo:** Puedes ver diferentes productos divididos por categorías (Fútbol, Basketball y Natación) con sus respectivos precios y descuentos.
* **Usar el carrito de compras:** Puedes agregar productos al carrito con un clic. El carrito sumará automáticamente los precios, te permitirá cambiar la cantidad de artículos que quieres llevar y eliminar los que ya no desees.
* **Conocer la empresa:** Cuenta con una sección de **Acerca de nosotros** para leer la historia de la tienda, su misión y visión.
* **Contactar a soporte:** Tiene una página de **Contacto** con un formulario listo para enviar dudas o solicitar ayuda.

### ¿Cómo lo abro o lo pruebo?
No necesitas instalar programas complejos.
1. Descarga todos los archivos de este proyecto en una misma carpeta.
2. Asegúrate de tener una carpeta llamada `imagenes` con las fotos de los productos (o verás una imagen por defecto).
3. Haz doble clic en el archivo `index.html`.
4. Se abrirá en tu navegador web (Chrome, Edge, Safari, etc.) y podrás interactuar con la página como si fuera una web real.

---

## Detalles Técnicos (Para Desarrolladores)

Si vas a trabajar en el código fuente, aquí tienes la información técnica necesaria para entender la arquitectura y el flujo del proyecto.

Este es un proyecto Front-end estático. No requiere de un servidor o base de datos en esta fase, ya que los datos de los productos están simulados directamente en JavaScript.

### Tecnologías Utilizadas
* **HTML5:** Estructuración semántica de las tres páginas principales.
* **CSS3 (Custom):** Variables CSS (`:root`), gradientes y animaciones suaves para las tarjetas de productos.
* **Bootstrap 5.3.0:** Framework principal para el sistema de grillas (Grid), diseño responsivo (adaptable a móviles), barra de navegación (Navbar) y Modales (para el carrito).
* **Bootstrap Icons:** Biblioteca de iconos vectoriales.
* **JavaScript (Vanilla ES6):** Lógica del carrito de compras, renderizado dinámico de productos y manipulación del DOM.
* **Google Fonts:** Fuentes 'DM Sans' para el cuerpo y 'Barlow Condensed' para los encabezados.

### Estructura de Archivos
* `index.html`: Página principal. Contiene el banner dinámico y las grillas donde se inyectan los productos por categoría.
* `aboutus.html`: Página estática con la información corporativa de la empresa.
* `contactus.html`: Página con la maqueta del formulario de contacto y detalles de ubicación.
* `styles.css`: Hoja de estilos personalizados que complementan y sobrescriben algunas clases de Bootstrap.
* `script.js`: El "cerebro" del proyecto. Aquí residen los arreglos de datos (`productsFutbol`, `productsBasketball`, `productsNatacion`) y la lógica del carrito de compras.

### Funcionamiento de la Lógica (script.js)
El proyecto utiliza un enfoque de renderizado dinámico:
1.  **Datos Mockeados:** Los productos viven en arreglos de objetos con propiedades como `id`, `name`, `price`, e `image`.
2.  **Inyección en el DOM:** La función `renderProducts()` mapea estos arreglos y genera tarjetas HTML (`cards`) que se insertan en los contenedores correspondientes de `index.html`.
3.  **Estado del Carrito (`cart`):** Es un arreglo global que guarda objetos con la estructura `{ product, quantity }`.
4.  **Funciones del Carrito:**
    * `addToCart(product)`: Verifica si el ID ya existe; si sí, suma 1 a la cantidad; si no, lo empuja (push) al arreglo.
    * `renderCartModal()`: Dibuja la tabla dentro del Modal de Bootstrap, calculando subtotales por fila y el Total final de la compra.
    * `changeQuantity()` y `removeFromCart()`: Permiten la edición dinámica del carrito, actualizando inmediatamente el DOM (el modal y la burbuja de notificación roja).

### Siguientes pasos / Mejoras a futuro (Roadmap)
Si deseas escalar este proyecto, te sugerimos:
1.  **Persistencia de datos:** Implementar `localStorage` en `script.js` para que el carrito no se borre al recargar la página.
2.  **Integración Back-end:** Mover los arrays de productos a una base de datos real (ej. MongoDB, PostgreSQL) y consumirlos mediante una API (fetch/axios).
3.  **Checkout:** Crear el flujo de validación de compra y conexión con pasarelas de pago (Stripe, PayPal).