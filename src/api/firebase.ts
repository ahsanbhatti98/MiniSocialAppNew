import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {NavigationService} from '@src/config';
import {store} from '@src/redux-store';
import {setAuthentication} from '@src/redux-store/reducers';
import {Toast} from '@src/utils';
import {auth, db} from '../../firebaseConfig';
import firestore, {doc, getDoc, setDoc} from '@react-native-firebase/firestore';

// export const db = getFirestore(app);

const loginFirebase = async (email: string, password: string) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCredential.user.uid;

    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // User profile exists → go to main app
      Toast.success('Login successful');
      store.dispatch(setAuthentication(true));
    }
  } catch (err: any) {
    Toast.fail(err?.message || 'Login failed');
  }
};
// await auth
//   .signInWithEmailAndPassword(email, password)
//   .then(() => {
//     Toast.success('Login successful');
//     store.dispatch(setAuthentication(true));
//   })
//   .catch(error => {
//     Toast.fail(error.message);
//     console.error('Login error:', error);
//     throw error; // Re-throw the error for further handling
//   });
const signupFirebase = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    console.log('Creating user with email:', email);
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (
      !userCredentials ||
      !userCredentials.user ||
      !userCredentials.user.uid
    ) {
      Toast.fail('User credentials are invalid or missing UID');
      throw new Error('User credentials are invalid or missing UID');
    }

    const userUid = userCredentials.user.uid;

    console.log('User created:', userCredentials.user.uid);

    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      name,
      email,
      uid: userCredentials.user.uid,
    });

    Toast.success('User created successfully');
    NavigationService.goBack();
  } catch (error: any) {
    Toast.fail(error?.message || 'Signup failed');
    console.error('Signup error:', error);
    throw error; // Re-throw the error for further handling
  }
};

const logoutFirebase = () =>
  auth
    .signOut()
    .then(() => {
      Toast.success('Logout successful');
      store.dispatch(setAuthentication(false));
    })
    .catch(error => {
      Toast.fail(error.message);
      console.error('Logout error:', error);
      throw error; // Re-throw the error for further handling
    });

export {loginFirebase, logoutFirebase, signupFirebase};
