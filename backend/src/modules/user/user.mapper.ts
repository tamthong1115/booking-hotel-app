import { Permission, RoleType, UserType } from "@shared/types/types";
import { PermissionModelType, RoleModelType, UserModelType } from "../../type/models/userType";

export function toRoleDTOs(roles: RoleModelType[]): RoleType[] {
    return (roles || []).map((role) => ({
        _id: role._id.toString(),
        name: role.name,
        description: role.description ?? "",
        permissions: (role.permissions || []).map(
            (perm: PermissionModelType): Permission => ({
                _id: perm._id.toString(),
                name: perm.name,
            }),
        ),
    }));
}

export function toUserDTO(user: UserModelType): UserType {
    return {
        _id: user._id.toString(),
        googleId: user.googleId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gender: user.gender,
        birthday: user.birthday,
        nationality: user.nationality,
        emailVerified: user.emailVerified,
        roles: toRoleDTOs(user.roles || []),
    };
}
