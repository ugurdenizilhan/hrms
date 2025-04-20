import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  addDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './config';
import { User, Employee, Department, LeaveRequest, UserRole, LeaveRequestStatus } from '../models';

// Kullanıcı Kimlik Doğrulama Servisleri
export const firebaseAuthService = {
  // Giriş yap
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getUserData(userCredential.user.uid);
      return { user: userData, token: await userCredential.user.getIdToken() };
    } catch (error) {
      console.error('Firebase login error:', error);
      throw error;
    }
  },

  // Çıkış yap
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Firebase logout error:', error);
      throw error;
    }
  },

  // Kullanıcı oluştur
  register: async (firstName: string, lastName: string, email: string, password: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Kullanıcı profil bilgilerini güncelle
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      // Firestore'da kullanıcı oluştur
      const userData: User = {
        id: parseInt(userCredential.user.uid.substring(0, 8), 16),
        firstName,
        lastName,
        email,
        role
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      return userData;
    } catch (error) {
      console.error('Firebase register error:', error);
      throw error;
    }
  }
};

// Kullanıcı veri işlemleri
export const firebaseUserService = {
  // Tüm kullanıcıları getir
  getUsers: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users: User[] = [];
      
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });
      
      return users;
    } catch (error) {
      console.error('Firebase getUsers error:', error);
      throw error;
    }
  },

  // Kullanıcı bilgisini getir
  getUserById: async (id: number) => {
    try {
      const q = query(collection(db, 'users'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      return querySnapshot.docs[0].data() as User;
    } catch (error) {
      console.error('Firebase getUserById error:', error);
      throw error;
    }
  },

  // Kullanıcı güncelle
  updateUser: async (id: number, userData: Partial<User>) => {
    try {
      const q = query(collection(db, 'users'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), userData);
      
      return {
        ...userDoc.data(),
        ...userData
      } as User;
    } catch (error) {
      console.error('Firebase updateUser error:', error);
      throw error;
    }
  },

  // Kullanıcı sil
  deleteUser: async (id: number) => {
    try {
      const q = query(collection(db, 'users'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      await deleteDoc(doc(db, 'users', querySnapshot.docs[0].id));
    } catch (error) {
      console.error('Firebase deleteUser error:', error);
      throw error;
    }
  }
};

// Çalışan veri işlemleri
export const firebaseEmployeeService = {
  // İşe alım fonksiyonu
  addEmployee: async (employee: Omit<Employee, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'employees'), employee);
      const newEmployee = { 
        id: parseInt(docRef.id.substring(0, 8), 16),
        ...employee 
      } as Employee;
      
      await updateDoc(docRef, { id: newEmployee.id });
      return newEmployee;
    } catch (error) {
      console.error('Firebase addEmployee error:', error);
      throw error;
    }
  },

  // Tüm çalışanları getir
  getEmployees: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employees: Employee[] = [];
      
      querySnapshot.forEach((doc) => {
        employees.push(doc.data() as Employee);
      });
      
      return employees;
    } catch (error) {
      console.error('Firebase getEmployees error:', error);
      throw error;
    }
  }
};

// Yardımcı fonksiyonlar
async function getUserData(uid: string): Promise<User> {
  const docSnap = await getDoc(doc(db, 'users', uid));
  
  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    throw new Error('Kullanıcı bulunamadı');
  }
} 