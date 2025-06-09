import { useQuery } from "@tanstack/react-query";
import { userService,
  type GetUserPaginationParams,
} from "~/services/user.service";
import { userKeys } from "../_queries/key";

const useUserPagination = (args: GetUserPaginationParams) => {
  return useQuery({
    queryKey: userKeys.all.concat(args),
    queryFn: () => userService.getUserPagination(args),
    initialData: {
      data: [],
      pagination: {
        page: args.page,
        total_page: 0,
        total_rows: 0,
      },
    },
  });
};

export default useUserPagination;
