// البيانات حسب السنة
const statsByYear = {
    2023: { jobseekers: 90, hired: 30, rejected: 20, students: 40 },
    2024: { jobseekers: 120, hired: 45, rejected: 30, students: 60 },
    2025: { jobseekers: 150, hired: 70, rejected: 25, students: 80 }
};

// عناصر الصفحة
const yearSelect = document.getElementById("yearSelect");
const totalEl = document.getElementById("total");
const jobseekersEl = document.getElementById("jobseekers");
const hiredEl = document.getElementById("hired");
const rejectedEl = document.getElementById("rejected");
const studentsEl = document.getElementById("students");

// تحديث الإحصائيات
function updateStats() {
    const data = statsByYear[yearSelect.value];

    const total = data.jobseekers + data.hired + data.rejected + data.students;

    totalEl.textContent = total;
    jobseekersEl.textContent = data.jobseekers;
    hiredEl.textContent = data.hired;
    rejectedEl.textContent = data.rejected;
    studentsEl.textContent = data.students;

    chart.data.datasets[0].data = [
        data.jobseekers,
        data.hired,
        data.rejected,
        data.students
    ];
    chart.update();
}

// ربط الكروت بصفحاتك
document.querySelectorAll(".kpi[data-page]").forEach(card => {
    card.addEventListener("click", function () {
        window.location.href = this.dataset.page;
    });
});

// إنشاء الرسم البياني
const chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
        labels: ["باحثين", "موظفين", "مرفوضين", "دارسين"],
        datasets: [{
            data: [],
            backgroundColor: ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// الأحداث
yearSelect.addEventListener("change", updateStats);
updateStats();
