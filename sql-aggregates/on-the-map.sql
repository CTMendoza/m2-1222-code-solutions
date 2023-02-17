SELECT "countries"."name" as "country",
       count("cityId") as "numOfCities"
FROM "countries"
JOIN "cities" using ("countryId")
GROUP BY "countries". "name";
