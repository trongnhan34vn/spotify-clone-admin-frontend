import { instance } from ".";

export const listAdminGroupsService = async () => {
  try {
    const response = await instance(). get(
      `/api/v1/users/admin/groups/list`
    )
    return response.data;
  } catch (error: any) {
    console.log(error);
    
    console.error('[Service] Error occured when list groups of admin: ', error.message);
    throw error;
  }
}