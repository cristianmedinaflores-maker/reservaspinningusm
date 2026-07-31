// ════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE FIREBASE  —  Spinning USM
// ════════════════════════════════════════════════════════════════════════
//
//  Datos del proyecto Firebase (apiKey, etc.). La apiKey de una app web es
//  pública por diseño; la seguridad se controla con las reglas de Firestore.
//
// ════════════════════════════════════════════════════════════════════════

var firebaseConfig = {
  apiKey: "AIzaSyAv-8J8NrphLMi98dNZj-_fN6_QUbVvvgI",
  authDomain: "reservaspinningusm.firebaseapp.com",
  projectId: "reservaspinningusm",
  storageBucket: "reservaspinningusm.firebasestorage.app",
  messagingSenderId: "69234557393",
  appId: "1:69234557393:web:b0caca552f792d59dd60f0",
  measurementId: "G-3BD00EEQ81"
};

// Correo del administrador (quien inicia con privilegios de admin).
// Debe coincidir con el usuario que crees en Firebase → Authentication.
window.ADMIN_EMAIL = "jorge.henriquezh@usm.cl";

// ── No necesitas tocar nada debajo de esta línea ─────────────────────────
window.FIREBASE_READY =
  !!firebaseConfig.apiKey && firebaseConfig.apiKey.indexOf("PEGAR") < 0;

if (window.FIREBASE_READY) {
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
  // Soporte sin conexión (la app sigue funcionando offline y sincroniza al volver).
  try {
    window.db.enablePersistence({ synchronizeTabs: true }).catch(function (e) {
      console.warn("Persistencia offline no disponible:", e && e.code);
    });
  } catch (e) {}
} else {
  console.error(
    "⚠️ Firebase no está configurado. Edita firebase-config.js y pega tus claves."
  );
}
