# NFC - Null Form Checker for JavaScript

NFC (Null Form Checker) is a JavaScript script designed to simplify the validation of null values in HTML forms, particularly those implemented with AJAX/jQuery. This script aids in ensuring that user-filled forms do not contain null values in their form elements when submitted asynchronously.

## Installation

```html
<script src="https://cdn.jsdelivr.net/gh/refkinscallv/NFC@master/nfc.js"></script>
```

or 

```html
<script src="https://cdn.jsdelivr.net/gh/refkinscallv/NFC@version/nfc.js"></script>
```

## Usage Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>NFC - Null Form Checker</title>

    <script src="https://cdn.jsdelivr.net/gh/refkinscallv/NFC@master/nfc.js"></script>
</head>
<body>
    
    <form id="my_form">
        <input type="text" name="first_name" id="first_name" placeholder="First Name"><br />
        <input type="text" name="last_name" id="last_name" placeholder="Last Name"><br />
        <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"><br />
        <input type="button" onclick="submitForm()" value="Submit" />
    </form>

    <script>
        function submitForm() {
            // Form elements to use to check for null values
            var fname = document.getElementById("first_name").value;
            var lname = document.getElementById("last_name").value;

            // Create FormData object for AJAX
            var formData = new FormData(document.getElementById('my_form'));

            // Use NFC to check for null values
            var nullChecker = NFC.run([
                { value: fname, message: "First Name is required." },
                { value: lname, message: "Last Name is required." }
                // Add more fields as needed
            ]);

            if (!nullChecker.status) {
                alert(nullChecker.message);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'your-server-endpoint', true);

                xhr.onload = function() {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // Successful response, do something
                        console.log(xhr.responseText);
                    } else {
                        // Failed response, display error message
                        console.error(xhr.statusText);
                    }
                };

                xhr.onerror = function() {
                    // Error in connection
                    console.error('Connection error.');
                };

                xhr.send(formData);
            }
        }
    </script>

</body>
</html>
```

## Usage Example if Using jQuery

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>NFC - Null Form Checker</title>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/gh/refkinscallv/NFC@master/nfc.js"></script>
</head>
<body>
    
    <form id="my_form">
        <input type="text" name="first_name" id="first_name" placeholder="First Name"><br />
        <input type="text" name="last_name" id="last_name" placeholder="Last Name"><br />
        <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"><br />
        <input type="button" onclick="submitForm()" value="Submit" />
    </form>

    <script>
        function submitForm() {
            // Form elements to use to check for null values
            var fname = $("#my_form #first_name").val();
            var lname = $("#my_form #last_name").val();

            // Create FormData object for AJAX
            var formData = $("#my_form").serialize();

            // Use NFC to check for null values
            var nullChecker = NFC.run([
                { value: fname, message: "First Name is required." },
                { value: lname, message: "Last Name is required." }
                // Add more fields as needed
            ]);

            if (!nullChecker.status) {
                alert(nullChecker.message);
            } else {
                $.ajax({
                    url : "endpoint/url",
                    data : formData,
                    type : "POST",
                    dataType : "JSON",
                    success : function(response) {
                        // Successful response, do something
                    },
                    error : function(jqXHR) {
                        // Failed response, display error message
                    }
                });
            }
        }
    </script>

</body>
</html>
```