import { api } from "~/lib/api";
import { PaginationMixin } from "./pagination.mixin";
import type { UserGroup } from "~/types/user-group";
import type { PaginationRequestParams } from "~/types/pagination";

export type GetUserGroupPaginationParams = Partial<
  PaginationRequestParams<UserGroup>
>;

class GroupService {
  _baseURL: string = "/admin/user-groups";

  async createGroup(name: string) {
    return await api.post(this._baseURL, {
      name,
    });
  }
}

export const groupService = new (PaginationMixin<
  UserGroup,
  typeof GroupService
>(GroupService))();
