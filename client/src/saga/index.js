import { all } from 'redux-saga/effects';

import { signupWatcher } from '../container/auth/Signup/Saga';
// import { loginWatcher } from '../container/auth/Login/Saga';
import { homePageWatcher } from '../container/homePage/Saga';
import { shoppingPageWatcher } from '../container/shopping/Saga';

export default function* sagaWatchers() {
    yield all([
        homePageWatcher(),
        shoppingPageWatcher(),
        signupWatcher()
        // loginWatcher()
    ])
}