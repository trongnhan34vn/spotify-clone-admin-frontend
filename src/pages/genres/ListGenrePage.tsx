import Spinner from '../../components/Spinner';
import ListGenreForm from '../../features/genres/forms/ListGenreForm';
import PageLayout from '../../layouts/PageLayout';
import { RouteName } from '../../routes/route.name.enum';
import { getRoutePathByName } from '../../routes/routes';

const GenrePage = () => {
  return (
    <PageLayout
      title="Genre Management"
      path={getRoutePathByName(RouteName.GENRE)}
    >
      <ListGenreForm />
      <Spinner />
    </PageLayout>
  );
};

export default GenrePage;
