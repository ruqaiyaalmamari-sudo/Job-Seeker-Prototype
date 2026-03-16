// ---------------- Tab Management ----------------
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[onclick="openTab('${tabId}')"]`).classList.add('active');
}

// ---------------- Image Upload ----------------
function uploadImage() {
    const input = document.getElementById('profileImage');
    input.click();
}

document.getElementById('profileImage').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(event){
            document.getElementById('profilePreview').src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});



// ---------------- Higher Degrees ----------------
let higherDegrees = [];
let degreeCounter = 1;

function addHigherDegree() {
    const degree = {};
    degree.id = degreeCounter++;
    degree.degree = prompt("أدخل الدرجة العلمية (ماجستير/دكتوراه):");
    if(!degree.degree) return;
    degree.field = prompt("أدخل التخصص:");
    degree.institution = prompt("المؤسسة التعليمية:");
    degree.country = prompt("الدولة:");
    degree.year = prompt("سنة التخرج:");
    degree.gpa = prompt("المعدل:");

    higherDegrees.push(degree);
    updateDegreesTable();
}

function updateDegreesTable() {
    const tbody = document.querySelector("#degreesTable tbody");
    tbody.innerHTML = "";

    // الجامعي
    tbody.innerHTML += `<tr>
        <td>بكالوريوس</td>
        <td>علوم الحاسوب</td>
        <td>جامعة مسقط</td>
        <td>سلطنة عمان</td>
        <td>2020</td>
        <td>3.75</td>
    </tr>`;

    // الشهادات العليا
    higherDegrees.forEach(d => {
        tbody.innerHTML += `<tr>
            <td>${d.degree}</td>
            <td>${d.field}</td>
            <td>${d.institution}</td>
            <td>${d.country}</td>
            <td>${d.year}</td>
            <td>${d.gpa}</td>
        </tr>`;
    });
}

// ---------------- Training Certificates ----------------
let trainingCertificates = [];
let trainingCounter = 1;

function addTrainingCertificate() {
    const t = {};
    t.id = trainingCounter++;
    t.serial = prompt("الرقم التسلسلي:");
    if(!t.serial) return;
    t.certNo = prompt("رقم الشهادة:");
    t.name = prompt("اسم الشهادة:");
    t.provider = prompt("مزود الشهادة:");
    t.issueDate = prompt("تاريخ الإصدار (YYYY-MM-DD):");
    t.expiryDate = prompt("تاريخ الانتهاء (YYYY-MM-DD):");

    trainingCertificates.push(t);
    updateTrainingTable();
}

function editTrainingCertificate(id) {
    const t = trainingCertificates.find(tc => tc.id === id);
    if(!t) return;
    t.serial = prompt("الرقم التسلسلي:", t.serial) || t.serial;
    t.certNo = prompt("رقم الشهادة:", t.certNo) || t.certNo;
    t.name = prompt("اسم الشهادة:", t.name) || t.name;
    t.provider = prompt("مزود الشهادة:", t.provider) || t.provider;
    t.issueDate = prompt("تاريخ الإصدار:", t.issueDate) || t.issueDate;
    t.expiryDate = prompt("تاريخ الانتهاء:", t.expiryDate) || t.expiryDate;
    updateTrainingTable();
}

function deleteTrainingCertificate(id) {
    if(confirm("هل تريد حذف هذه الشهادة؟")) {
        trainingCertificates = trainingCertificates.filter(tc => tc.id !== id);
        updateTrainingTable();
    }
}

function updateTrainingTable() {
    const tbody = document.querySelector("#trainingTable tbody");
    tbody.innerHTML = "";
    trainingCertificates.forEach(t => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.serial}</td>
            <td>${t.certNo}</td>
            <td>${t.name}</td>
            <td>${t.provider}</td>
            <td>${t.issueDate}</td>
            <td>${t.expiryDate}</td>
            <td>
                <button class="edit-btn" onclick="editTrainingCertificate(${t.id})">تعديل</button>
                <button class="delete-btn" onclick="deleteTrainingCertificate(${t.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ---------------- Practical Trainings ----------------
let practicalTrainings = [];
let practicalCounter = 1;

function addPracticalTraining() {
    const t = {};
    t.id = practicalCounter++;
    t.serial = prompt("الرقم التسلسلي:");
    if(!t.serial) return;
    t.provider = prompt("المؤسسة المانحة:");
    t.field = prompt("مجال التدريب (هندسي / شبكات / تكنولوجيا):");
    t.from = prompt("الفترة من (YYYY-MM-DD):");
    t.to = prompt("الفترة إلى (YYYY-MM-DD):");

    practicalTrainings.push(t);
    updatePracticalTrainingTable();
}

function editPracticalTraining(id) {
    const t = practicalTrainings.find(p => p.id === id);
    if(!t) return;
    t.serial = prompt("الرقم التسلسلي:", t.serial) || t.serial;
    t.provider = prompt("المؤسسة المانحة:", t.provider) || t.provider;
    t.field = prompt("مجال التدريب:", t.field) || t.field;
    t.from = prompt("الفترة من:", t.from) || t.from;
    t.to = prompt("الفترة إلى:", t.to) || t.to;
    updatePracticalTrainingTable();
}

function deletePracticalTraining(id) {
    if(confirm("هل تريد حذف هذا التدريب؟")) {
        practicalTrainings = practicalTrainings.filter(p => p.id !== id);
        updatePracticalTrainingTable();
    }
}

function updatePracticalTrainingTable() {
    const tbody = document.querySelector("#practicalTrainingTable tbody");
    tbody.innerHTML = "";
    practicalTrainings.forEach(t => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.serial}</td>
            <td>${t.provider}</td>
            <td>${t.field}</td>
            <td>${t.from}</td>
            <td>${t.to}</td>
            <td>
                <button class="edit-btn" onclick="editPracticalTraining(${t.id})">تعديل</button>
                <button class="delete-btn" onclick="deletePracticalTraining(${t.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}



// ---------------- Save Profile ----------------
function saveProfile() {
    const profileData = {
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        cvText: document.getElementById('cvText').value,
        trainingCertificates,
        practicalTrainings,
        higherDegrees
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
    document.getElementById('message').innerText = "تم حفظ البيانات بنجاح!";
    setTimeout(() => document.getElementById('message').innerText = "", 3000);
}

// ---------------- Print PDF ----------------
function printPDF() {
    const printContents = document.getElementById('printArea').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}

// ---------------- Initialize ----------------
updateDegreesTable();
updateTrainingTable();
updatePracticalTrainingTable();

// ---------------- Skills Rating (FIXED) ----------------
document.addEventListener("DOMContentLoaded", function () {

    const skillsSelect = document.getElementById("skillsSelect");
    const skillsRating = document.getElementById("skillsRating");

    if (!skillsSelect || !skillsRating) {
        console.error("Skills elements not found");
        return;
    }

    const stars = skillsRating.querySelectorAll("span");

    skillsSelect.addEventListener("change", function () {
        if (this.value !== "") {
            skillsRating.style.display = "block";
            resetStars();
        } else {
            skillsRating.style.display = "none";
        }
    });

    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            stars.forEach((s, i) => {
                s.classList.toggle("active", i <= index);
            });
        });
    });

    function resetStars() {
        stars.forEach(star => star.classList.remove("active"));
    }
});
