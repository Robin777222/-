// Drop-in replacement for the Claude-artifact-only `window.storage` API,
// backed by real Firebase (Firestore + Anonymous Auth). App.jsx calls
// `window.storage.get/set/delete/list(...)` exactly like it did inside the
// Claude artifact - this file is the only thing that changed underneath it.
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC_caQELUAd8Q1b7-3mAC4TEHTAirHN-LY',
  authDomain: 'linguist-d4211.firebaseapp.com',
  projectId: 'linguist-d4211',
  storageBucket: 'linguist-d4211.firebasestorage.app',
  messagingSenderId: '806530060002',
  appId: '1:806530060002:web:d93d10daf4db4f7e6258bb',
  measurementId: 'G-QQ5G5F22RD',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUid = null;
let resolveAuthReady;
const authReady = new Promise((resolve) => { resolveAuthReady = resolve; });

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUid = user.uid;
    resolveAuthReady();
  }
});
signInAnonymously(auth).catch((err) => console.error('Anonymous sign-in failed:', err));

async function ensureUid() {
  if (!currentUid) await authReady;
  return currentUid;
}

function refFor(key, shared, uid) {
  return shared ? doc(db, 'shared', key) : doc(db, 'users', uid, 'data', key);
}

export const storage = {
  async get(key, shared = false) {
    const uid = shared ? null : await ensureUid();
    const snap = await getDoc(refFor(key, shared, uid));
    if (!snap.exists()) throw new Error(`storage key not found: ${key}`);
    const data = snap.data();
    return { key, value: data.value, shared };
  },

  async set(key, value, shared = false) {
    const uid = shared ? null : await ensureUid();
    await setDoc(refFor(key, shared, uid), { value, updatedAt: Date.now() });
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    const uid = shared ? null : await ensureUid();
    await deleteDoc(refFor(key, shared, uid));
    return { key, deleted: true, shared };
  },

  // Not used by the game today (App.jsx never calls storage.list), kept as a
  // harmless stub so nothing throws if that ever changes.
  async list(prefix = '', shared = false) {
    return { keys: [], prefix, shared };
  },
};

// The game code calls `window.storage.*` directly (that's how it worked
// inside the Claude artifact) - so we expose it the same way here.
window.storage = storage;
