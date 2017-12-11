import { watchGetUsers, watchUpdateUser, watchGetUserSingle } from './saga';

/*ROOT SAGA*/
export default function* rootSaga() {
    yield [
        watchGetUsers(),
        watchUpdateUser(),
        watchGetUserSingle()
    ];
  }
  