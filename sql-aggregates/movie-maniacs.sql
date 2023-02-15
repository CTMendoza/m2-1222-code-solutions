SELECT "firstName",
       "lastName",
       sum("amount") as "amount"
FROM "customers"
JOIN "payments" using ("customerId")
GROUP BY "customers"."customerId"
ORDER BY "amount" DESC;
