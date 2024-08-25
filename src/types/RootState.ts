// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { ProfileState } from '@containers/authentication/pages/Auth/slice/types';
import { ThemeState } from '@styles/theme/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export type RootState = {
  theme?: ThemeState;
  profile: ProfileState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
};
