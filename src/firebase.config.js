import { getApp, getApps, initializeApp} from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyACP_u9doJyojjBljZ3qu9hvI81qZq7bM8",
    authDomain: "knock-knock-89c26.firebaseapp.com",
    databaseURL: "https://knock-knock-89c26-default-rtdb.firebaseio.com",
    projectId: "knock-knock-89c26",
    storageBucket: "knock-knock-89c26.appspot.com",
    messagingSenderId: "1098322553078",
    appId: "1:1098322553078:web:d898cf668ea07c052824d7"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

export { app, db, storage };


