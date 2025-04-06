<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include the PHPMailer autoloader
require 'php-mailer/vendor/autoload.php'; // Adjust this path based on your folder structure

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $service = htmlspecialchars($_POST["service"]);
    $message = htmlspecialchars($_POST["message"]);

    // Email recipient
    $to = "altinejup@gmail.com"; // Your email

    // Email subject
    $subject = "New Contact Form Submission from $name";

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'presslogic36@gmail.com'; // Your Gmail address
        $mail->Password = 'rxbm nqcd mcfd bpxh'; // App Password generated
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('no-reply@yourstore.com', 'Ner-Kom');
        $mail->addAddress('altinejup@gmail.com'); // Add a recipient
        $mail->addAddress('nerkom2005@gmail.com'); // Add a recipient
        $mail->addAddress('erdrinejupi79@gmail.com'); // Add a recipient
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "You have received a new message from your website contact form.<br><br>".
                         "Here are the details:<br>".
                         "Name: $name<br>".
                         "Email: $email<br>".
                         "Service: $service<br>".
                         "Message: $message<br>";

        // Send email
        $mail->send();
        echo "success"; // You can change this to redirect to a success page
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request";
}
?>
