import type { CellContext, ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/Badge';
import Spinner, { spinner } from '../../components/Spinner';
import Table from '../../components/Table';
import { EntityCode } from '../../constants/entity.code.constant';
import { useModal } from '../../hooks/useModal';
import ListPageLayout from '../../layouts/PageLayout';
import DetailAdminModal from '../../features/users/modals/DetailAdminModal';
import Modal from '../../modals/Modal';
import { groupSelector, userSelector } from '../../redux/selector/selector';
import { reset } from '../../redux/slices/group.slice';
import {
  resetDelete,
  resetDetail,
  resetFilter,
  resetList,
  resetUpdate,
} from '../../redux/slices/user.slice';
import type { AppDispatch } from '../../redux/store';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';
import { listAdminGroupsThunk } from '../../thunks/group.thunk';
import {
  deleteAdminThunk,
  detailAdminThunk,
  listAdminsThunk,
  listUserFilterOptionThunk,
  updateAdminThunk,
} from '../../thunks/user.thunk';
import type { Pagination } from '../../types/entities/pagination.type';
import type { Query } from '../../types/entities/query.type';
import type { Group, User, UserFilterOption } from '../../types/entities/user.type';
import DeleteAdminForm from '../../features/users/forms/DeleteAdminForm';
const AdminPage = () => {
  // ====== CONFIG ====== //
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [query, setQuery] = useState<Query>({
    size: 8,
    page: 1,
    sortBy: 'createdAt',
    sortType: 'DESC',
  });
  const columns: ColumnDef<User, User>[] = [
    {
      accessorKey: 'code',
      header: 'ID',
      cell: (ctx: CellContext<User, User>) => {
        const user = ctx.row.original
        return <p className='font-bold'>{user.code}</p>
      }
    },
    {
      accessorKey: 'username',
      header: 'Account',
      cell: (ctx: CellContext<User, User>) => {
        const user = ctx.row.original;
        return (
          <div className="flex gap-2 items-center">
            <img
              className="w-9 h-9 rounded object-contain"
              src={user.image ?? 'public/images/default.png'}
              alt=""
            />
            <div className="leading-4">
              <p>{user.username}</p>
              <p className="font-light text-xs text-[var(--color-muted)]">
                {user.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'groups',
      header: 'Groups',
      cell: (ctx: CellContext<User, User>) => {
        const groups = ctx.getValue<string[]>();
        return (
          <div className="flex gap-1 max-w-2/3 whitespace-nowrap overflow-x-auto no-scrollbar">
            {groups.map(group => (
              <Badge key={group} label={group} color="gray" />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (ctx: CellContext<User, User>) => {
        const status = ctx.getValue<boolean>();
        return (
          <div>
            {status ? (
              <Badge color="green" label="Active" icon={<FaCheck />} />
            ) : (
              <Badge color="red" label="Inactive" icon={<FaXmark />} />
            )}
          </div>
        );
      },
    },

    {
      header: 'Actions',
    },
  ];
  // ====== CONFIG ====== //

  // ====== FILTER ====== //
  useEffect(() => {
    dispatch(listUserFilterOptionThunk());
    dispatch(listAdminGroupsThunk());
  }, []);

  const listFilterOptionRes = useSelector(userSelector).listFilterOption;
  const [filterOption, setFilterOption] = useState<UserFilterOption | null>();
  const [initFilterState, setInitFilterState] =
    useState<UserFilterOption | null>();

  const [isFilterReady, setFilterReady] = useState(false);
  const [adminGroups, setAdminGroups] = useState<Group[]>([]);
  const listAdminGroupRes = useSelector(groupSelector).list;

  useEffect(() => {

  }, [listAdminGroupRes]);

  useEffect(() => {
    const { data, error, loading } = listFilterOptionRes;
    if (error) {
      spinner.hide();
      return;
    }

    if (data) {
      let strictData = { ...data, id: [], username: [] };
      setFilterOption(strictData as UserFilterOption);
      setInitFilterState(strictData as UserFilterOption);
      setQuery(pre => ({ ...pre, filter: strictData }));
      setFilterReady(true);
      dispatch(resetFilter());
      return;
    }

    if (listAdminGroupRes.data) {
      setAdminGroups(listAdminGroupRes.data as Group[]);
      dispatch(reset());
    }

    if (data && listAdminGroupRes.data) {
      spinner.hide();
    }

    if (loading) {
      spinner.show();
    }
  }, [listFilterOptionRes, listAdminGroupRes]);

  const handleSearchFilterOption = (query: Record<string, string>) => {
    if (!initFilterState) {
      setFilterOption(null);
      return;
    }
    setFilterOption(() => {
      const newFilter: UserFilterOption = { ...initFilterState };

      Object.entries(query).forEach(([key, value]) => {
        const field = key as keyof UserFilterOption;

        const initialValues = initFilterState[field] ?? [];

        if (!value) {
          newFilter[field] = [...initialValues];
        } else {
          newFilter[field] = initialValues.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
          );
        }
      });

      return newFilter;
    });
  };

  const handleSelectedFilter = (field: string, data: any) => {
    const newFilter = { ...query.filter, [field]: data[field] || [] };
    setQuery(pre => ({ ...pre, filter: newFilter }));
  };
  // ====== FILTER ====== //

  // ====== LIST ====== //

  useEffect(() => {
    if (isFilterReady) dispatch(listAdminsThunk(query));
  }, [query, isFilterReady]);

  const listRes = useSelector(userSelector).list;
  const [pagination, setPagination] = useState<Pagination<User> | null>(null);

  useEffect(() => {
    if (listRes.loading) {
      spinner.show();
    } else {
      spinner.hide();
    }

    if (!listRes.data) return;
    setPagination(listRes.data as Pagination<User>);
    dispatch(resetList());

    return;
  }, [listRes]);
  // ====== LIST ====== //

  // ====== CREATE ====== //
  const handleCreateAdmin = useCallback(() => {
    navigate(getRoutePathByName(RouteName.CREATE_ADMIN));
  }, []);
  // ====== CREATE ====== //

  // ====== Pagination ====== //
  const onSelectPage = (p: number) => {
    setQuery(q => ({ ...q, page: p }));
  };
  // ====== Pagination ====== //

  // ====== DETAIL ====== //
  const [detailUser, setDetailUser] = useState<User>();
  const handleDetail = (id: string) => {
    dispatch(detailAdminThunk(id));
  };

  const plugDetailAdmin = useModal();

  const detailUserRes = useSelector(userSelector).detail;

  useEffect(() => {
    if (detailUserRes.error) {
      toast.error(detailUserRes.error);
      return;
    }
    if (detailUserRes.data) {
      setDetailUser(detailUserRes.data as User);
      plugDetailAdmin.open();
      dispatch(resetDetail());
    }
  }, [detailUserRes]);

  // ====== DETAIL ====== //

  // ====== DELETE ====== //
  const plugDeleteModal = useModal();
  const [deleteUser, setDeleteUser] = useState<any>();
  const handleDelete = (data: User) => {
    setDeleteUser({ id: data.id, username: data.username });
    // setDeleteUserId(id);
    plugDeleteModal.open();
  };

  const handleDeleteAdmin = (id: string) => {
    dispatch(deleteAdminThunk(id));
  };

  const deleteAdminRes = useSelector(userSelector).delete;

  useEffect(() => {
    const { data, loading, error } = deleteAdminRes;
    if (error) {
      spinner.hide();
      toast.error(error);
      dispatch(resetDelete());
      return;
    }

    if (data) {
      spinner.hide();
      toast.success('Admin deleted');
      plugDeleteModal.close();
      dispatch(resetDelete());
      dispatch(listAdminsThunk(query));
      return;
    }

    if (loading) {
      spinner.show();
      return;
    }
  }, [deleteAdminRes]);
  // ====== DELETE ====== //

  // ====== UPDATE ====== //
  const [editUser, setEditUser] = useState<string>();

  const onEditAdmin = (data: User) => {
    setEditUser(data.id);
    dispatch(updateAdminThunk(data));
  };

  const editAdminRes = useSelector(userSelector).update;

  useEffect(() => {
    const { data, loading, error } = editAdminRes;
    if (error) {
      spinner.hide();
      toast.error(error);
      dispatch(resetUpdate());
      return;
    }

    if (data) {
      spinner.hide();
      toast.success('Admin updated');
      dispatch(detailAdminThunk((editUser as string) ?? ''));
      dispatch(resetUpdate());
      dispatch(listAdminsThunk(query));
      dispatch(listUserFilterOptionThunk());
      return;
    }

    if (loading) {
      spinner.show();
    }
  }, [editAdminRes]);
  // ====== UPDATE ====== //

  return (
    <ListPageLayout title="Admin Management" path="/admin">
      <Table<User, User>
        data={pagination ? pagination.content : []}
        columns={columns}
        onInsert={handleCreateAdmin}
        pagination={pagination!}
        onSelectPage={onSelectPage}
        onRowDetail={handleDetail}
        onRowDelete={handleDelete}
        filterOption={filterOption}
        onSearchFilter={handleSearchFilterOption}
        onSelectFilter={handleSelectedFilter}
        selectedFilter={query.filter}
      />
      <Spinner />
      
      <DetailAdminModal
        open={plugDetailAdmin.isOpen}
        close={plugDetailAdmin.close}
        adminGroups={adminGroups}
        onEdit={onEditAdmin}
        detail={detailUser as User}
      />

      <Modal
        title="Delete Admin"
        open={plugDeleteModal.isOpen}
        closeModal={plugDeleteModal.close}
        size={'2xl'}
      >
        <DeleteAdminForm
          defaultValue={deleteUser!}
          onDelete={handleDeleteAdmin}
          onCloseModal={() => plugDeleteModal.close()}
        />
      </Modal>
    </ListPageLayout>
  );
};

export default AdminPage;
