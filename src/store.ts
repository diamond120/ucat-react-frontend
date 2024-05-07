import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import packagesReducer from 'features/packages/reducers';
import sessionsReducer from 'features/sessions/reducers';
import { packagesApi } from 'features/packages/api';
import { sessionsApi } from 'features/sessions/api';

const store = configureStore({
  reducer: {
    packages: packagesReducer,
    sessions: sessionsReducer,
    // Add the generated reducer as a specific top-level slice
    [packagesApi.reducerPath]: packagesApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(packagesApi.middleware, sessionsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;

export default store;
