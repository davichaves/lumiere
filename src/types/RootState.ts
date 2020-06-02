import { RouterState } from 'connected-react-router';
import { SignInPageState } from 'app/containers/SignInPage/types';
import { SignUpPageState } from 'app/containers/SignUpPage/types';
import { HomePageState } from 'app/containers/HomePage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  router?: RouterState;
  signInPage?: SignInPageState;
  signUpPage?: SignUpPageState;
  homePage?: HomePageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
