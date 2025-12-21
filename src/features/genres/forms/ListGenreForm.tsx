import type { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../components/Badge';
import DeleteModal from '../../../components/DeleteModal';
import { spinner } from '../../../components/Spinner';
import { useFetch } from '../../../hooks/useFetch';
import { useHandle } from '../../../hooks/useHandle';
import { useModal } from '../../../hooks/useModal';
import {
  deleteGenreSelector,
  detailGenreSelector,
  listGenreFilterOptionsSelector,
  listGenreSelector,
  updateGenreSelector,
} from '../../../redux/selector/selector';
import {
  resetDelete,
  resetDetail,
  resetList,
  resetListFilterOption,
  resetUpdate,
} from '../../../redux/slices/genre.slice';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';
import {
  deleteGenreThunk,
  detailGenreThunk,
  listGenreFilterOptionsThunk,
  listGenreThunk,
  updateGenreThunk,
} from '../../../thunks/genre.thunk';
import {
  GenreStatus,
  type Genre,
  type GenreFilterOption,
} from '../../../types/entities/genre.type';
import type { Pagination } from '../../../types/entities/pagination.type';
import type { Query } from '../../../types/entities/query.type';
import { capitalizeFirst } from '../../../types/utils/string.format';
import DetailGenreModal from '../modal/DetailGenreModal';
import AppTable from '../../../components/table';

const ListGenreForm = () => {
  const [query, setQuery] = useState<Query>({
    page: 1,
    size: 8,
    sortBy: 'createdAt',
    sortType: 'desc',
  });
  const navigate = useNavigate();
  const [initFilterState, setInitFilterState] =
    useState<GenreFilterOption | null>();

  const { data: filterOptions, setData: setFilterOption } =
    useFetch<GenreFilterOption>({
      thunk: listGenreFilterOptionsThunk,
      options: {
        selector: listGenreFilterOptionsSelector,
        resetFn: resetListFilterOption,
        onSuccess: [
          data => setInitFilterState(data),
          data => setQuery(pre => ({ ...pre, filter: data})),
        ],
      },
    });

  const {
    data: pagination,
    loading: listLoading,
    refetch: refetchList,
  } = useFetch<Pagination<Genre>>({
    query,
    thunk: listGenreThunk,
    options: {
      selector: listGenreSelector,
      resetFn: resetList,
    },
  });

  useEffect(() => {
    if (listLoading) {
      spinner.show();
    } else {
      spinner.hide();
    }
  }, [listLoading]);

  const defGenreColumns = useMemo<ColumnDef<Genre>[]>(() => {
    const columns: ColumnDef<Genre>[] = [
      {
        accessorKey: 'code',
        header: 'ID',
        cell: value => {
          const code = value.row.original.code;
          return <div className="font-bold">{code}</div>;
        },
      },
      {
        accessorKey: 'name',
        header: 'Genre',
        cell: value => {
          const image = value.row.original.image;
          const name = value.row.original.name;
          return (
            <div className="flex items-center gap-2">
              <div className="w-12 h-10 rounded overflow-hidden">
                <img src={image} className="w-full h-full" />
              </div>
              <p>{name}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'color',
        header: 'Color',
        cell: value => {
          const color = value.row.original.color;
          return (
            <div
              style={{ backgroundColor: color }}
              className="w-10 h-6 border-white border-2 rounded"
            ></div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: value => {
          const status = value.row.original.status;
          return (
            <Badge
              icon={
                status.toLowerCase() == GenreStatus.ACTIVE.toLowerCase() ? (
                  <FaCheck />
                ) : (
                  <FaXmark />
                )
              }
              label={capitalizeFirst(status.toLowerCase())}
              color={
                status.toLowerCase() == GenreStatus.ACTIVE.toLowerCase()
                  ? 'green'
                  : 'red'
              }
            />
          );
        },
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
      },
    ];
    return columns;
  }, []);

  const onCreateGenre = () => {
    navigate(getRoutePathByName(RouteName.CREATE_GENRE));
  };

  const {
    execute: detailExecute,
    data: detailGenre,
    error: detailError,
  } = useHandle<Genre>({
    thunk: detailGenreThunk,
    options: { selector: detailGenreSelector, resetFn: resetDetail },
  });

  const onRowDetail = (id: string) => {
    detailExecute(id);
  };

  const {
    open: openDetailModal,
    isOpen: isOpenDetailModal,
    close: closeDetailModal,
  } = useModal();

  useEffect(() => {
    if (detailError) {
      toast.error(detailError);
      return;
    }
    if (detailGenre) {
      openDetailModal();
      return;
    }
  }, [detailError, detailGenre]);

  const {
    open: openDeleteModal,
    close: closeDeleteModal,
    isOpen: isDeleteModalOpen,
  } = useModal();

  const [deleteGenre, setDeleteGenre] = useState<Genre>();

  const {
    execute: deleteExecute,
    error: deleteError,
    data: deleteData,
    loading: deleteLoading,
  } = useHandle({
    thunk: deleteGenreThunk,
    options: {
      selector: deleteGenreSelector,
      resetFn: resetDelete,
    },
  });

  const handleOpenDeleteModal = (data: Genre) => {
    setDeleteGenre(data);
    openDeleteModal();
  };

  const handleDeleteGenre = (id: string) => {
    deleteExecute(id);
  };

  useEffect(() => {
    if (deleteLoading) {
      spinner.show();
      return;
    }

    spinner.hide();
  }, [deleteLoading]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      return;
    }

    if (deleteData) {
      toast.success('Genre deleted');
      closeDeleteModal();
      refetchList();
      return;
    }
  }, [deleteError, deleteData, refetchList]);

  const {
    loading: editLoading,
    error: editError,
    data: editData,
    execute,
  } = useHandle({
    thunk: updateGenreThunk,
    options: {
      selector: updateGenreSelector,
      resetFn: resetUpdate,
    },
  });

  const handleEdit = useCallback((data: Genre) => {
    execute(data);
  }, []);

  useEffect(() => {
    if (editLoading) {
      spinner.show();
    } else {
      spinner.hide();
    }
  }, [editLoading]);

  useEffect(() => {
    if (editError) {
      toast.error(editError);
      return;
    }

    if (editData) {
      toast.success('Genre updated.');
      refetchList?.();
      detailExecute?.(detailGenre?.id);
      return;
    }
  }, [editError, editData, editLoading]);

  const handleSearchFilterOption = (query: Record<string, string>) => {
    if (!initFilterState) {
      setFilterOption(undefined);
      return;
    }

    setFilterOption(() => {
      const newFilter: GenreFilterOption = { ...initFilterState };

      Object.entries(query).forEach(([key, value]) => {
        const field = key as keyof GenreFilterOption;

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

  const handleSelectPage = (p: number) => {
    setQuery(prev => ({ ...prev, page: p }));
  };

  const handleSelectedFilter = (field: string, data: any) => {
    const newFilter = { ...query.filter, [field]: data[field] || [] };
    setQuery(pre => ({ ...pre, filter: newFilter }));
  };

  return (
    <div>
      <AppTable
        data={pagination?.content ?? []}
        columns={defGenreColumns}
        pagination={pagination}
        onInsert={onCreateGenre}
        onRowDetail={onRowDetail}
        onRowDelete={handleOpenDeleteModal}
        filterOption={filterOptions}
        onSelectPage={handleSelectPage}
        onSearchFilter={handleSearchFilterOption}
        onSelectFilter={handleSelectedFilter}
        selectedFilter={query.filter}
      />

      <DetailGenreModal
        detail={detailGenre as Genre}
        open={isOpenDetailModal}
        close={closeDetailModal}
        onEdit={handleEdit}
      />

      <DeleteModal<Genre>
        open={isDeleteModalOpen}
        close={closeDeleteModal}
        title="Delete Genre"
        target={deleteGenre!}
        onDelete={handleDeleteGenre}
        type={'genre'}
      />
    </div>
  );
};

export default ListGenreForm;
