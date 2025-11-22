import { BiSolidAlbum, BiSolidCategory } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { IoIosMusicalNotes } from 'react-icons/io';
import { LiaUsersCogSolid } from 'react-icons/lia';
import {
  MdOutlineAudiotrack,
  MdSpaceDashboard,
  MdSpatialAudioOff,
} from 'react-icons/md';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteName } from '../routes/route.name.enum';
import { getRoutePathByName } from '../routes/routes';

const SidebarWrapper = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const ICON_SIZE = 24;
  const isActiveParent = (subs?: { path?: string }[]) => {
    if (!subs) return false;
    return subs.some(sub => sub.path && pathname.startsWith(sub.path));
  };
  const isActiveItem = (path: string | undefined) => {
    if (!path) return false;
  
    if (pathname.includes(path)) {
      return true;
    }
    return false;
  };

  const sidebarItems = [
    {
      title: 'Dashboard',
      path: getRoutePathByName(RouteName.DASHBOARD),
      icon: <MdSpaceDashboard size={ICON_SIZE} />,
    },
    {
      title: 'Admin Management',
      path: getRoutePathByName(RouteName.ADMIN),
      icon: <LiaUsersCogSolid size={ICON_SIZE} />,
    },
    {
      title: 'User Management',
      path: getRoutePathByName(RouteName.USER),
      icon: <HiUsers size={ICON_SIZE} />,
    },
    {
      title: 'Artist Management',
      path: getRoutePathByName(RouteName.ARTIST),
      icon: <MdSpatialAudioOff size={ICON_SIZE} />,
    },
    {
      title: 'Music Management',
      icon: <IoIosMusicalNotes size={ICON_SIZE} />,
      subs: [
        {
          title: 'Album',
          icon: <BiSolidAlbum size={ICON_SIZE} />,
          path: '',
        },
        {
          title: 'Track',
          icon: <MdOutlineAudiotrack size={ICON_SIZE} />,
          path: '',
        },
        {
          title: 'Genre',
          icon: <BiSolidCategory size={ICON_SIZE} />,
          path: getRoutePathByName(RouteName.GENRE),
        },
      ],
    },
  ];

  const handleNavigate = (path: any) => {
    if (!path) {
      console.error('Path Not Found');
    }
    navigate(path);
  };
  return (
    <div className="w-[420px] h-full overflow-hidden rounded">
      <Sidebar
        className="!border-none text-sm"
        rootStyles={{
          ['[data-testid="ps-sidebar-container-test-id"]']: {
            backgroundColor: 'var(--color-secondary-background)',
          },
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--color-secondary-background)',
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              transition: 'all 0.2s ease-in',
              backgroundColor: 'var(--color-secondary-background)',
              root: {
                color: '#fff',
                backgroundColor: 'var(--color-secondary-background)',
                '&:hover': {
                  backgroundColor:
                    'var(--color-secondary-background-hover) !important',
                },
              },
              '&:hover': {
                backgroundColor:
                  'var(--color-secondary-background-hover) !important',
              },
            },
          }}
          className="bg-[var(--color-secondary-background)]"
        >
          {sidebarItems.map(item => {
            if (item.path && !item.subs) {
              return (
                <MenuItem
                  onClick={() => handleNavigate(item.path)}
                  style={{
                    backgroundColor: isActiveItem(item.path)
                      ? 'var(--color-secondary-background-hover)'
                      : 'var(--color-secondary-background)',
                  }}
                  key={item.title}
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <p>{item.title}</p>
                  </div>
                </MenuItem>
              );
            }
            return (
              <SubMenu
                style={{
                  backgroundColor: isActiveParent(item.subs)
                    ? 'var(--color-secondary-background-hover)'
                    : 'var(--color-secondary-background)',
                }}
                key={item.title}
                label={
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <p>{item.title}</p>
                  </div>
                }
              >
                {item.subs?.map(is => {
                  return (
                    <MenuItem
                      onClick={() => handleNavigate(is.path)}
                      key={is.title}
                      style={{
                        backgroundColor: isActiveItem(is.path)
                          ? 'var(--color-secondary-background-hover)'
                          : 'var(--color-secondary-background)',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {is.icon}
                        <p>{is.title}</p>
                      </div>
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarWrapper;
