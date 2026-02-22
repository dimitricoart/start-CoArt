import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useNavigate } from "react-router";
import { useApi } from "@framework/mui-form";
import { UserRole } from "@framework/types";
import { getFirebaseApp } from "../firebase";

export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IProfile {
  id?: string;
  displayName?: string;
  email?: string;
  imageUrl?: string;
  language?: string;
  userRoles: Array<UserRole>;
  merchant?: { id: string };
}

const defaultProfile: IProfile = {
  userRoles: [UserRole.CUSTOMER],
};

const UserContext = createContext<{
  user: IUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  profile: IProfile;
  isAuthenticated: () => boolean;
  logIn: (values: { email: string; password: string }, redirect?: string) => Promise<void>;
  signUp: (
    values: { email: string; password: string; displayName?: string },
    redirect?: string,
    options?: { isProfileRequestRequired?: boolean },
  ) => Promise<void>;
  getProfile: (redirect?: string) => Promise<void>;
  setProfile: (data: Partial<IProfile>) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
} | null>(null);

function toIUser(u: FirebaseUser | null): IUser | null {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email ?? null,
    displayName: u.displayName ?? null,
    photoURL: u.photoURL ?? null,
  };
}

export const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfileState] = useState<IProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const app = getFirebaseApp();
    if (!app) {
      setIsLoading(false);
      return;
    }
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, u => {
      setFirebaseUser(u);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!firebaseUser) {
      setProfileState(defaultProfile);
      return;
    }
    api
      .fetchJson<IProfile & { merchant?: { id: string } | null }>({ url: "/profile/" })
      .then(p => {
        if (!p) return setProfileState(defaultProfile);
        setProfileState({
          ...p,
          merchant: p.merchant ? { id: p.merchant.id } : undefined,
        });
      })
      .catch(() => setProfileState(defaultProfile));
  }, [firebaseUser?.uid, api]);

  const login = useCallback(async (_email: string, _password: string) => {
    const app = getFirebaseApp();
    if (!app) throw new Error("Firebase not initialized");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(getAuth(app), _email, _password);
  }, []);

  const logIn = useCallback(
    async (values: { email: string; password: string }, redirect?: string) => {
      await login(values.email, values.password);
      if (redirect) navigate(redirect);
    },
    [login, navigate],
  );

  const signUp = useCallback(
    async (
      values: { email: string; password: string; displayName?: string },
      redirect?: string,
    ) => {
      const app = getFirebaseApp();
      if (!app) throw new Error("Firebase not initialized");
      const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
      const auth = getAuth(app);
      const cred = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (values.displayName) {
        await updateProfile(cred.user, { displayName: values.displayName });
      }
      if (redirect) navigate(redirect);
    },
    [navigate],
  );

  const getProfile = useCallback(
    async (redirect?: string) => {
      if (redirect) navigate(redirect);
    },
    [navigate],
  );

  const setProfile = useCallback(
    async (data: Partial<IProfile>) => {
      const updated = await (api as { fetchJson: (o: { url: string; method?: string; data?: object }) => Promise<IProfile> })
        .fetchJson({ url: "/profile/", method: "PUT", data: data as Record<string, unknown> });
      if (updated) setProfileState(updated);
    },
    [api],
  );

  const logout = useCallback(async () => {
    const app = getFirebaseApp();
    if (app) await getAuth(app).signOut();
    setProfileState(defaultProfile);
  }, []);

  const getIdToken = useCallback(async (): Promise<string | null> => {
    const u = firebaseUser ?? getAuth(getFirebaseApp()!).currentUser;
    return u ? u.getIdToken() : null;
  }, [firebaseUser]);

  const value = {
    user: toIUser(firebaseUser),
    firebaseUser,
    isLoading,
    profile,
    isAuthenticated: () => !!firebaseUser,
    logIn,
    signUp,
    getProfile,
    setProfile,
    logout,
    getIdToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser<T = IProfile>() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
