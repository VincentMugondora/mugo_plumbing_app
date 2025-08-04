import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types for our data models
export interface User {
  id: string;
  email: string;
  displayName: string;
  userType: 'client' | 'provider' | 'admin';
  phone?: string;
  location?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  isActive: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  providerId?: string;
  serviceId: string;
  serviceName: string;
  description: string;
  location: string;
  budget: number;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Provider {
  id: string;
  userId: string;
  services: string[];
  location: string;
  rating: number;
  totalJobs: number;
  isAvailable: boolean;
  isApproved: boolean;
  hourlyRate: number;
  bio?: string;
  documents?: string[];
}

// User Management
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const userRef = collection(db, 'users');
  const now = Timestamp.now();
  const newUser = {
    ...userData,
    createdAt: now,
    updatedAt: now,
  };
  const docRef = await addDoc(userRef, newUser);
  return { id: docRef.id, ...newUser };
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as User;
  }
  return null;
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

// Service Management
export const getServices = async () => {
  const servicesRef = collection(db, 'services');
  const q = query(servicesRef, where('isActive', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Service[];
};

export const getService = async (serviceId: string) => {
  const serviceRef = doc(db, 'services', serviceId);
  const serviceSnap = await getDoc(serviceRef);
  if (serviceSnap.exists()) {
    return { id: serviceSnap.id, ...serviceSnap.data() } as Service;
  }
  return null;
};

// Booking Management
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
  const bookingRef = collection(db, 'bookings');
  const now = Timestamp.now();
  const newBooking = {
    ...bookingData,
    createdAt: now,
    updatedAt: now,
  };
  const docRef = await addDoc(bookingRef, newBooking);
  return { id: docRef.id, ...newBooking };
};

export const getBookingsByUser = async (userId: string) => {
  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef, 
    where('clientId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
};

export const getBookingsByProvider = async (providerId: string) => {
  const bookingsRef = collection(db, 'bookings');
  const q = query(
    bookingsRef, 
    where('providerId', '==', providerId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
};

export const updateBooking = async (bookingId: string, updates: Partial<Booking>) => {
  const bookingRef = doc(db, 'bookings', bookingId);
  await updateDoc(bookingRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

// Provider Management
export const createProvider = async (providerData: Omit<Provider, 'id'>) => {
  const providerRef = collection(db, 'providers');
  const docRef = await addDoc(providerRef, providerData);
  return { id: docRef.id, ...providerData };
};

export const getProvider = async (providerId: string) => {
  const providerRef = doc(db, 'providers', providerId);
  const providerSnap = await getDoc(providerRef);
  if (providerSnap.exists()) {
    return { id: providerSnap.id, ...providerSnap.data() } as Provider;
  }
  return null;
};

export const getAvailableProviders = async (serviceId: string, location: string) => {
  const providersRef = collection(db, 'providers');
  const q = query(
    providersRef,
    where('services', 'array-contains', serviceId),
    where('isAvailable', '==', true),
    where('isApproved', '==', true),
    orderBy('rating', 'desc'),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Provider[];
};

export const updateProvider = async (providerId: string, updates: Partial<Provider>) => {
  const providerRef = doc(db, 'providers', providerId);
  await updateDoc(providerRef, updates);
};

// Admin Functions
export const getPendingProviders = async () => {
  const providersRef = collection(db, 'providers');
  const q = query(
    providersRef,
    where('isApproved', '==', false),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Provider[];
};

export const approveProvider = async (providerId: string) => {
  const providerRef = doc(db, 'providers', providerId);
  await updateDoc(providerRef, { isApproved: true });
}; 