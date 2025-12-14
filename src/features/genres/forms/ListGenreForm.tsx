import type { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import {
  detailGenreSelector,
  listGenreFilterOptionsSelector,
  listGenreSelector,
} from '../../../redux/selector/selector';
import {
  detailGenreThunk,
  listGenreFilterOptionsThunk,
  listGenreThunk,
} from '../../../thunks/genre.thunk';
import {
  GenreStatus,
  type Genre,
  type GenreFilterOption,
} from '../../../types/entities/genre.type';
import type { Query } from '../../../types/entities/query.type';
import Table from '../../../components/Table';
import type { Pagination } from '../../../types/entities/pagination.type';
import { useNavigate } from 'react-router-dom';
import { getRoutePathByName } from '../../../routes/routes';
import { RouteName } from '../../../routes/route.name.enum';
import {
  resetDetail,
  resetList,
  resetListFilterOption,
} from '../../../redux/slices/genre.slice';
import Badge from '../../../components/Badge';
import { capitalizeFirst } from '../../../types/utils/string.format';
import Spinner, { spinner } from '../../../components/Spinner';
import { useHandle } from '../../../hooks/useHandle';
import toast from 'react-hot-toast';
import { useModal } from '../../../hooks/useModal';
import DetailGenreModal from '../modal/DetailGenreModal';

const ListGenreForm = () => {
  const [query, setQuery] = useState<Query>({
    page: 1,
    size: 8,
    sortBy: 'createdAt',
    sortType: 'desc',
  });
  const navigate = useNavigate();
  const {
    data: pagination,
    error: listError,
    loading: listLoading,
  } = useFetch<Pagination<Genre>>({
    query,
    thunk: listGenreThunk,
    options: {
      selector: listGenreSelector,
      resetFn: resetList,
    },
  });

  const {
    data: filterOptions,
    error,
    loading,
  } = useFetch<GenreFilterOption>({
    thunk: listGenreFilterOptionsThunk,
    options: {
      selector: listGenreFilterOptionsSelector,
      resetFn: resetListFilterOption,
    },
  });

  useEffect(() => {
    if (loading) {
      spinner.show();
    } else {
      spinner.hide();
    }
  }, [loading]);

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
    execute,
    data: detailGenre,
    loading: detailLoading,
    error: detailError,
  } = useHandle<Genre>({
    thunk: detailGenreThunk,
    options: { selector: detailGenreSelector, resetFn: resetDetail },
  });

  const onRowDetail = (id: string) => {
    execute(id);
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
      openDetailModal()
      return;
    }
  }, [detailError, detailGenre]);

  return (
    <div>
      <Table
        data={pagination?.content ?? []}
        columns={defGenreColumns}
        pagination={pagination}
        onInsert={onCreateGenre}
        onRowDetail={onRowDetail}
        filterOption={filterOptions}
      />
      <DetailGenreModal
        detail={detailGenre as Genre}
        open={isOpenDetailModal}
        close={closeDetailModal}
      />
      <Spinner />
    </div>
  );
};

export default ListGenreForm;
