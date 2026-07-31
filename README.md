# Reservas Spinning USM
## Pure Endurance — by Jorge Henríquez

Sistema de reservas para el Taller de Spinning USM.
Martes y Jueves · 12:30 hrs · Bloque 7-8

### Credenciales de prueba
- **Admin:** jorge.henriquezh@usm.cl / Admin123
- **Alumno demo:** maria.gonzalez@sansano.usm.cl / Spinning1

### Cómo usar
Abre `index.html` en cualquier navegador, o sube a Netlify para acceso público.

### Subir a Netlify
1. Sube este repositorio a GitHub
2. En netlify.com → "Import from Git" → selecciona el repo
3. Listo — obtienes un link público

### Versión
Firebase Firestore — datos compartidos en la nube y en tiempo real entre web y app (todos los dispositivos son espejo).

### Configurar Firebase (obligatorio)
1. Entra a https://console.firebase.google.com y crea un proyecto.
2. ⚙️ Configuración del proyecto → "Tus apps" → ícono Web `</>` → registra una app.
3. Copia el objeto `firebaseConfig` que te muestra y pégalo en **`firebase-config.js`**.
4. Menú "Compilación" → "Firestore Database" → "Crear base de datos".
5. Pega estas reglas en la pestaña "Reglas" (suficiente para empezar):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /spinning/{doc} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ Estas reglas dejan la base de datos abierta (cualquiera con el link puede leer/escribir).
> Sirve para arrancar; para mayor seguridad conviene añadir autenticación más adelante.

### Configurar Authentication (login y recuperación por correo)
El login usa **Firebase Authentication** (correos de recuperación reales).
1. Firebase Console → **Authentication** → **Comenzar**.
2. Pestaña **Sign-in method** → habilita **Correo electrónico/contraseña**.
3. Pestaña **Users** → **Agregar usuario** → crea la cuenta del **admin**
   (correo `jorge.henriquezh@usm.cl` y la contraseña que quieras). Ese correo
   debe coincidir con `window.ADMIN_EMAIL` en `firebase-config.js`.
4. Los alumnos se crean solos al registrarse en la app.

> La recuperación de contraseña envía un **enlace real** al correo (lo manda Firebase).
> Ya no se usan preguntas de seguridad ni WhatsApp.

### Notas
- Ya **no** se usa localStorage: web y app comparten todo al instante (Firestore).
- Los alumnos demo (María, Juan, etc.) **no** pueden iniciar sesión porque no tienen
  cuenta en Authentication; el admin puede eliminarlos desde el panel.
