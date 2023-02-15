SELECT "genres"."name" as "genre",
       count("filmGenre"."genreId")
FROM "filmGenre"
JOIN "genres" using ("genreId")
JOIN "castMembers" using ("filmId")
WHERE "actorId" = 178
GROUP BY "genres"."name";
