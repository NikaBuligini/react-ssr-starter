import prodConfigureStore from './configureStore.prod';
import devConfigureStore from './configureStore.dev';

export default (process.env.NODE_ENV === 'production' ? prodConfigureStore : devConfigureStore);
