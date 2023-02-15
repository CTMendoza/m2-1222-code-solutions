SELECT "releaseYear",
       "genres"."name" as "genre",
       "title"
FROM "genres"
JOIN "filmGenre" using ("genreId")
JOIN "films" using ("filmId")
WHERE "title" = 'Boogie Amelie';
