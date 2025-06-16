import User from "../../modules/user/user";

export const userTemplates = {
    user: {
        email: "testuser@example.com",
        password: "Password!1",
        firstName: "Test",
        lastName: "User",
        roles: ["user"],
        emailVerified: true,
    },
    admin: {
        email: "testadmin@example.com",
        password: "AdminPass!1",
        firstName: "Admin",
        lastName: "User",
        roles: ["admin"],
        emailVerified: true,
    },
};

export async function createTestUser(type: keyof typeof userTemplates = "user") {
    const data = userTemplates[type];
    await User.deleteMany({ email: data.email });
    const user = new User(data);
    await user.save();
    return user;
}

export async function deleteTestUser(type: keyof typeof userTemplates = "user") {
    const data = userTemplates[type];
    await User.deleteMany({ email: data.email });
}
