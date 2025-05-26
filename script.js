const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const year = 2025;
const monthsContainer = document.getElementById('months-container');
const calendarContainer = document.getElementById('calendar-container');
const monthTitle = document.getElementById('month-title');
const daysContainer = document.getElementById('days-container');
const backBtn = document.getElementById('back-btn');
const dayInfoBox = document.getElementById('day-info');
const pastSpan = document.getElementById('past-info');
const presentSpan = document.getElementById('present-info');
const futureSpan = document.getElementById('future-info');

const holidays = {
  "1-11": "Missionary Day (Mizoram)",
  "1-14": "Makar Sankranti / Pongal / Magh Bihu",
  "1-25": "Statehood Day (Himachal Pradesh)",
  "2-8": "National Boy Scouts Day (minor observance)",
  "2-22": "World Thinking Day (Scouting)",
  "2-26": "Maha Shivaratri",
  "3-8": "International Women's Day",
  "3-22": "World Water Day",
  "3-31": "Id-ul-Fitr (Tentative)",
  "4-1": "Odisha Day (Odisha)",
  "4-10": "Mahavir Jayanti",
  "4-12": "International Day of Human Space Flight",
  "4-14": "Ambedkar Jayanti / Tamil New Year / Vishu",
  "4-18": "Good Friday",
  "4-26": "World Intellectual Property Day",
  "4-30": "Akshaya Tritiya",
  "5-1": "Labour Day",
  "5-10": "World Lupus Day",
  "5-24": "National Teachers' Day (some regions)",
  "6-7": "Global Day of Parents",
  "6-14": "World Blood Donor Day",
  "6-28": "Rath Yatra (Puri)",
  "7-12": "No well-known holiday — maybe mark it normal color",
  "7-26": "Kargil Vijay Diwas",
  "8-9": "International Day of the World's Indigenous Peoples",
  "8-15": "Independence Day",
  "8-23": "International Day for the Remembrance of the Slave Trade",
  "8-27": "World Tourism Day",
  "9-5": "Teachers' Day",
  "9-13": "No major holiday",
  "9-27": "World Tourism Day (alternate observance)",
  "10-1": "International Day of Older Persons",
  "10-2": "Gandhi Jayanti",
  "10-7": "No major holiday",
  "10-11": "International Day of the Girl Child",
  "10-20": "World Statistics Day",
  "10-22": "International Stuttering Awareness Day",
  "10-25": "World Pasta Day",
  "11-1": "Karnataka Rajyotsava",
  "11-8": "No major holiday",
  "11-22": "National Mathematics Day (India)",
  "12-13": "No major holiday",
  "12-25": "Christmas Day",
  "12-27": "International Day of Epidemic Preparedness"
}

function showMonth(monthIndex) {
  monthTitle.textContent = `${months[monthIndex - 1]} ${year}`;
  daysContainer.innerHTML = '';
  dayInfoBox.classList.add('hidden');

  const firstDay = new Date(year, monthIndex - 1, 1).getDay();
  const daysInMonth = new Date(year, monthIndex, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && (today.getMonth() + 1 === monthIndex);
  const currentDay = isCurrentMonth ? today.getDate() : null;

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty');
    daysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.classList.add('day-cell');

    const dateKey = `${monthIndex}-${day}`;
    const dayOfWeek = new Date(year, monthIndex - 1, day).getDay();

    if (day === currentDay) {
      dayDiv.style.background = 'linear-gradient(135deg, #a18cd1, #fbc2eb)';
      dayDiv.style.color = '#fff';
      dayDiv.style.fontWeight = '700';
      dayDiv.style.borderRadius = '6px';
      dayDiv.style.boxShadow = '0 0 8px #d3a4f9';
    }

    if (dayOfWeek === 0) {
      dayDiv.classList.add('sunday');
    }

    if (holidays[dateKey]) {
      dayDiv.classList.add('holiday');
      dayDiv.title = holidays[dateKey];
      dayDiv.style.cursor = 'pointer';

      dayDiv.addEventListener('click', () => {
        showDayInfo(monthIndex, day);
      });
    }

    daysContainer.appendChild(dayDiv);
  }

  monthsContainer.classList.add('fade-out');
  setTimeout(() => {
    monthsContainer.style.display = 'none';
    monthsContainer.classList.remove('fade-out');

    calendarContainer.style.display = 'block';
    calendarContainer.classList.add('fade-in');

    setTimeout(() => {
      calendarContainer.classList.remove('fade-in');
    }, 500);
  }, 400);
}

function showDayInfo(month, day) {
  const dateKey = `${month}-${day}`;
  const reason = holidays[dateKey] || "No holiday info available.";

  dayInfoBox.innerHTML = `
    <h3>Holiday Info</h3>
    <p><strong>${months[month - 1]} ${day}, ${year}:</strong> ${reason}</p>
  `;

  dayInfoBox.classList.remove('hidden', 'fade-out');
  dayInfoBox.classList.add('fade-in');

  setTimeout(() => {
    dayInfoBox.classList.remove('fade-in');
  }, 500);
}

backBtn.addEventListener('click', () => {
  calendarContainer.classList.add('fade-out');
  setTimeout(() => {
    calendarContainer.style.display = 'none';
    calendarContainer.classList.remove('fade-out');

    monthsContainer.style.display = 'grid';
    monthsContainer.classList.add('fade-in');

    setTimeout(() => {
      monthsContainer.classList.remove('fade-in');
    }, 500);
  }, 400);

  dayInfoBox.classList.add('hidden');
});

document.querySelectorAll('.month-box').forEach(box => {
  box.addEventListener('click', e => {
    e.preventDefault();
    const monthIndex = parseInt(box.getAttribute('data-month'), 10);
    showMonth(monthIndex);
  });
});
