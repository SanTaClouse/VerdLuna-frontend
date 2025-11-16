# 🌙 Verdulería La Luna – Sitio Público y Backoffice

Este es el repositorio del **Frontend** desarrollado con **React + Vite** para la presencia digital y el sistema administrativo interno de **Verdulería La Luna**.

El proyecto se divide en dos áreas principales:
1.  **Sitio Público:** Orientado a clientes y al posicionamiento local (SEO).
2.  **Backoffice Administrativo:** Panel para la gestión interna de pedidos mayoristas.

---

## 🚀 Objetivo del Proyecto

### 🥬 Sitio Público

El objetivo es potenciar la identidad digital y aumentar las ventas mayoristas, centrándose en:

* **Mejor posicionamiento SEO local.**
* Información clara de **sucursales.**
* Presentación profesional y moderna.
* **Formularios de contacto y cotización** funcionales.

### 🛠️ Backoffice Administrativo

Busca gestionar internamente los pedidos de clientes mayoristas, proporcionando un sistema **simple, centralizado** y con capacidad de **escalabilidad** futura.

---

## 🧩 Funcionalidades y Páginas

### 📄 Páginas Principales (Sitio Público)

| Página | Descripción |
| :--- | :--- |
| **HomePage** | Landing con carrusel, presentación del negocio, sección mayorista y *preview* de sucursales. |
| **SucursalesPage** | Información detallada de las 3 sucursales (horarios, contacto, ubicación). |
| **MayoristaPage** | Detalle del servicio, beneficios y **formulario de solicitud de cotización** (optimizado para SEO). |
| **ContactoPage** | Formulario de contacto general y datos de comunicación. |
| **LoginPage** | Acceso al Backoffice Administrativo. |

### 🧱 Componentes Reutilizables Destacados

El proyecto se construye con una arquitectura modular, destacándose componentes como:

* `PublicNavbar` (Barra de navegación)
* `HeroCarousel` (Carrusel principal)
* `SucursalesPreview` (Cards de sucursales)
* `MayoristaSection` (CTA para clientes mayoristas)
* `ContactForm` (Formulario genérico)
* `Footer`

---

## ✨ Características Técnicas

* 🎨 **Diseño:** Limpio, basado en verde, blanco y tonos neutros.
* 📱 **Responsive:** Totalmente adaptativo (*mobile-first*).
* 🔍 **SEO:** Optimizado con `react-helmet-async`.
* ⚡ **UX:** Animaciones suaves con CSS.
* 📧 **Formularios:** Listos para conectar al *backend*.
* 🗺️ **Maps:** Integración preparada para Google Maps (`@react-google-maps/api`).
* ♻️ **Arquitectura:** Modular y con componentes reutilizables.
* 🧼 **Calidad:** `ESLint` configurado para buenas prácticas de desarrollo.

---

## ⚙️ Tecnologías Utilizadas

### Frontend

| Tecnología | Descripción |
| :--- | :--- |
| **React 18** | Biblioteca principal de desarrollo. |
| **Vite** | Entorno de *build* rápido. |
| **React Router DOM** | Enrutamiento de la aplicación. |
| **Bootstrap + Icons** | Framework CSS y set de iconos. |
| **Axios** | Cliente HTTP para peticiones. |
| **Formik / Yup / React Hook Form** | Manejo y validación de formularios. |
| **React Helmet Async** | Gestión del SEO en el lado del cliente. |
| **@react-google-maps/api** | Integración de Google Maps. |

### Herramientas de Desarrollo

* `ESLint` (con reglas para React)
* Plugin React SWC
* Hot Reloading de Vite

---

## 📦 Instalación y Uso

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash 
git clone https://github.com/SanTaClouse/VerdLuna-frontend.git
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```
### 4. Generar build de producción
```bash
npm run build
```

📁 Estructura del Proyecto
```bash
src/
├── views/
│ ├── public/           // Páginas del Sitio Público
│ │ ├── HomePage.jsx
│ │ └── ...
│ └── backoffice/       // Páginas del Panel Administrativo
│ └── ...
├── components/
│ ├── public/           // Componentes del Sitio Público
│ │ ├── PublicNavbar.jsx
│ │ └── ...
│ └── backoffice/       // Componentes del Backoffice
│ └── ...
└── App.jsx
```
