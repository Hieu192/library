import { combineReducers } from 'redux';
// slices
import appReducer from './slices/app';
import authReducer from './slices/auth';
import storage from 'redux-persist/lib/storage';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  blacklist: ["app"],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export { rootPersistConfig, rootReducer };
