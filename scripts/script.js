const fetchData = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  const cards = data.data;
  showCards(cards);
};

fetchData();
const showCards = (cards) => {
  console.log(cards);
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = cards
    .map((card) => {
        const formateDate = new Date(card.createdAt).toLocaleDateString("en-US")
      return `
        <div
                    id="card"
                    class="card max-w-sm bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden border-t-4  ${card.status === "open" ? "border-t-green-500" : "border-t-purple-500"} justify-between"
                >
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-3">
                            <div
                                class="w-7 h-7 flex items-center justify-center bg-green-200 rounded-full"
                            >
                                <img
                                    class="w-4 h-4"
                                    src="assets/${card.status === "open" ? "openStatus" : "closedStatus"}.svg"
                                    alt=""
                                />
                            </div>

                            <span
                                class="px-4 py-1 text-sm font-semibold ${
                                    card.priority === "high" ? 
                                        "text-red-500 bg-red-100" :
                                            card.priority === "medium" ?
                                               "text-yellow-500 bg-orange-100" : "text-gray-500 bg-gray-200"} rounded-full"
                            >
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
                            <span
                                class="flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-[#EF4444] border border-red-300 bg-[#FECACA] rounded-full"
                            >
                                <img
                                    class="w-3 h-3 mt-[0.8px]"
                                    src="assets/bug.svg"
                                    alt=""
                                />

                                ${card.labels[0]}
                            </span>

                            <span
                                class="flex items-center gap-1 px-3 py-1 text-[12px] font-medium text-[#D97706] border border-orange-300 bg-[#FDE68A] rounded-full"
                            >
                                <img
                                    class="w-3 h-3 mt-[0.8px]"
                                    src="assets/helpWanted.svg"
                                    alt=""
                                />
                                ${card.labels[1]}
                            </span>
                        </div>
                    </div>

                    <div
                        class="px-5 py-4 border-t-2 border-gray-200 text-[12px] text-[#64748B]"
                    >
                        <p>#${card.id} ${card.author}</p>
                        <p>${formateDate} </p>
                    </div>
                </div>
    `;
    })
    .join("");
};

const handleTab = async (e) => {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  e.target.classList.add("active");

  // if(e.target.id === "all") console.log("all")
  // else if(e.target.id === "open") console.log("open")
  // else if(e.target.id === "closed") console.log("closed")
};
