import { http } from ".";

export const listAdminGroupsService = async () => {
  try {
    const GROUP = 'admin';
    const response = await http(). get(
      `/api/v1/users/groups/list?group=${GROUP}`
    )
    return response.data;
  } catch (error: any) {
    console.log(error);
    
    console.error('[Service] Error occured when list groups of admin: ', error.message);
    throw error;
  }
}