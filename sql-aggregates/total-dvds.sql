SELECT "storeId",
      count("inventoryId") as "TotalDvds"
FROM "inventory"
GROUP BY "storeId";
