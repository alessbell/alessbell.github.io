import * as React from 'react';
import ToggleBase from './toggleBase';
import { ThemeContext } from './layout';
import sunglasses from '../../content/assets/sunglasses.png';
import sparkles from '../../content/assets/sparkles.png';
import '../css/toggle.css';

declare global {
  interface Window {
    __setPreferredTheme: (theme: 'dark' | 'light') => void;
  }
}

const Toggle = (): JSX.Element => {
  const theme = React.useContext(ThemeContext);
  return (
    <div>
      <ToggleBase
        icons={{
          checked: (
            <img
              src={sparkles}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
            />
          ),
          unchecked: (
            <img
              src={sunglasses}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
            />
          ),
        }}
        checked={theme === 'dark'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')
        }
      />
    </div>
  );
};

export default Toggle;
