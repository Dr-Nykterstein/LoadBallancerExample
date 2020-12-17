import React, {
  useState,
  useContext,
  PropsWithChildren,
  ElementType,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Site, Page as TablerPage, Button } from 'tabler-react';

// import AuthContext from '../../context/AuthContext';
// import UserProfileContext from '../../context/UserProfileContext';
import ROUTES from '../../utils/routes';
import NavBar from '../../components/NavBar';
// import { useApiLogout } from '../../hooks/api/auth';

import './index.scss';

import logo from '../../logo.svg';

const newNavBarItem = (pathname, to, value, icon, useExact) => ({
  to,
  icon,
  value,
  useExact,
  active: pathname === to,
  LinkComponent: Link,
});

const AUTH_BUTTONS = [
  {
    value: 'Login',
    outline: true,
    to: ROUTES.LOGIN,
  },
  {
    value: 'Sign up',
    to: ROUTES.REGISTER,
  },
];

export const Page = ({
  children,
  navbarBefore,
}) => {
  const baseClassName = 'page-template';
  // const { pathname } = useLocation();
  // const [httpLogout] = useApiLogout();
  // const { logout, isAuthenticated } = useContext(AuthContext);
  const isAuthenticated = false;
  const username = 'username';
  const avatar = '';
  // const { username, avatar } = useContext(UserProfileContext) || {};
  const [navCollapse, setNavCollapse] = useState(true);
  // const navBarItems = [
  //   newNavBarItem(pathname, ROUTES.HOME, 'Feed', 'home', ROUTES.HOME),
  //   isAuthenticated &&
  //   newNavBarItem(
  //     pathname,
  //     `${ROUTES.USERS}/${username}`,
  //     'My profile',
  //     'user',
  //     ROUTES.CONTESTS.NEW,
  //   ),
  //   newNavBarItem(
  //     pathname,
  //     ROUTES.CONTESTS.NEW,
  //     'New',
  //     'plus',
  //     ROUTES.CONTESTS.NEW,
  //   ),
  //   newNavBarItem(
  //     pathname,
  //     ROUTES.LOAD_BALANCER,
  //     'Load balancing example',
  //     'server',
  //     ROUTES.LOAD_BALANCER,
  //   ),
  // ].filter(Boolean);
  const accountDropdownProps = {
    avatarURL: avatar,
    name: `@${username}`,
    // description: 'Administrator',
    options: [
      { isDivider: true },
      { icon: 'help-circle', value: 'Need help?' },
      {
        icon: 'log-out',
        value: 'Sign out',
        onClick: async () => {
          // await httpLogout();
          // logout(ROUTES.LOGIN);
        },
      },
    ],
  };

  return (
    <TablerPage className={baseClassName}>
      <header className={`${baseClassName}__header`}>
        <Site.Header
          href={ROUTES.HOME}
          alt="Let's Choose"
          imageURL={logo}
          navItems={
            !isAuthenticated && (
              <Button.List>
                {AUTH_BUTTONS.map(({ value, to, outline = false }) => (
                  <Link
                    to={to}
                    key={to}
                    className={`btn btn-${outline ? 'outline-' : ''}primary`}
                  >
                    {value}
                  </Link>
                ))}
              </Button.List>
            )
          }
          accountDropdown={isAuthenticated ? accountDropdownProps : undefined}
          onMenuToggleClick={() => setNavCollapse((prevState) => !prevState)}
        />
        <NavBar
          tabbed
          className={`${baseClassName}__navbar`}
          collapse={navCollapse}
          // itemsObjects={navBarItems}
          before={navbarBefore}
        />
      </header>
      <TablerPage.Main className={`${baseClassName}__main`}>
        {children}
      </TablerPage.Main>
    </TablerPage>
  );
};
export default Page;