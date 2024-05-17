-- Delete from sample_params first
DELETE FROM sample_params
WHERE sample_id IN (
    SELECT sample_materials.sample_id
    FROM sample_materials
    INNER JOIN orders ON sample_materials.order_id = orders.order_id
    WHERE DATE(orders.created_at) > '2024-05-10'
);

-- Then delete from sample_materials
DELETE FROM sample_materials
WHERE order_id IN (
    SELECT order_id
    FROM orders
    WHERE DATE(created_at) > '2024-05-10'
);

-- Finally, delete from orders
DELETE FROM orders
WHERE DATE(created_at) > '2024-05-10';
