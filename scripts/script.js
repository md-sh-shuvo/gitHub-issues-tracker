let cards = [];
let currentCards = [];

const cardContainer = document.getElementById("card-container");
const issuesCount = document.getElementById("issues-count");
const searchInput = document.getElementById("search-issues");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalAuthor = document.getElementById("modal-author");
const modalDate = document.getElementById("modal-date");
const modalLabel0 = document.getElementById("modal-label-0");
const modalLabel1 = document.getElementById("modal-label-1");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");

const fetchData = async () => {
  cardContainer.innerHTML =
    '<span class="loading loading-dots loading-lg mx-auto"></span>';

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const data = await res.json();

  cards = data.data;
  currentCards = cards;

  showCards(currentCards);
};

fetchData();



const showCards = (cards) => {
  issuesCount.innerText = cards.length;


  cardContainer.innerHTML = cards
    .map((card) => {
      const formateDate = new Date(card.createdAt).toLocaleDateString("en-US");
      return `
      <div
        class="card cursor-pointer max-w-sm bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden border-t-4 ${
          card.status === "open" ? "border-t-green-500" : "border-t-purple-500"
        } justify-between"
        onclick="openModal(${card.id})"
      >

        <div class="p-5">

          <div class="flex justify-between items-start mb-3">

            <div class="w-7 h-7 flex items-center justify-center bg-green-200 rounded-full">
              <img
                class="w-4 h-4"
                src="assets/${
                  card.status === "open" ? "openStatus" : "closedStatus"
                }.svg"
              />
            </div>

            <span class="px-4 py-1 text-sm font-semibold ${
              card.priority === "high"
                ? "text-red-500 bg-red-100"
                : card.priority === "medium"
                  ? "text-yellow-500 bg-orange-100"
                  : "text-gray-500 bg-gray-200"
            } rounded-full">
              ${card.priority.toUpperCase()}
            </span>

          </div>

          <h2 class="text-sm font-semibold text-[#1F2937] mb-2">
            ${card.title}
          </h2>

          <p class="text-[#64748B] text-[12px] mb-4">
            ${card.description}
          </p>

          <div class="flex gap-2">

            <span class="flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-[#EF4444] border border-red-300 bg-[#FECACA] rounded-full">
              <img class="w-3 h-3 mt-[0.8px]" src="assets/bug.svg"/>
              ${card.labels[0]}
            </span>

            <span class="flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-[#D97706] border border-orange-300 bg-[#FDE68A] rounded-full">
              <img class="w-3 h-3 mt-[0.8px]" src="assets/helpWanted.svg"/>
              ${card.labels[1]}
            </span>
          </div>
        </div>

        <div class="px-5 py-4 border-t-2 border-gray-200 text-[12px] text-[#64748B]">
          <p>#${card.id} ${card.author}</p>
          <p>${formateDate}</p>
        </div>

      </div>
      
      `;
    })
    .join("");
};




function openModal(id) {
  const card = cards.find((c) => c.id === id);

  modalTitle.innerText = card.title;
  modalStatus.innerText = card.status === "open" ? "Opened" : "Closed";
  modalAuthor.innerText = card.author;
  modalDate.innerText = `• ${new Date(card.createdAt).toLocaleDateString("en-US")}`;
  modalDescription.innerText = card.description;
  modalAssignee.innerText = card.author;
  modalLabel0.innerHTML = `
  <span class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-[#EF4444] border border-red-300 bg-[#FECACA] rounded-full">
    <img class="w-3 h-3 mt-[0.8px]" src="assets/bug.svg"/>
    ${card.labels[0]}
  </span>`;

  modalLabel1.innerHTML = `
  <span class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-[#D97706] border border-orange-300 bg-[#FDE68A] rounded-full">
    <img class="w-3 h-3 mt-[0.8px]" src="assets/helpWanted.svg"/>
    ${card.labels[1]}
  </span>`;

  modalPriority.innerHTML = `
  <span class="px-4 py-1 text-sm font-semibold ${
    card.priority === "high"
      ? "text-red-500 bg-red-100"
      : card.priority === "medium"
        ? "text-yellow-500 bg-orange-100"
        : "text-gray-500 bg-gray-200"
  } rounded-full">
    ${card.priority.toUpperCase()}
  </span>`;

  document.getElementById("my_modal_5").showModal();
}




const handleTab = (e) => {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => tab.classList.remove("active"));
  e.target.classList.add("active");

  if (e.target.id === "open") {
    currentCards = cards.filter((card) => card.status === "open");
  } else if (e.target.id === "closed") {
    currentCards = cards.filter((card) => card.status === "closed");
  } else {
    currentCards = cards;
  }

  showCards(currentCards);
};




searchInput.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase().trim();

  if (!text) {
    showCards(currentCards);
    return;
  }

  const filtered = currentCards.filter(
    (card) =>
      card.title.toLowerCase().includes(text) ||
      card.description.toLowerCase().includes(text) ||
      card.author.toLowerCase().includes(text),
  );

  showCards(filtered);
});
