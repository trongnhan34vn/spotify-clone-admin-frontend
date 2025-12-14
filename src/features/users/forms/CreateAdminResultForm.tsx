
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { RouteName } from '../../../routes/route.name.enum';
import { getRoutePathByName } from '../../../routes/routes';

interface IProps {
  result: any
}
const CreateAdminResultForm = ({result}: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
        <table className="w-1/3 mb-5">
          <tbody>
            <tr>
              <td className="p-1">Username:</td>
              <td>{result?.username}</td>
            </tr>
            <tr>
              <td className="p-1">Email:</td>
              <td>{result?.email}</td>
            </tr>
            <tr>
              <td className="p-1">First Name:</td>
              <td>{result?.firstName}</td>
            </tr>
            <tr>
              <td className="p-1">Last Name:</td>
              <td>{result?.lastName}</td>
            </tr>
            <tr>
              <td className="p-1">Password:</td>
              <td>{result?.password}</td>
            </tr>
            <tr>
              <td className="p-1 py-4">Credentials File:</td>
              <td>
                <Button
                  onClick={() => {
                    window.location.href = result?.credentialsUrl ?? '';
                  }}
                  className="!w-fit !px-3 !py-1 !rounded"
                  label="Download Credentials"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button
            onClick={() => navigate(getRoutePathByName(RouteName.ADMIN))}
            className="!w-fit !border-[var(--color-primary)] !border-[1px] !rounded hover:!scale-100 hover:!bg-[var(--color-primary)] hover:!text-black group !px-2 !float-right hover: text-green-500 !bg-transparent"
            label={
              <div className="flex items-center gap-2">
                <IoIosCheckmarkCircleOutline
                  size={24}
                  className="text-green-500 group-hover:text-black transition-all duration-150 ease-in"
                />
                <p>Done</p>
              </div>
            }
          />
        </div>
      </div>
  )
}

export default CreateAdminResultForm