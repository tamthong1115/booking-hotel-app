import "module-alias/register";
import { PermissionModel, Permission } from "@modules/user/permission";
import { RoleModelType, RoleModel } from "@modules/user/role";
import UserModel, { User } from "@modules/user/user";
import bcrypt from "bcryptjs";
import connectToDatabase from "@utils/connectToDatabase";

connectToDatabase();

const permissionsList = [
    // 🛠 System Management
    "dashboard:access",
    "user:manage",
    "role:manage",
    "permission:manage",

    // 🏨 Hotel Chain Management
    "hotel:create",
    "hotel:update",
    "hotel:delete",
    "hotel:view",

    // 🛏 Room Management
    "room:create",
    "room:update",
    "room:delete",
    "room:view",

    // 📅 Booking Management
    "booking:create",
    "booking:view",
    "booking:update",
    "booking:cancel",

    // 🧾 Payments
    "payment:charge",
    "payment:refund",
    "payment:view",

    // 🧑‍💼 Staff & Reception
    "reception:checkin",
    "reception:checkout",
    "guest:view",

    // 💬 Review System
    "review:create",
    "review:delete",
    "review:view",

    // 👤 User-Specific (formerly Guest)
    "user:booking:view",
    "user:booking:cancel",
    "user:profile:update",
    "user:password:update",
    "user:review:create",
];

async function seedPermissions(): Promise<Permission[]> {
    const permissionDocs = [];

    for (const per of permissionsList) {
        const doc = await PermissionModel.findOneAndUpdate<Permission>(
            { name: per },
            { name: per },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );
        permissionDocs.push(doc);
    }

    console.log("✅ Permissions seeded");
    return permissionDocs;
}

async function seedRoles(permissions: Awaited<Promise<Permission[]>>): Promise<Role[]> {
    const get = (...names: string[]) => {
        return permissions.filter((p) => names.includes(p.name)).map((p) => p._id);
    };

    const roles = [
        {
            name: "super-admin",
            description: "Full access to everything",
            permissions: get(...permissionsList),
        },
        {
            name: "hotel-owner",
            description: "Owns/manages hotels",
            permissions: get(
                "dashboard:access",
                "hotel:view",
                "room:create",
                "room:update",
                "room:delete",
                "room:view",
                "booking:view",
                "payment:view",
                "review:view",
            ),
        },
        {
            name: "hotel-manager",
            description: "Manages operations",
            permissions: get(
                "dashboard:access",
                "room:view",
                "room:update",
                "booking:view",
                "booking:update",
                "reception:checkin",
                "reception:checkout",
                "review:view",
            ),
        },
        {
            name: "receptionist",
            description: "Front desk operations",
            permissions: get("booking:view", "booking:checkin", "booking:checkout"),
        },
        {
            name: "user",
            description: "Regular user who books and reviews hotels",
            permissions: get(
                "booking:create",
                "booking:view:own",
                "booking:cancel:own",
                "profile:update:own",
                "password:update:own",
                "review:create:own",
                "review:delete:own",
                "review:view",
            ),
        },
    ];

    const docs = [];
    for (const role of roles) {
        const doc = await RoleModel.findOneAndUpdate<Role>({ name: role.name }, role, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
        docs.push(doc);
    }
    console.log("✅ Roles seeded");
    return docs;
}

async function seedUsers(roles: Awaited<Promise<Role[]>>) {
    const roleMap = Object.fromEntries(roles.map((r) => [r.name, r._id]));

    const users = [
        {
            email: "admin@hotel.com",
            password: "admin123",
            firstName: "System",
            lastName: "Admin",
            roles: [roleMap["Super Admin"]],
        },
        {
            email: "owner@chainhotel.com",
            password: "owner123",
            firstName: "Owner",
            lastName: "One",
            roles: [roleMap["Hotel Owner"]],
        },
        {
            email: "manager@hotel.com",
            password: "manager123",
            firstName: "Manager",
            lastName: "Mike",
            roles: [roleMap["Hotel Manager"]],
        },
        {
            email: "reception@hotel.com",
            password: "reception123",
            firstName: "Receptionist",
            lastName: "Rachel",
            roles: [roleMap["Receptionist"]],
        },
        {
            email: "user1@example.com",
            password: "user123",
            firstName: "User",
            lastName: "Uyen",
            roles: [roleMap["User"]],
        },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await UserModel.findOneAndUpdate<User>(
            { email: user.email },
            {
                ...user,
                password: hashedPassword,
                emailVerified: true, // Assuming all seeded users have verified emails
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );
    }
    console.log("✅ Users seeded");
}

async function runSeeder() {
    try {
        const permissions = await seedPermissions();
        const roles = await seedRoles(permissions);
        await seedUsers(roles);
    } catch (err) {
        console.error("❌ Seeder failed:", err);
    }
}

runSeeder();
