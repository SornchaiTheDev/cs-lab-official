import usePagination from "~/hooks/usePagination";
import { queryKeys } from "~/queryKeys";
import {
  type GetUserGroupPaginationParams,
  groupService,
} from "~/services/group.service";

function useUserGroupPagination(args: GetUserGroupPaginationParams) {
  return usePagination({
    queryKey: queryKeys.user_group.allWithParams(args),
    queryFn: () => groupService.getPagination(args),
  });
}

export default useUserGroupPagination;
