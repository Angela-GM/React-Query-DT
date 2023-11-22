
export { productsApi } from './api/productsApi';

export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';

// Hooks
export { useProducts } from '../hooks/useProducts';
export { useProduct } from '../hooks/useProduct';
export { usePrefetchProduct } from '../hooks/usePreFetchProduct';




export type { Product } from './interfaces/product'; //poner la palabra type para forzar y decir que lo que exporto es una interfaz

export { StoreLayout } from './layout/StoreLayout';


export { CompleteListPage } from './pages/CompleteListPage';
export { MensPage } from './pages/MensPage';
export { ProductById } from './pages/ProductById';

export { NewProduct } from './pages/NewProduct';
export { WomensPage } from './pages/WomensPage';

export * as productActions from './services/actions';