<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$email = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

$stmt = $mysqli->prepare('SELECT id, fullname, email, password FROM student WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();
$user = $res->fetch_assoc();
if (!$user || $user['password'] !== $password) {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

// success
echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => ['id' => $user['id'], 'name' => $user['fullname'], 'email' => $user['email']]]);


$stmt->close();
$mysqli->close();

?>
