import { UserModel } from "./user";
import { UserDTO } from "@modules/user/user.dto";

export function toUserDTO(user: UserModel): UserDTO {
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
        roles: user.roles.map((role) => role.toString()),
    };
}
