# 💳 Wallet Digital – Frontend (jQuery)

Proyecto frontend de una **billetera digital** desarrollado con **HTML, CSS, JavaScript y jQuery**, que simula las funcionalidades básicas de una cuenta bancaria: autenticación, gestión de saldo, depósitos, retiros, transferencias y visualización de movimientos.

Este proyecto fue desarrollado como práctica de fundamentos de desarrollo frontend, manejo del DOM, eventos, almacenamiento local (`localStorage`) y experiencia de usuario.

---

## 🚀 Funcionalidades

### 🔐 Autenticación
- Inicio de sesión con validación de usuario y contraseña
- Protección de rutas (no se puede acceder sin estar logeado)
- Cierre de sesión

### 💰 Gestión de saldo
- Visualización del saldo actual
- Opción para ocultar / mostrar saldo
- Persistencia del saldo usando `localStorage`

### ➕ Depósitos y ➖ Retiros
- Depósito de dinero a la cuenta
- Retiro de dinero mediante modal
- Validaciones de monto
- Registro automático de cada operación

### 💸 Envío de dinero
- Gestión de contactos
- Agregar nuevos contactos mediante modal
- Visualización de los últimos 3 contactos agregados o utilizados
- Buscador de contactos con **jQuery**
- Validación de saldo antes de enviar dinero
- Confirmación mediante modal

### 📊 Últimos movimientos
- Listado de transacciones (depósitos, retiros y transferencias)
- Filtro por tipo de movimiento
- Visualización de las **últimas 5 operaciones**
- Indicadores visuales de ingreso / egreso

---

## 🧠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- **jQuery**
- Bootstrap 5
- LocalStorage (persistencia de datos en el navegador)

---

## 📁 Estructura del proyecto
```
📦 wallet-digital
├── 📁 css
│ └── styles.css
│ 
├── 📁 images
│ ├── logo.png
│ 
├── 📁 js
│ ├── app.js                # Lógica general (saldos)
│ ├── auth.js               # Usuarios y login
│ ├── auth-guard.js         # Protección de rutas
│ ├── deposit.js            # Depósitos y retiros
│ ├── menu.js               # Lógica del menú principal
│ ├── sendmoney.js          # Envío de dinero y contactos
│ ├── transactions.js       # Listado y filtros de movimientos
│ 
├── index.html              # Login
├── menu.html               # Menú principal
├── deposit.html            # Depósitos y retiros
├── sendmoney.html          # Envío y retiro de dinero
├── transactions.html       # Últimos movimientos
└── README.md
```
---

## 💾 Persistencia de datos

Toda la información se almacena utilizando `localStorage`:
- Usuarios autenticados
- Saldo de la cuenta
- Contactos
- Historial de transacciones

Esto permite mantener los datos aunque se recargue la página.

---

## 🧪 Consideraciones
- Proyecto **100% frontend**
- No utiliza backend ni base de datos real
- Ideal para prácticas, demostraciones y portafolio académico

---

## 👨‍💻 Autor

**Maximiliano Hillmer**  
Ingeniero en Informática  
Proyecto académico / práctica frontend

---

## 📌 Próximas mejoras (ideas)
- Paginación de movimientos
- Exportar movimientos a PDF
- Validaciones avanzadas
- Integración con backend real
