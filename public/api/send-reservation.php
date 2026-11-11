<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$guests = isset($data['guests']) ? trim($data['guests']) : '2';
$vibe = isset($data['vibe']) ? trim($data['vibe']) : 'both';
$date = isset($data['date']) ? trim($data['date']) : '';
$time = isset($data['time']) ? trim($data['time']) : '';

if (empty($name) || empty($phone) || empty($date) || empty($time)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$apiKey = getenv('RESEND_API_KEY') ?: '';
if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode(['error' => 'Mail service is not configured (missing RESEND_API_KEY)']);
    exit();
}
$toEmail = getenv('RESERVATION_NOTIFICATION_EMAIL') ?: 'krafixtech@gmail.com';
$fromEmail = getenv('RESERVATION_FROM_EMAIL') ?: 'onboarding@resend.dev';

$vibeLabel = ($vibe === 'both') ? 'Both Worlds (Italian & Mexican)' : strtoupper($vibe) . ' FOCUS';
$subject = "🛎️ New Table Reservation: {$name} ({$guests} Guests) - {$date} at {$time}";

$htmlContent = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;background-color:#FBF5EB;color:#1C1917;'>
  <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width:580px;background-color:#FEF7EC;border:3px solid #1C1917;border-radius:18px;box-shadow:8px 8px 0px #1C1917;overflow:hidden;'>
    <tr>
      <td style='background-color:#829375;padding:32px 28px;text-align:center;border-bottom:3px solid #1C1917;color:#FEF7EC;'>
        <div style='display:inline-block;background:#FEF7EC;color:#1C1917;font-size:11px;font-weight:900;letter-spacing:0.2em;padding:6px 14px;border-radius:999px;border:2px solid #1C1917;margin-bottom:12px;text-transform:uppercase;'>CIRO CO. • TABLE RESERVATION</div>
        <h1 style='margin:0;font-size:28px;font-weight:900;text-transform:uppercase;'>NEW BOOKING CONFIRMED</h1>
        <p style='margin:8px 0 0;font-size:14px;opacity:0.9;'>A customer has reserved a table online.</p>
      </td>
    </tr>
    <tr>
      <td style='padding:24px 28px 12px;'>
        <table width='100%' style='background:#FFF;border:2px solid #829375;border-radius:12px;padding:18px;text-align:center;'>
          <tr>
            <td>
              <div style='font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;color:#829375;'>PARTY SIZE & SCHEDULE</div>
              <div style='font-size:26px;font-weight:900;color:#829375;margin:6px 0;'>{$guests} Guests</div>
              <div style='font-size:16px;font-weight:700;color:#1C1917;'>📅 {$date} &nbsp;|&nbsp; ⏰ {$time}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style='padding:12px 28px 24px;'>
        <table width='100%' cellpadding='8' cellspacing='0' style='font-size:14px;'>
          <tr style='border-bottom:1px dashed rgba(28,25,23,0.15);'><td style='color:#6B7280;font-weight:700;'>Name</td><td style='font-weight:800;font-size:15px;'>{$name}</td></tr>
          <tr style='border-bottom:1px dashed rgba(28,25,23,0.15);'><td style='color:#6B7280;font-weight:700;'>Phone</td><td><a href='tel:+91{$phone}' style='color:#829375;font-weight:800;text-decoration:none;'>+91 {$phone}</a></td></tr>
          " . (!empty($email) ? "<tr style='border-bottom:1px dashed rgba(28,25,23,0.15);'><td style='color:#6B7280;font-weight:700;'>Email</td><td><a href='mailto:{$email}' style='color:#829375;'>{$email}</a></td></tr>" : "") . "
          <tr style='border-bottom:1px dashed rgba(28,25,23,0.15);'><td style='color:#6B7280;font-weight:700;'>Vibe</td><td style='font-weight:800;'>{$vibeLabel}</td></tr>
        </table>
        <table width='100%' style='margin-top:24px;'><tr><td align='center'>
          <a href='tel:+91{$phone}' style='display:block;background-color:#1C1917;color:#FEF7EC;text-align:center;padding:14px 24px;font-weight:900;text-decoration:none;border-radius:8px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;'>📞 Call Guest (+91 {$phone})</a>
        </td></tr></table>
      </td>
    </tr>
  </table>
</body>
</html>
";

$payload = json_encode([
    'from' => $fromEmail,
    'to' => $toEmail,
    'subject' => $subject,
    'html' => $htmlContent
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
    'User-Agent: CiroCo-Reservation/1.0'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $curlError]);
    exit();
}

http_response_code($httpCode >= 200 && $httpCode < 300 ? 200 : $httpCode);
echo $response;
