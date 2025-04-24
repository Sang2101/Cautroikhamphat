document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const scheduleContainer = document.getElementById("scheduleContainer");
  const statusMessage = document.getElementById("statusMessage");

  const scheduleData = [
    {
      question: "Ngày 25/04/2025",
      options: {
        "8h00 - 9h00": { limit: 15, count: 0 },
        "9h00 - 10h00": { limit: 20, count: 0 },
        "10h00 - 11h00": { limit: 13, count: 0 }
      }
    },
    {
      question: "Ngày 26/04/2025",
      options: {
        "13h00 - 14h00": { limit: 24, count: 0 },
        "14h00 - 15h00": { limit: 6, count: 0 },
        "15h00 - 16h00": { limit: 8, count: 0 },
        "16h00 - 17h00": { limit: 10, count: 0 }
      }
    }
  ];

  function renderSchedule() {
    scheduleContainer.innerHTML = "";
    scheduleData.forEach(group => {
      const wrapper = document.createElement("div");
      wrapper.className = "schedule-group";

      const title = document.createElement("strong");
      title.innerText = group.question;
      wrapper.appendChild(title);

      Object.entries(group.options).forEach(([slot, data]) => {
        const value = `${group.question}|${slot}`;
        const disabled = data.count >= data.limit ? "disabled" : "";
        const labelText = data.count >= data.limit
          ? `${slot} (đã đủ)`
          : `${slot} (${data.count}/${data.limit})`;

        const div = document.createElement("div");
        div.className = "schedule-option";
        div.innerHTML = `
          <label>
            <input type="radio" name="schedule" value="${value}" ${disabled}>
            <span>${labelText}</span>
          </label>
        `;
        wrapper.appendChild(div);
      });

      scheduleContainer.appendChild(wrapper);
    });

    document.querySelectorAll("input[name='schedule']").forEach(input => {
      input.addEventListener("change", () => {
        document.querySelectorAll("input[name='schedule']").forEach(i => {
          if (i !== input) i.checked = false;
        });
      });
    });
  }

  renderSchedule();

  document.getElementById("checkCodeBtn").addEventListener("click", () => {
    const id = document.getElementById("employeeId").value.trim();
    if (!id) return;

    const demoData = {
      found: true,
      fullName: "Nguyễn Văn A",
      dob: "01/01/1990",
      gender: "Nam",
      selectedSlot: "Ngày 25/04/2025|9h00 - 10h00"
    };

    document.getElementById("fullName").value = demoData.fullName;
    const [d, m, y] = demoData.dob.split("/");
    document.getElementById("dob-day").value = d;
    document.getElementById("dob-month").value = m;
    document.getElementById("dob-year").value = y;
    document.getElementById("gender").value = demoData.gender;

    const selected = document.querySelector(`input[value='${demoData.selectedSlot}']`);
    if (selected && !selected.disabled) selected.checked = true;

    statusMessage.innerText = demoData.found ? "✅ Đã nạp dữ liệu mẫu" : "Không tìm thấy dữ liệu";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = document.querySelector("input[name='schedule']:checked");
    if (!selected) {
      statusMessage.innerText = "❗ Vui lòng chọn 1 khung giờ.";
      return;
    }

    const data = {
      employeeId: document.getElementById("employeeId").value,
      fullName: document.getElementById("fullName").value,
      dob: combineDOB(),
      gender: document.getElementById("gender").value,
      selectedSlot: selected.value
    };

    if (!data.employeeId || !data.fullName || !data.dob || !data.gender) {
      statusMessage.innerText = "❗ Vui lòng nhập đầy đủ thông tin.";
      return;
    }

    console.log("📥 Dữ liệu gửi:", data);
    statusMessage.innerText = "✅ Đã gửi thông tin (giả lập console).";
  });

  function combineDOB() {
    const d = document.getElementById("dob-day").value.padStart(2, "0");
    const m = document.getElementById("dob-month").value.padStart(2, "0");
    const y = document.getElementById("dob-year").value;
    return d && m && y ? `${d}/${m}/${y}` : "";
  }
});
