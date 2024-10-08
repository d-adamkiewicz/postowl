# Example .env file for local development
# For production, environment variables are set on the production server

# SvelteKit settings
ORIGIN=http://localhost:5173

# PostOwl settings
DB_PATH="./data/db.sqlite3"
ADMIN_PASSWORD="your-secret-password"
ADMIN_NAME="Twoja Nazwa"
ADMIN_EMAIL="you@your-domain.com"
INITIAL_MESSAGE="Witamy na mojej stronie PostOwl!"

# SMTP settings for dev if using mailpit - see README for instructions
SMTP_SERVER="localhost"
SMTP_PORT="1025"
SMTP_USERNAME="postmaster@localhost" # can be whatever you want in dev
SMTP_PASSWORD="password" # can be whatever you want in dev
