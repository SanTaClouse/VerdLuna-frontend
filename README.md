🌙 Verdulería La Luna – Sitio Público + Backoffice

Frontend desarrollado con React + Vite para la presencia digital y el sistema administrativo de Verdulería La Luna.

Este proyecto incluye dos áreas principales:

Sitio Público orientado a clientes y posicionamiento local.

Backoffice Administrativo para la carga y gestión de pedidos mayoristas.

🚀 Objetivo del Proyecto
🥬 Sitio Público

El sitio público busca potenciar la identidad digital de Verdulería La Luna y aumentar las ventas mayoristas mediante:

Mejor posicionamiento SEO local

Información clara de sucursales

Presentación profesional

Formularios de contacto y cotización funcionales

🛠️ Backoffice

El panel administrativo permite gestionar internamente los pedidos mayoristas, ofreciendo un sistema simple, centralizado y pensado para escalar junto al negocio.

🧩 Funcionalidades del Sitio Público
📄 Páginas principales

HomePage
Landing con carrusel, presentación del negocio, sección mayorista y preview de sucursales.

SucursalesPage
Información detallada de 3 sucursales: horarios, contacto y ubicación.

MayoristaPage
Detalle del servicio, beneficios y formulario de solicitud de cotización (optimizado para SEO).

ContactoPage
Formulario de contacto + datos de comunicación.

LoginPage
Acceso al backoffice administrativo.

🧱 Componentes Reutilizables

PublicNavbar – Barra de navegación del sitio público

HeroCarousel – Carrusel principal

SucursalesPreview – Cards con sucursales

MayoristaSection – CTA para captar clientes mayoristas

Footer – Enlaces, contacto y redes

ContactForm – Formulario genérico reutilizable

También se encuentran en desarrollo componentes auxiliares para el backoffice.

✨ Características Técnicas

🎨 Diseño limpio basado en verde, blanco y tonos neutros

📱 Totalmente responsive (mobile-first)

🔍 SEO optimizado con react-helmet-async

⚡ Animaciones suaves con CSS

📧 Formularios funcionales, listos para conectar al backend

🗺️ Integración preparada para Google Maps (@react-google-maps/api)

♻️ Arquitectura modular con componentes reutilizables

🧼 ESLint configurado para mantener buenas prácticas

🗂️ Estructura del Proyecto
src/
├── views/
│   ├── public/
│   │   ├── HomePage.jsx
│   │   ├── SucursalesPage.jsx
│   │   ├── MayoristaPage.jsx
│   │   └── ContactoPage.jsx
│   └── backoffice/
│       └── ...
├── components/
│   ├── public/
│   │   ├── PublicNavbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Carrusel.jsx
│   │   ├── SucursalesPreview.jsx
│   │   ├── MayoristaSection.jsx
│   │   ├── Footer.jsx
│   │   └── ContactForm.jsx
│   └── backoffice/
│       └── ...

⚙️ Tecnologías Utilizadas
Frontend

React 18

Vite

React Router DOM

Axios

Formik / Yup / React Hook Form

Bootstrap + Bootstrap Icons

React Helmet Async

@react-google-maps/api

Desarrollo

ESLint (reglas para React)

Plugin React SWC

Hot Reloading de Vite

🏃 Scripts Disponibles
"dev": "vite"
"build": "vite build"
"lint": "eslint . --ext js,jsx"
"preview": "vite preview"

📦 Instalación y Uso

Clonar el repositorio

git clone <url-del-repo>


Instalar dependencias

npm install


Ejecutar en modo desarrollo

npm run dev


Generar build de producción

npm run build

📝 Estado del Proyecto

Sitio público: 90% completado

Backoffice: En desarrollo (módulo de pedidos mayoristas)