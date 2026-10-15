<?php
/**
 * Form endpoint for the contact, comment and newsletter forms (see assets/js/forms.js).
 * Works on any PHP host with mail() enabled. Responds with JSON.
 */

// ---- Settings ---------------------------------------------------------------
$TO_EMAIL   = 'info@example.com';     // Where enquiries are delivered
$FROM_EMAIL = 'no-reply@' . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$SITE_NAME  = 'Clicky Fyre';
// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Honeypot: real visitors never see this field
if (!empty($_POST['_gotcha'])) {
    respond(200, true, 'Thanks!');
}

// Simple per-session rate limit: one submission every 20 seconds
session_start();
if (!empty($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 20) {
    respond(429, false, 'Please wait a few seconds before sending again.');
}

$clean = static function ($value, int $max = 200): string {
    $value = trim((string) $value);
    $value = str_replace(["\r", "\0"], '', $value);
    return mb_substr(strip_tags($value), 0, $max);
};

$type  = in_array($_POST['form_type'] ?? '', ['contact', 'comment', 'newsletter'], true) ? $_POST['form_type'] : 'contact';
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);

if (!$email) {
    respond(422, false, 'Please enter a valid email address.');
}

$fields = [];
if ($type !== 'newsletter') {
    $name    = $clean($_POST['name'] ?? '', 100);
    $message = $clean($_POST['message'] ?? '', 5000);
    if ($name === '' || $message === '') {
        respond(422, false, 'Please fill in your name and message.');
    }
    $fields['Name'] = $name;
}
$fields['Email'] = $email;

foreach (['phone' => 'Phone', 'department' => 'Department', 'subject' => 'Subject', 'website' => 'Website'] as $key => $label) {
    if (!empty($_POST[$key])) {
        $fields[$label] = $clean($_POST[$key]);
    }
}
if (isset($message)) {
    $fields['Message'] = "\n" . $message;
}
$fields['Page'] = $clean($_POST['page'] ?? '', 100);

$subjects = [
    'contact'    => "New enquiry from {$SITE_NAME} website",
    'comment'    => "New blog comment on {$SITE_NAME} website",
    'newsletter' => "New newsletter subscriber on {$SITE_NAME} website",
];

$body = '';
foreach ($fields as $label => $value) {
    $body .= "{$label}: {$value}\n";
}
$body .= "\nSent: " . date('Y-m-d H:i:s') . "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = [
    'From: ' . $SITE_NAME . ' <' . $FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

if (!mail($TO_EMAIL, $subjects[$type], $body, implode("\r\n", $headers))) {
    respond(500, false, 'The message could not be sent. Please email us directly.');
}

$_SESSION['last_submit'] = time();
respond(200, true, $type === 'newsletter'
    ? 'Thanks! You are now subscribed.'
    : "Thanks for reaching out. We'll get back to you shortly.");
