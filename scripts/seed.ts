import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user placeholder (real admin should sign up via Supabase first, then promote)
  console.log('Seeding completed. Use the admin panel or database to promote users to ADMIN.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
