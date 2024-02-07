# Firebase Storage PDF Upload and Download

This project demonstrates a simple web application that allows users to upload and download PDF files to and from Firebase Storage. It also integrates Firebase Authentication for user login using Google accounts.

## Features

- **Upload PDF Files**: Users can upload PDF files to Firebase Storage, organized by semester, module, and subject code.
- **Download PDF Files**: Users can retrieve PDF files from Firebase Storage based on the selected semester, module, and subject code.
- **Google Authentication**: Users can log in to the application using their Google accounts.
- **Dynamic Subject Code Suggestions**: Subject code input field provides suggestions based on the selected semester and module.

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase (Firestore, Authentication, Storage)

## Prerequisites

Before running the application, ensure you have the following installed/setup:

- Node.js installed on your system.
- Firebase project created on Firebase Console.
- Firebase configuration details including API keys, etc.
- Proper setup of Firebase Storage rules to allow file uploads and downloads.

## Getting Started

1. Clone this repository to your local machine:    git clone https://github.com/mashhoorahdal/Edulinx.git
2.  Navigate to the project directory:
3. Replace the Firebase configuration in the `index.js` file with your own Firebase project configuration details.
4. Ensure that Firebase Storage rules are properly configured to allow file uploads and downloads.
5. Open the `index.html` file in a web browser or set up a local server to serve the application.
6. You're ready to use the application! 

## Usage

1. Launch the application in a web browser.
2. Log in using your Google account.
3. Select the semester, module, and subject code.
4. Upload a PDF file if needed.
5. Click on the "Select" button to fetch or download the PDF file associated with the selected semester, module, and subject code.

##Live Preview 
https://edulincx.vercel.app




