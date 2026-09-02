const typing = document.getElementById("typing");
const result = document.getElementById("terminalResult");
const commands = {
  projects: `PulseMQ        event streaming
RateLimitEngine API throttling
Live-Canvas     real-time collaboration
NaviCore        route optimization
JSync           subscription billing`,
  stack: `Java · Spring Boot · Kafka · MySQL
Redis · Docker · REST APIs · Python
DSA · System Design · JavaScript`,
  contact: `email     mantar.1911@gmail.com
github    RobinChahal0010
linkedin  robinpreet-singh-chahal-353762331`
};

let cmd = "help";
let i = 0;
function typeCommand(){
  if(i <= cmd.length){
    typing.textContent = cmd.slice(0,i++);
    setTimeout(typeCommand,65);
  }
}
setTimeout(typeCommand,700);

document.querySelectorAll("[data-cmd]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const key = btn.dataset.cmd;
    result.classList.remove("hidden");
    result.textContent = commands[key] || "command not found";
    typing.textContent = key;
    i = key.length;
  });
});

const menu = document.querySelector(".menu");
menu.addEventListener("click",()=>{
  document.querySelector(".nav").classList.toggle("mobile-open");
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});

document.querySelectorAll(".project,.stack-layout,.about-card,.terminal-card,.contact").forEach(el=>{
  el.classList.add("reveal");
  observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}
  });
});

// ===============================
// LEETCODE LIVE STATS
// ===============================

const LEETCODE_USERNAME = "Robinpreet2005";
const LEETCODE_API = "https://leetcode-stats.tashif.codes";

async function loadLeetCodeStats() {
    try {
        const response = await fetch(
            `${LEETCODE_API}/${LEETCODE_USERNAME}`
        );

        if (!response.ok) {
            throw new Error("LeetCode API request failed");
        }

        const result = await response.json();
        const data = result.data;

        console.log("LEETCODE:", result);

        // Problems solved
        document.getElementById("totalSolved").textContent =
            data.totalSolved ?? "—";

        // Acceptance rate
        document.getElementById("acceptanceRate").textContent =
            data.acceptanceRate
                ? `${data.acceptanceRate}%`
                : "—";

        // Active days from submission calendar
        const calendar = data.submissionCalendar || {};

        const activeDays = Object.values(calendar)
            .filter(count => Number(count) > 0)
            .length;

        document.getElementById("activeDays").textContent =
            activeDays;

    } catch (error) {
        console.error("LeetCode Stats Error:", error);

        document.getElementById("totalSolved").textContent = "—";
        document.getElementById("activeDays").textContent = "—";
        document.getElementById("acceptanceRate").textContent = "—";
    }
}

loadLeetCodeStats();