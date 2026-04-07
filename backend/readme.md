# Create the migration and update the DB
npx prisma migrate dev --name changes_name

# Update your TypeScript types
npx prisma generate

# Force the DB to match your new schema 
npx prisma db push

# Tell Prisma: "The DB is perfect now, just mark it as synced"
npx prisma migrate dev --name sync_schema --create-only