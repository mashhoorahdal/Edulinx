import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDVjAazT6ylUn-DDhsqiQbaitOkjZpyXM",
    authDomain: "edulinx-c2b87.firebaseapp.com",
    projectId: "edulinx-c2b87",
    storageBucket: "edulinx-c2b87.appspot.com",
    messagingSenderId: "688215485034",
    appId: "1:688215485034:web:d119f21336ccb2c0d13813",
    measurementId: "G-JLDQ3M1F4R"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const sem = document.getElementById('Semester');
const subjectCode = document.getElementById("Subjectcode");
const moduleCode = document.getElementById("module");
const selectButton = document.getElementById("Selectbtn");
const resultLink = document.getElementById("ResultLink");

function selectData() {
  const semester = sem.value;
  const code = subjectCode.value;
  const module = moduleCode.value;

  const dbRef = ref(db, `Materials/${semester}/${module}`);
  get(child(dbRef, "Subjectcode")).then((snapshot) => {
    if (snapshot.exists() && snapshot.val() === code) {
      get(child(dbRef, "Pdflink")).then((pdfSnapshot) => {
        if (pdfSnapshot.exists()) {
          const pdflink = pdfSnapshot.val();
          resultLink.href = pdflink;
          resultLink.innerHTML = "Click here";
        } else {
          alert("No PDF link found for the selected subject code.");
        }
      }).catch((error) => {
        console.error(error);
        alert("Error occurred while fetching PDF link.");
      });
    } else {
      alert("No data found for the selected semester, module, and subject code.");
    }
  }).catch((error) => {
    console.error(error);
    alert("Error occurred while fetching data.");
  });
}

selectButton.addEventListener('click', selectData);
