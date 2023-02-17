SELECT "genres"."name" as "genre",
       count("filmGenre"."genreId")
FROM "filmGenre"
JOIN "genres" using ("genreId")
JOIN "castMembers" using ("filmId")
JOIN "actors" using ("actorId")
WHERE "firstName" = 'Lisa' AND
 "lastName" = 'Monroe'
GROUP BY "genres"."name";
