document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const container = document.getElementById("questionContainer");
  const status = document.getElementById("statusMessage");

  const questions = [
    {
      text: "Câu hỏi 1: Ngày 25/04/2025",
      options: {
        "8h00 - 9h00": 15,
        "9h00 - 10h00": 20,
        "10h00 - 11h00": 13
      }
    },
    {
      text: "Câu hỏi 2: Ngày 26/04/2025",
      options: {
        "13h00 - 14h00": 24,
        "14h00 - 15h00": 6,
        "15h00 - 16h00": 8,
        "16h00 - 17h00": 10
      }
    }
  ];

  const selectedCounts = {}; // Giả lập lượt đã chọn

  function renderQuestions() {
    container.innerHTML = "";
    questions.forEach((q, qIdx) => {
      const block = document.createElement("div");
      block.className = "question-block";

      const title = document.createElement("div");
      title.className = "question-title";
      title.innerText = q.text;
      block.appendChild(title);

      Object.entries(q.options).forEach(([opt, limit]) => {
        const id = `q${qIdx}-${opt.replace(/\s+/g, "_")}`;
        const value = `${q.text}|${opt}`;
        const current = selectedCounts[value] || 0;

        const option = document.createElement("div");
        option.className = "answer-option";
        option.innerHTML = `
          <label>
            <input type="radio" name="schedule" value="${value}" ${current >= limit ? "disabled" : ""} />
            <span>${opt} (${current}/${limit})</span>
          </label>
        `;
        block.appendChild(option);
      });

      container.appendChild(block);
    });

    // Đảm bảo chỉ 1 radio được chọn trên toàn form
    document.querySelectorAll("input[name='schedule']").forEach(input => {
      input.addEventListener("change", e => {
        document.querySelectorAll("input[name='schedule']").forEach(r => {
          if (r !== e.target) r.checked = false;
        });
      });
    });
  }

  renderQuestions();

  document.getElementById("checkCodeBtn").addEventListener("click", () => {
    const id = document.getElementById("employeeId").value.trim();
    if (!id) return;
    // Giả lập nạp dữ liệu
    const demo = {
      fullName: "Nguyễn Văn A",
      dob: "01/01/1990",
      gender: "Nam",
      selected: "Câu hỏi 2: Ngày 26/04/2025|15h00 - 16h00"
    };

    document.getElementById("fullName").value = demo.fullName;
    const [d, m, y] = demo.dob.split("/");
    document.getElementById("dob-day").value = d;
    document.getElementById("dob-month").value = m;
    document.getElementById("dob-year").value = y;
    document.getElementById("gender").value = demo.gender;

    const radio = document.querySelector(`input[value="${demo.selected}"]`);
    if (radio && !radio.disabled) radio.checked = true;

    status.innerText = "✅ Dữ liệu mẫu đã được tải";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const selected = document.querySelector("input[name='schedule']:checked")?.value;
    if (!selected) {
      status.innerText = "❗ Vui lòng chọn 1 khung giờ.";
      return;
    }

    const data = {
      employeeId: document.getElementById("employeeId").value,
      fullName: document.getElementById("fullName").value,
      dob: `${document.getElementById("dob-day").value}/${document.getElementById("dob-month").value}/${document.getElementById("dob-year").value}`,
      gender: document.getElementById("gender").value,
      selectedSlot: selected
    };

    console.log("📤 Gửi dữ liệu:", data);
    status.innerText = "✅ Đăng ký thành công (demo)";
  });
});
