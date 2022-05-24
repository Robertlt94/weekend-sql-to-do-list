CREATE TABLE task_manager(
	"id" SERIAL PRIMARY KEY,
	"task_description" varchar( 256 ),
	"completed" boolean DEFAULT false,
	"date_completed" varchar(12)
);

SELECT * FROM task_manager ORDER BY id ASC;

INSERT INTO task_manager (task_description, completed, date_completed ) VALUES ( 'Example Task', 'False', 'Not Done' );


UPDATE task_manager SET completed=false, date_completed='Not Done' WHERE id=2;

UPDATE task_manager SET completed=true, date_completed='05/24/22' WHERE id=2;