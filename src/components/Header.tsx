import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { authSelector } from '../redux/selector/selector';
import { resetSignOut } from '../redux/slices/auth.slice';
import type { AppDispatch } from '../redux/store';
import { RouteName } from '../routes/route.name.enum';
import { getRoutePathByName } from '../routes/routes';
import { signOutThunk } from '../thunks/auth.thunk';
import DivideBar from './DivideBar';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const signOut = () => {
    navigate(getRoutePathByName(RouteName.SIGN_IN));
    if (username) dispatch(signOutThunk(username));
    localStorage.removeItem('username');
    // setTimeout(() => , 100);
  };
  const signOutRes = useSelector(authSelector).signOut;

  useEffect(() => {
    const { error } = signOutRes;
    if (error) {
      toast.error(error);
      dispatch(resetSignOut());
      return;
    }
  }, [signOutRes]);

  return (
    <div className="h-16 flex items-center z-50 relative justify-between p-2">
      {/* Logo */}
      <div className="flex justify-center w-18">
        <Logo width={32} height={32} />
      </div>
      {/* Functional Bar */}
      <div className="flex justify-center gap-8 items-center">
        <IoNotificationsOutline
          className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in"
          size={24}
        />

        <Dropdown
          button={
            <div className="w-12 h-12 z-20 rounded-[50%] cursor-pointer hover:scale-105 transition-all duration-200 ease-in bg-[#1f1f1f] overflow-hidden flex items-center justify-center">
              <img
                className="w-8 h-8 rounded-[50%]"
                src="/images/default.png"
                alt=""
              />
            </div>
          }
        >
          <DropdownItem
            className="!cursor-default hover:!bg-transparent "
            label={
              <div className='p-2'>
                <p className="text-start">{username}</p>
                <p className="text-xs text-[var(--color-muted)] font-light">
                  trongnhan34vn@gmail.com
                </p>
              </div>
            }
          />
          <DivideBar />
          <DropdownItem className='py-1 px-2 hover:bg-white/4 transition-all duration-150 ease-in !rounded-none' label={'Account'} />
          <DropdownItem
            onClick={() => signOut()}
            className="text-red-500 py-1 px-2 hover:bg-white/4 transition-all duration-150 ease-in !rounded-none"
            label={'Sign Out'}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
