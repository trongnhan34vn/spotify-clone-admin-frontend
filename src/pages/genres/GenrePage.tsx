import { useMemo } from 'react';
import PageLayout from '../../layouts/PageLayout';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';
import type { ColumnDef } from '@tanstack/react-table';
import type { Genre } from '../../types/entities/genre.type';

const GenrePage = () => {
  const defGenreColumns = useMemo<ColumnDef<Genre>[]>(() => {
    const columns: ColumnDef<Genre>[] = [
      {
        accessorKey: 'code',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
      },
    ];
    return columns;
  }, []);
  return (
    <PageLayout
      title="Genre Management"
      path={getRoutePathByName(RouteName.GENRE)}
    >
      test
    </PageLayout>
  );
};

export default GenrePage;
