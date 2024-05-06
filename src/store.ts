import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import packageReducer from 'features/packages/reducers';
import { packagesApi } from 'features/packages/api';

const store = configureStore({
  reducer: {
    packages: packageReducer,
    // Add the generated reducer as a specific top-level slice
    [packagesApi.reducerPath]: packagesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(packagesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;

export default store;
