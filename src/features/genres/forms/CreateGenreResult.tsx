import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';
import type { Genre } from '../../../types/entities/genre.type';

interface IProps {
  result: Genre;
}
const CreateGenreResult = ({ result }: IProps) => {
  console.log('result', result);

  const navigate = useNavigate();
  return (
    <div>
      <table className="w-full table table-auto">
        <tbody>
          <tr>
            <td width={'10%'} className="align-middle font-bold py-3">
              Name:
            </td>
            <td className="align-middle">{result?.name}</td>
          </tr>
          <tr>
            <td width={'10%'} className="align-middle font-bold py-3">
              Code:
            </td>
            <td className="align-middle py-3">{result?.code}</td>
          </tr>
          <tr>
            <td width={'10%'} className="align-middle font-bold py-3">
              Description:
            </td>
            <td className="align-middle py-3"> <div dangerouslySetInnerHTML={{__html: result?.description ?? <></>}}></div></td>
          </tr>
          <tr>
            <td className="font-bold">Color:</td>
            <td>
              <div
                style={{ backgroundColor: result?.color ?? '#000' }}
                className="px-10 border-2 rounded py-4 w-fit"
              ></div>
            </td>
          </tr>
          <tr>
            <td className="font-bold">Image:</td>
            <td>
              <div className="border-2 w-40 h-30 my-3 rounded">
                <img
                  className="w-full h-full"
                  src={result?.image ?? 'images/default.png'}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-2">
        <Button
          onClick={() => navigate(getRoutePathByName(RouteName.GENRE))}
          className="!w-fit !p-3 float-right"
          label="Back to list"
        />
      </div>
    </div>
  );
};

export default CreateGenreResult;
