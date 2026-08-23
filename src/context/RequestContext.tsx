import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RequestItem {
  id: string;
  model: string;
  quantity: number;
}

interface RequestContextType {
  items: RequestItem[];
  addItem: (item: Omit<RequestItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearRequest: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  requestCount: number;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addItem = (newItem: Omit<RequestItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) => (i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearRequest = () => setItems([]);

  const requestCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <RequestContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearRequest, isDrawerOpen, setIsDrawerOpen, requestCount }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
}
