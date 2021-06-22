-- Select All Users
SELECT * FROM users;

-- Enable Admin
UPDATE users Set is_active=1, role='A' WHERE username='admin';

-- Enable Teacher
UPDATE users Set is_active=1, role='T' WHERE username='ajit';

-- Enable Student
UPDATE users Set is_active=1 WHERE username='ram';
