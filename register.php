<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

$fullname = isset($_POST['fullname']) ? trim($_POST['fullname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (!$fullname || !$email || !$username || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// basic validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

// check existing username
$stmt = $mysqli->prepare('SELECT id FROM student WHERE username = ? OR email = ? LIMIT 1');
$stmt->bind_param('ss', $username, $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
    exit;
}
$stmt->close();

// store password as plain text (for simplicity)
$stmt = $mysqli->prepare('INSERT INTO student (fullname,email,username,password,created_at) VALUES (?, ?, ?, ?, NOW())');
$stmt->bind_param('ssss', $fullname, $email, $username, $password);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created']);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
}

$stmt->close();
$mysqli->close();

?>
