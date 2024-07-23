FILE="./data/db.sqlite3"
if ! [ -f "$FILE" ]
then
	sqlite3 $FILE < ./scripts/schema.sql
fi
