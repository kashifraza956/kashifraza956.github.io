<?php

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
  // Collect form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  // Validate data (optional)
  // You can add validation logic here to ensure data integrity

  // Create data array
  $data = [
    'name' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
  ];

  // Encode data to JSON string
  $jsonData = json_encode($data, JSON_PRETTY_PRINT);

  // Open file for writing (replace 'data.json' with your desired filename)
  $file = fopen('data.json', 'w');

  // Check if file opened successfully
  if ($file) {
    // Write JSON data to file
    fwrite($file, $jsonData);
    fclose($file);
    echo 'Data stored successfully!';
  } else {
    echo 'Error opening file for writing.';
  }
} else {
  // Not a POST request, display the form
  echo 'Please submit the form.';
}

?>
