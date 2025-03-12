import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const users: Prisma.UserCreateInput[] = [
  {
    email: 'user1@email.com',
    password: '$2b$10$DgWxZLdTOUPVSAiXVT8T3.OSnYJi1RmBbPKcGmauHqbASLdVRMnOe', // Ahm@48Ed9,
    name: 'User 1',
    role: 'EMPLOYEE',
    phone: '1234567890',
    address: '123, Street, City, Country',
  },
  {
    email: 'user2@email.com',
    password: '$2b$10$DgWxZLdTOUPVSAiXVT8T3.OSnYJi1RmBbPKcGmauHqbASLdVRMnOe', // Ahm@48Ed9,
    name: 'User 2',
    role: 'EMPLOYEE',
    phone: '12345125890',
    address: '123, Street, City, Country',
  },
  {
    email: 'admin@email.com',
    password: '$2b$10$DgWxZLdTOUPVSAiXVT8T3.OSnYJi1RmBbPKcGmauHqbASLdVRMnOe', // Ahm@48Ed9,
    name: 'Admin 1',
    role: 'ADMIN',
    phone: '1234511478',
    address: '123, Street, City, Country',
  },
]

async function patchSeed() {
  /////// USERS ///////////////
  await prisma.user.deleteMany()
  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

async function main() {
  try {
    await patchSeed()
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
