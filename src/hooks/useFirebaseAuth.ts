import {useState, useCallback} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {doc, getDoc, setDoc} from '@react-native-firebase/firestore';
import {NavigationService} from '@src/config';
import {store} from '@src/redux-store';
import {setAuthentication, setUser} from '@src/redux-store/reducers';
import {Toast} from '@src/utils';
import {auth, db} from '../../firebaseConfig';

// Placeholder avatar URL

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const avatar = `https://i.pravatar.cc/150?img=${Math.floor(
    Math.random() * 70,
  )}`;
  const loginFirebase = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password,
      );
      const uid = userCredential.user.uid;

      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      const {
        name,
        email: userEmail,
        uid: userId,
        avatar,
      } = userSnap.data() || {};

      if (userSnap.exists) {
        Toast.success('Login successful');
        store.dispatch(setAuthentication(true));
        store.dispatch(
          setUser({name, email: userEmail, uid: userId, avatar: avatar}),
        );
      }
    } catch (err: any) {
      Toast.fail(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const signupFirebase = useCallback(
    async (email: string, password: string, name: string) => {
      setLoading(true);

      try {
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

        await setDoc(doc(db, 'users', userCredentials.user.uid), {
          name,
          email,
          uid: userCredentials.user.uid,
          avatar,
        });

        Toast.success('User created successfully');
        NavigationService.goBack();
      } catch (error: any) {
        Toast.fail(error?.message || 'Signup failed');
        console.error('Signup error:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logoutFirebase = useCallback(async () => {
    setLoading(true);
    try {
      await auth.signOut();
      Toast.success('Logout successful');
      store.dispatch(setAuthentication(false));
    } catch (error: any) {
      Toast.fail(error.message);
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    loginFirebase,
    signupFirebase,
    logoutFirebase,
  };
};
