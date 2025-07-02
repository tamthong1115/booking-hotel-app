import { Role } from "@modules/user/role";
import { User } from "@modules/user/user";
import { UserDTO } from "@modules/user/user.dto";


export function toUserDTOWithRoleNames(user: User & { roles: (string | Role)[] }): UserDTO {
    return {
        id: user._id.toString(),
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
        roles: user.roles.map((role: string | Role ) =>
            typeof role === "string" ? role : role.name
        ),
    };
}