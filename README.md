# 🏦 Prueba Técnica - Frontend Angular

Repositorio público: [https://github.com/JossFranco/technical-test-angular](https://github.com/JossFranco/technical-test-angular)

Este proyecto es una prueba técnica desarrollada con **Angular** y **TypeScript** que implementa la gestión de productos financieros consumiendo un backend local en Node.js.  
Incluye maquetación desde cero (sin frameworks de estilos), validaciones, manejo de errores, y pruebas unitarias con **Jest** cumpliendo el requisito mínimo de **70% de coverage**.

---

## 📋 Funcionalidades implementadas

### F1. Listado de productos financieros
- Vista principal que muestra todos los productos obtenidos desde la API.
- Maquetación basada en el diseño D1.
- Manejo de estado de carga y errores visuales.

### F2. Búsqueda de productos
- Campo de búsqueda que filtra resultados en tiempo real.
- Integrado en el listado principal.

### F3. Cantidad de registros
- Selector para elegir cuántos productos mostrar (5, 10, 20).
- Actualiza el listado dinámicamente.

### F4. Agregar producto
- Formulario con validaciones estrictas:
  - `id` único (validación en API).
  - Campos requeridos y con longitudes mínimas/máximas.
  - Fechas con validaciones lógicas (liberación ≥ fecha actual, revisión = +1 año).
- Botones **Agregar** y **Reiniciar**.
- Maquetación basada en D2 y D3.

### F5. Editar producto
- Menú contextual (dropdown) en cada producto para seleccionar “Editar”.
- Formulario precargado, con campo `id` bloqueado.
- Validaciones idénticas a F4.

### F6. Eliminar producto
- Menú contextual con opción “Eliminar”.
- Modal de confirmación con botones **Cancelar** y **Eliminar**.
- Eliminación desde API y actualización de la lista en tiempo real.

---

## 🛠 Tecnologías utilizadas

- **Angular 18**
- **TypeScript 5**
- **HTML5**
- **SCSS**
- **Jest** (pruebas unitarias)
- **Node.js** (backend local para pruebas)
- **RxJS** (manejo de flujos asíncronos)

---

## 📂 Estructura del proyecto

```
 GeovannaFranco
├── .angular
├── .editorconfig
├── .git
├── .gitignore
├── .vscode
├── README.md
├── angular.json
├── jest.config.js
├── jest.setup.js
├── package-lock.json
├── package.json
├── public
│   └── payments.svg
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── components
│   │   │   ├── alert-confirm-modal
│   │   │   │   ├── alert-confirm-modal.component.html
│   │   │   │   ├── alert-confirm-modal.component.scss
│   │   │   │   ├── alert-confirm-modal.component.spec.ts
│   │   │   │   └── alert-confirm-modal.component.ts
│   │   │   ├── bank-header
│   │   │   │   ├── bank-header.component.html
│   │   │   │   ├── bank-header.component.scss
│   │   │   │   ├── bank-header.component.spec.ts
│   │   │   │   └── bank-header.component.ts
│   │   │   ├── product-action-menu
│   │   │   │   ├── product-action-menu.component.html
│   │   │   │   ├── product-action-menu.component.scss
│   │   │   │   ├── product-action-menu.component.spec.ts
│   │   │   │   └── product-action-menu.component.ts
│   │   │   └── search-input
│   │   │       ├── search-input.component.html
│   │   │       ├── search-input.component.scss
│   │   │       ├── search-input.component.spec.ts
│   │   │       └── search-input.component.ts
│   │   ├── interfaces
│   │   │   └── product.interface.ts
│   │   ├── pages
│   │   │   ├── product-form
│   │   │   │   ├── product-form.component.html
│   │   │   │   ├── product-form.component.scss
│   │   │   │   ├── product-form.component.spec.ts
│   │   │   │   └── product-form.component.ts
│   │   │   └── product-list
│   │   │       ├── product-list.component.html
│   │   │       ├── product-list.component.scss
│   │   │       ├── product-list.component.spec.ts
│   │   │       └── product-list.component.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.development.ts
│   │   └── environment.ts
│   ├── main.ts
│   └── styles.scss
└── tsconfig.json
 ```



## ⚙️ Instalación y ejecución
 1️⃣ Clonar el repositorio
 ```
git clone https://github.com/JossFranco/technical-test-angular
cd GeovannaFranco
```

 2️⃣ Instalar dependencias

 ```
npm install
```

 3️⃣ Levantar el backend local

Obtener el archivo repo-interview-main.zip proporcionado.
Descomprimirlo y entrar a la carpeta.

Instalar dependencias:

```
npm install
Ejecutar:
npm run start:dev
```
El backend quedará disponible en: http://localhost:3002

4️⃣ Ejecutar el frontend

```
Ejecutar:
npm start
```
Abrir en el navegador: http://localhost:4200

### 🧪 Pruebas unitarias

Para ejecutar pruebas unitarias con Jest:
```
npm run test
```

Para ver el reporte de cobertura:
```
npm run test -- --coverage
```

El reporte se genera en:

/coverage/lcov-report/index.html


### 📌 Objetivo cumplido: cobertura mínima del 70%.

❗ Manejo de errores

Validaciones visuales en formularios.

Mensajes de error claros en inputs y notificaciones.

Manejo de HttpErrorResponse en servicios.

Control de excepciones con try/catch.

### 📦 Entregables

Repositorio público en GitHub: https://github.com/JossFranco/technical-test-angular

Archivo .zip con todo el proyecto.

README.md con instrucciones de ejecución y pruebas.

### 👩‍💻 Autora

Geovanna Franco

Frontend Developer

