<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing credentials']);
    exit;
}

$stmt = $mysqli->prepare('SELECT lecture_id, fullname, email, password FROM lecture WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();
$lecture = $res->fetch_assoc();

if (!$lecture || $lecture['password'] !== $password) {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    exit;
}

// success
echo json_encode(['success' => true, 'message' => 'Login successful', 'lecture' => ['id' => $lecture['lecture_id'], 'name' => $lecture['fullname'], 'email' => $lecture['email']]]);

$stmt->close();
$mysqli->close();

?>
