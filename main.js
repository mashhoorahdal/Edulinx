import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL,listAll } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAuth, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyCDVjAazT6ylUn-DDhsqiQbaitOkjZpyXM",
    authDomain: "edulinx-c2b87.firebaseapp.com",
    databaseURL: "https://edulinx-c2b87-default-rtdb.firebaseio.com",
    projectId: "edulinx-c2b87",
    storageBucket: "edulinx-c2b87.appspot.com",
    messagingSenderId: "688215485034",
    appId: "1:688215485034:web:d119f21336ccb2c0d13813",
    measurementId: "G-JLDQ3M1F4R"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth();


const sem = document.getElementById('Semester');
const subjectCode = document.getElementById("Subjectcode");
const moduleCode = document.getElementById("module");
const selectButton = document.getElementById("Selectbtn");
const resultLink = document.getElementById("ResultLink");
const pdfFileInput = document.getElementById("pdfFile");
const uploadButton = document.getElementById("UploadBtn");
const loginButton = document.getElementById("LoginBtn");
const contentDiv = document.getElementById("content");

const signOutButton = document.getElementById('SignOutBtn');


subjectCode.addEventListener("input", (event) => {
    const inputValue = event.target.value;
    event.target.value = inputValue.toLowerCase();
});

sem.addEventListener('change', clearInputFields);
selectButton.addEventListener('click', selectData);
pdfFileInput.addEventListener('change', handleFileUpload);
loginButton.addEventListener('click', loginWithGoogle);

// Check if the user is already logged in when the page loads
onAuthStateChanged(auth, (user) => {
    if (user) {
        contentDiv.style.display = "block";
        loginButton.style.display = "none"; // Hide login button after login
        selectButton.style.display = "block"; // Show search button when not logged in

        signOutButton.classList.remove("hidden"); // Show sign-out button
    } else {
        signOutButton.classList.add("hidden"); // Hide sign-out button
        selectButton.style.display = "none"; // Hide search button after login

    }
});


signOutButton.addEventListener('click', () => {
    signOutUser();
});
function signOutUser() {
    signOut(auth)
        .then(() => {
            window.location.reload(); // Refresh the page after signing out
        })
        .catch((error) => {
            console.error(error);
            alert("Error occurred while signing out.");
        });
}

function selectData() {
    const semester = sem.value;
    const code = subjectCode.value;
    const module = moduleCode.value;

    // Construct the path to the PDF file in Firebase Storage
    const pdfPath = `Materials/${semester}/${module}/${code}.pdf`;

    // Get the download URL of the PDF file from Firebase Storage
    getDownloadURL(ref(storage, pdfPath))
        .then((downloadURL) => {
            resultLink.href = downloadURL;
            resultLink.innerHTML = "Click here";
            

            // Hide the upload section and button if PDF link exists
            uploadSection.style.display = "none";
        })
        .catch((error) => {
            console.error(error);

            // Show the upload section and button if PDF link does not exist
            uploadSection.style.display = "block";
        });
        
}

function clearResultLink() {
    resultLink.innerHTML = "";
}

// Add an event listener to clear resultLink when the link is clicked
resultLink.addEventListener("click", clearResultLink);




function handleFileUpload() {
    const semester = sem.value;
    const module = moduleCode.value;
    const code = subjectCode.value;
    const file = pdfFileInput.files[0];

    if (file) {
        const pdfStorageRef = ref(storage, `Materials/${semester}/${module}/${code}.pdf`);
        uploadBytes(pdfStorageRef, file).then(() => {
            alert("PDF file uploaded successfully.");
            clearInputFields();
        }).catch((error) => {
            console.error(error);
            alert("Error occurred while uploading PDF file.");
        });
    }}

function clearInputFields() {
    subjectCode.value = ""; // Clear subject code input
    moduleCode.value = "";  // Clear module input
    resultLink.innerHTML = ""; // Clear result link
}

function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Logged in user:", user);
            alert("Logged in successfully!");
            contentDiv.style.display = "block";
            loginButton.style.display = "none"; // Hide login button after login
        })
        .catch((error) => {
            console.error(error);
            alert("Error occurred while logging in.");
        });
}


function fetchSubjectCodes(semester, module) {
    const directory = `Materials/${semester}/${module}`;
    const listRef = ref(storage, directory);
    
    listAll(listRef)
      .then((res) => {
        const subjectCodes = [];
  
        res.items.forEach((itemRef) => {
          const filename = itemRef.name;
          const subjectCode = filename.split('.')[0]; // Remove the file extension
          subjectCodes.push(subjectCode);
        });
  
        // Populate datalist with subject codes
        populateDatalist(subjectCodes);
      })
      .catch((error) => {
        console.error('Error fetching subject codes:', error);
      });
  }
  
  // Populate datalist with subject codes
  function populateDatalist(subjectCodes) {
    const datalist = document.getElementById('subjectCodesList');
    datalist.innerHTML = ''; // Clear existing options
  
    subjectCodes.forEach((subjectCode) => {
      const option = document.createElement('option');
      option.value = subjectCode;
      datalist.appendChild(option);
    });
  }
  
  // Get references to the input fields
  const subjectCodeInput = document.getElementById('Subjectcode');
  const semesterSelect = document.getElementById('Semester');
  const moduleSelect = document.getElementById('module');
  
  // Fetch and populate subject codes when input field is clicked
  subjectCodeInput.addEventListener('click', () => {
    const selectedSemester = semesterSelect.value;
    const selectedModule = moduleSelect.value;
    fetchSubjectCodes(selectedSemester, selectedModule);
  });
