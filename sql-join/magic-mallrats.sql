SELECT "firstName",
       "lastName"
FROM "rentals"
JOIN "customers" using ("customerId")
JOIN "inventory" using ("inventoryId")
JOIN "films" using ("filmId")
WHERE "title" = 'Magic Mallrats';
